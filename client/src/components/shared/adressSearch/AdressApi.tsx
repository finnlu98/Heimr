import axios from "axios";
import configuration from "../../../Configuration";
import { SearchAddressResponse } from "./model/AdressRespone";
import { Address } from "../../../model/Adress";

const SearchAdressFetcher = async (searchString: string) => {
  try {
    const adressConfig = configuration.getAdressLookupEndpoint();
    const endpoint = adressConfig.replace(":SEARCH", encodeURIComponent(searchString));
    const res = await axios.get<SearchAddressResponse>(endpoint);
    return mapToAddress(res.data);
  } catch (error) {
    console.error("Can`t get address data");
    throw error;
  }
};

const mapToAddress = (res: SearchAddressResponse): Address[] => {
  return res.adresser.map((adress) => ({
    frienldyName: adress.adressetekst,
    coordinate: adress.representasjonspunkt,
  }));
};

export default SearchAdressFetcher;
