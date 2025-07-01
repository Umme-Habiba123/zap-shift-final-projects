import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../coverage/fixLeafletIcon";

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const Coverage = () => {
  const coverageData = useLoaderData();

  const [search, setSearch] = useState("");
  const [zoom, setZoom] = useState(7);
  const [mapCenter, setMapCenter] = useState([23.685, 90.3563]);

  const performSearch = () => {
    const searchTerm = search.trim().toLowerCase();
    const foundDistrict = coverageData.find(d =>
      d.district.toLowerCase().includes(searchTerm)
    );
    if (foundDistrict) {
      setMapCenter([foundDistrict.latitude, foundDistrict.longitude]);
      setZoom(12);
    } else {
      alert("District not found");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        We are available in 64 districts
      </h1>

      {/* Search bar with button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search district"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow border px-4 py-2 rounded"
        />
        <button
          onClick={performSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Map */}
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "600px", width: "100%" }}
      >
        <ChangeView center={mapCenter} zoom={zoom} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {coverageData.map((district, index) => (
          <Marker
            key={index}
            position={[district.latitude, district.longitude]}
          >
            <Popup>
              <div>
                <h2 className="font-bold">{district.district}</h2>
                <p>
                  <strong>Covered Areas:</strong>{" "}
                  {district.covered_area.join(", ")}
                </p>
                <img
                  src={district.flowchart}
                  alt={`${district.district} flowchart`}
                  className="w-full mt-2 rounded"
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Coverage;
