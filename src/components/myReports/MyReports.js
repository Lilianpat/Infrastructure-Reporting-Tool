import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "../../styles/MyReports.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const sampleReports = [
  {
    id: 1,
    title: "Blocked Drainage",
    category: "Sanitation",
    status: "Pending",
    date: "2025-02-20",
    description: "Drainage system is overflowing causing bad smell.",
    image: "https://via.placeholder.com/300x180",
    lat: 6.85832,
    lng: 7.38912,
  },
  {
    id: 2,
    title: "Streetlight Not Working",
    category: "Electrical Fault",
    status: "Resolved",
    date: "2025-02-18",
    description: "Streetlight near hostel 3 has been fixed.",
    image: "https://via.placeholder.com/300x180",
    lat: 6.84911,
    lng: 7.37222,
  },
  {
    id: 3,
    title: "Large Pothole",
    category: "Pothole",
    status: "In Progress",
    date: "2025-02-10",
    description: "Deep pothole on the main road towards stadium.",
    image: "https://via.placeholder.com/300x180",
    lat: 6.86641,
    lng: 7.38180,
  },
];



const MyReports = () => {
  const [filter, setFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports =
    filter === "All"
      ? sampleReports
      : sampleReports.filter((r) => r.status === filter);

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <Sidebar />

      <div className="myreports-container">
        <h2 className="page-title">My Reports</h2>

        {/* FILTER BUTTONS */}
        <div className="filter-buttons">
          {["All", "Pending", "In Progress", "Resolved"].map((btn) => (
            <button
              key={btn}
              className={`filter-btn ${filter === btn ? "active" : ""}`}
              onClick={() => setFilter(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* REPORTS LIST */}
        <div className="reports-grid">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="report-card"
              onClick={() => setSelectedReport(report)}
            >
              <img src={report.image} alt={report.title} className="report-img" />

              <div className="report-content">
                <h3 className="report-title">{report.title}</h3>

                {/* Category Tag */}
                <span className="category-tag">{report.category}</span>

                <span className={`status-badge ${report.status.toLowerCase()}`}>
                  {report.status}
                </span>

                <p className="report-date">
                  Submitted on: <strong>{report.date}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DETAILS MODAL */}
        {selectedReport && (
          <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
            <div className="details-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setSelectedReport(null)}>
                ×
              </button>

              <img
                src={selectedReport.image}
                alt={selectedReport.title}
                className="modal-img"
              />

              <h2>{selectedReport.title}</h2>

              <p><strong>Category:</strong> {selectedReport.category}</p>
              <p><strong>Status:</strong> {selectedReport.status}</p>
              <p><strong>Date Submitted:</strong> {selectedReport.date}</p>
              <p className="modal-description">{selectedReport.description}</p>

              {/* MAP PREVIEW */}
<div className="modal-map-box">
  <MapContainer
    center={[selectedReport.lat, selectedReport.lng]}
    zoom={16}
    scrollWheelZoom={false}
    dragging={true}
    className="modal-map"
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />
    <Marker position={[selectedReport.lat, selectedReport.lng]} />
  </MapContainer>
</div>

              <a
                href={`https://www.google.com/maps?q=${selectedReport.lat},${selectedReport.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-map-link"
              >
                View Location on Map
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;
