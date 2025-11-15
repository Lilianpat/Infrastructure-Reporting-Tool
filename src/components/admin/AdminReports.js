import React, { useState } from "react";
import "../../styles/AdminReports.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";


// Temporary dummy report data
const reports = [
  {
    id: 1,
    title: "Blocked Drainage",
    category: "Sanitation",
    desc: "Overflowing drainage causing smell.",
    status: "Pending",
    date: "2025-02-20",
    image: "https://via.placeholder.com/300x180",
    lat: 6.85832,
    lng: 7.38912,
    reporter: "John Doe",
  },
  {
    id: 2,
    title: "Streetlight Fault",
    category: "Electrical Fault",
    desc: "Light not working near hostel 3.",
    status: "In Progress",
    date: "2025-02-18",
    image: "https://via.placeholder.com/300x180",
    lat: 6.84911,
    lng: 7.37222,
    reporter: "Amaka Obi",
  },
  {
    id: 3,
    title: "Pothole",
    category: "Road",
    desc: "Huge pothole near main gate.",
    status: "Resolved",
    date: "2025-02-10",
    image: "https://via.placeholder.com/300x180",
    lat: 6.86641,
    lng: 7.38180,
    reporter: "Chinedu Okoro",
  },
];

const AdminReports = () => {
  const [filter, setFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const filtered =
    filter === "All" ? reports : reports.filter((r) => r.status === filter);

  const updateStatus = (newStatus) => {
    alert("Status updated to: " + newStatus);
  };

  return (
    <div className="admin-reports-page">
      <h2>Manage Reports</h2>

      {/* FILTER BUTTONS */}
      <div className="admin-filter-buttons">
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

      {/* REPORTS TABLE */}
      <div className="admin-reports-table">
        <table>
          <thead>
            <tr>
              <th>Issue</th>
              <th>Category</th>
              <th>Status</th>
              <th>Reporter</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((report) => (
              <tr key={report.id}>
                <td>{report.title}</td>
                <td>{report.category}</td>
                <td className={`status ${report.status.toLowerCase()}`}>
                  {report.status}
                </td>
                <td>{report.reporter}</td>
                <td>{report.date}</td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() => setSelectedReport(report)}
                  >
                    <Link to={`/admin/report/${report.id}/timeline`} className="view-btn">
  View Timeline
</Link>

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedReport && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="admin-report-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal"
              onClick={() => setSelectedReport(null)}
            >
              ×
            </button>

            <h2>{selectedReport.title}</h2>
            <p><strong>Category:</strong> {selectedReport.category}</p>
            <p><strong>Description:</strong> {selectedReport.desc}</p>
            <p><strong>Submitted By:</strong> {selectedReport.reporter}</p>
            <p><strong>Date:</strong> {selectedReport.date}</p>

            <img
              src={selectedReport.image}
              alt="Issue"
              className="admin-modal-img"
            />

            <h3>Location</h3>
            <MapContainer
              center={[selectedReport.lat, selectedReport.lng]}
              zoom={16}
              className="admin-modal-map"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[selectedReport.lat, selectedReport.lng]} />
            </MapContainer>

            <h3>Update Status</h3>
            <div className="status-buttons">
              <button
                className="pending-btn"
                onClick={() => updateStatus("Pending")}
              >
                Pending
              </button>

              <button
                className="progress-btn"
                onClick={() => updateStatus("In Progress")}
              >
                In Progress
              </button>

              <button
                className="resolved-btn"
                onClick={() => updateStatus("Resolved")}
              >
                Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
