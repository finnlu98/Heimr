import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { IoAddCircleOutline } from "react-icons/io5";
import "./HomeProfile.css";
import UserProfile from "./UserProfile";

interface HomeProfileProps {
  editMode: boolean;
  onSave: (saveFn: () => Promise<void>) => void;
}

const HomeProfile: React.FC<HomeProfileProps> = ({ editMode, onSave }) => {
  const { home, createHome, updateHome } = useAuth();
  const [homeName, setHomeName] = useState(home?.name || "");
  const [location, setLocation] = useState<{ lat: number; lon: number } | undefined>(home?.location || undefined);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(home?.bannerUrl || null);
  useEffect(() => {
    const saveProfile = async () => {
      if (!home) return;
      if (homeName === "" && imgFile === null) return;

      await updateHome({ name: homeName, location: location }, imgFile);
    };

    onSave(saveProfile);
  }, [homeName, location, imgFile, updateHome, onSave]);

  useEffect(() => {
    if (!editMode) {
      setHomeName(home?.name || "");
      setLocation(home?.location || undefined);
      setImgFile(null);
    }
  }, [editMode, home]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-column">
      <label className="section-label">🖺 Home Information</label>
      {home ? (
        <>
          <div className="h-row">
            <p>🏷️</p>
            <input
              type="text"
              placeholder="Home Name"
              value={homeName}
              readOnly={!editMode}
              onChange={(e) => setHomeName(e.target.value)}
            />
          </div>
          <div className="h-row">
            <p>📍</p>
            <input
              type="text"
              placeholder="Latitude"
              value={location ? `${location.lat}` : ""}
              readOnly={!editMode}
              onChange={(e) => setLocation((prev) => ({ lat: Number(e.target.value), lon: prev?.lon ?? 0 }))}
            />
            <input
              type="text"
              placeholder="Longitude"
              value={location ? `${location.lon}` : ""}
              readOnly={!editMode}
              onChange={(e) => setLocation((prev) => ({ lat: prev?.lat ?? 0, lon: Number(e.target.value) }))}
            />
          </div>
          <div className="h-row">
            <p>🖼️</p>

            <div>
              {home?.bannerUrl ? (
                <div className="banner-preview" style={{ backgroundImage: `url(${previewUrl})` }}>
                  {(editMode || !home?.bannerUrl) && (
                    <input
                      className="banner-upload"
                      type="file"
                      accept="image/*"
                      disabled={!editMode}
                      onChange={handleFileChange}
                    />
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <button onClick={createHome}>
            Create Home <IoAddCircleOutline />
          </button>
        </>
      )}
    </div>
  );
};

export default HomeProfile;
