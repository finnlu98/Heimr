import React, { useEffect, useRef, useState } from "react";
import { Address } from "../../../model/Adress";
import useAddressSearch from "./AdressHook";
import "./AdressSearch.css";
import "../../../feedback/components/Loading/loading.css";

interface AdressSearchProps {
  onAddressSelect: (address: Address) => void;
  adress?: string;
  debounceMs?: number;
}

const AdressSearch: React.FC<AdressSearchProps> = ({ onAddressSelect, adress = "", debounceMs = 500 }) => {
  const [searchTerm, setSearchTerm] = useState(adress);
  const { results, isLoading, error, searchAddresses, clearResults } = useAddressSearch();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.trim().length < 3) {
      clearResults();
      return;
    }

    debounceTimer.current = setTimeout(() => {
      searchAddresses(value);
    }, debounceMs);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleSelect = (address: Address) => {
    setSearchTerm(address.frienldyName);
    clearResults();
    onAddressSelect(address);
  };

  return (
    <div className="search-input-container">
      <div style={{ position: "relative" }}>
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for an address..."
        />
        {isLoading && <div className="small-loading-spinner" />}
      </div>
      {error && <div>{error}</div>}

      {results.length > 0 && (
        <ul className="search-results">
          {results.map((address, index) => (
            <li
              className="search-result-item"
              key={`${address.coordinate.lat}-${address.coordinate.lon}-${index}`}
              onClick={() => handleSelect(address)}
            >
              {address.frienldyName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdressSearch;
