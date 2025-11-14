import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "../../styles/ReportIssue.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";



const ReportIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [coords, setCoords] = useState(null);

  const navigate = useNavigate();


  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const validationErrors = validateForm();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    return;
  }

  // Form is valid — continue with submission
  console.log({
    title,
    description,
    category,
    location,
    image,
  });

  setShowSuccess(true);
};

  const validateForm = () => {
  let newErrors = {};

  if (!title.trim()) newErrors.title = "Title is required.";
  if (!description.trim()) newErrors.description = "Description is required.";
  if (!category) newErrors.category = "Please select a category.";
  if (!location.trim()) newErrors.location = "Location is required.";

  return newErrors;
};

const LocationMarker = ({ onSelect }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position} />;
};

const handleLocationSelect = (latlng) => {
  setCoords(latlng);
  setLocation(`Lat: ${latlng.lat.toFixed(5)}, Lng: ${latlng.lng.toFixed(5)}`);
  setShowMap(false);
};

function MapRefresher() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
}

function MapRefresher() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);
  return null;
}

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <Sidebar />

      <div className="report-issue-container">
        <h2 className="form-title">Report an Issue</h2>

        <form className="report-form" onSubmit={handleSubmit}>
          
          {/* Title */}


          
          <div className="form-group">
  <label>Issue Title</label>
  <input 
    type="text" 
    placeholder="Enter issue title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
  {errors.title && <p className="error-text">{errors.title}</p>}
</div>


          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              className={errors.title ? "error" : ""}
              placeholder="Describe the issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>
            <select 
              className={errors.title ? "error" : ""}
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              required
            >
              <option value="">Select category</option>
              <option value="Pothole">Pothole</option>
              <option value="Streetlight">Streetlight</option>
              <option value="Flooding">Flooding</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Electrical Fault">Electrical Fault</option>
            </select>
            {errors.category && <p className="error-text">{errors.category}</p>}
          </div>

          {/* Location */}
          <div className="form-group">
             <label>Location</label>
  <input 
    type="text" 
    placeholder="Where is the issue located?"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
  />
  <button
    type="button"
    className="map-btn"
    onClick={() => setShowMap(true)}
  >
    Choose on Map
  </button>
  {errors.location && <p className="error-text">{errors.location}</p>}
</div>

          {/* Image Upload */}
          <div className="form-group">
            <label>Upload Image</label>
            <input 
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <img src={imagePreview} alt="preview" className="image-preview" />
            )}
          </div>

          <button type="submit" className="submit-btn">
            Submit Issue
          </button>
        </form>

        {showSuccess && (
  <div className="modal-overlay">
    <div className="success-modal">
      <div className="checkmark">✓</div>
      <h3>Issue Submitted Successfully!</h3>
      <p>Your report has been received. Thank you for improving UNN environment.</p>

      {/* Go to Dashboard */}
  <button 
    className="modal-btn"
    onClick={() => {
      setShowSuccess(false);
      navigate("/dashboard");
    }}
  >
    Go to Dashboard
  </button>

  {/* View My Reports */}
  <button 
    className="modal-btn secondary"
    onClick={() => {
      setShowSuccess(false);
      navigate("/my-reports");
    }}
  >
    View My Reports
  </button>
    </div>
  </div>
)}

      </div>

    {showMap && (
  <div className="map-overlay">
    <div className="map-card">
      <button
        type="button"
        className="close-map"
        onClick={() => setShowMap(false)}
      >
        ×
      </button>

      <h3>Select Location on Map</h3>

      <MapContainer
        center={[6.8485, 7.3834]} // e.g. UNN area (you can adjust)
        zoom={15}
        className="map-container"
      >
         <MapRefresher />
        <TileLayer
  url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
  attribution="&copy; OpenStreetMap contributors, Tiles courtesy of Humanitarian OpenStreetMap Team"
/>
        <LocationMarker onSelect={handleLocationSelect} />
      </MapContainer>

      <p className="map-hint">
        Click anywhere on the map to set the issue location.
      </p>

      {coords && (
        <p className="map-coords">
          Selected: Lat {coords.lat.toFixed(5)}, Lng {coords.lng.toFixed(5)}
        </p>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default ReportIssue;
