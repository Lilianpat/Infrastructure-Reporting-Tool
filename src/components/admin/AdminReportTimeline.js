import React, { useState } from "react";
import "../../styles/AdminReportTimeline.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Dummy Report Data
const report = {
  id: 1,
  title: "Blocked Drainage",
  category: "Sanitation",
  lat: 6.85832,
  lng: 7.38912,
  reporter: "John Doe",
  date: "2025-02-20",
  initialImage: "https://via.placeholder.com/350x200",
  timeline: [
    {
      type: "created",
      text: "Report submitted by user.",
      date: "2025-02-20",
      by: "John Doe",
      image: "https://via.placeholder.com/300x180"
    },
    {
      type: "update",
      text: "Admin assigned technicians to inspect the drainage.",
      date: "2025-02-22",
      by: "Admin",
    },
    {
      type: "progress",
      text: "Technicians confirmed blockage and began clearing operation.",
      date: "2025-02-23",
      by: "Maintenance Team",
      image: "https://via.placeholder.com/300x180"
    },
    {
      type: "resolved",
      text: "Drainage fully cleared and water flow restored.",
      date: "2025-02-25",
      by: "Admin",
      image: "https://via.placeholder.com/300x180"
    }
  ]
};

const AdminReportTimeline = () => {
  const [adminNote, setAdminNote] = useState("");

  const addTimelineEntry = () => {
    alert("Admin note saved (UI only): " + adminNote);
    setAdminNote("");
  };

  return (
    <div className="timeline-page">

      <h2>{report.title}</h2>
      <p><strong>Category:</strong> {report.category}</p>
      <p><strong>Submitted by:</strong> {report.reporter}</p>

      <img src={report.initialImage} alt="main" className="main-img" />

      {/* MAP */}
      <h3>Location</h3>
      <MapContainer center={[report.lat, report.lng]} zoom={16} className="timeline-map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker position={[report.lat, report.lng]} />
      </MapContainer>

      <h3>Report Timeline</h3>

      <div className="timeline">
        {report.timeline.map((t, index) => (
          <div key={index} className="timeline-item">
            <div className="dot" />
            <div className="timeline-content">
              <p className="timeline-date">{t.date}</p>
              <p><strong>{t.by}</strong> • {t.type.toUpperCase()}</p>
              <p>{t.text}</p>
              {t.image && <img src={t.image} alt="update" className="timeline-img"/>}
            </div>
          </div>
        ))}
      </div>

      {/* ADMIN NOTE ADD */}
      <div className="admin-note-box">
        <h3>Add Admin Note / Update Timeline</h3>
        <textarea
          placeholder="Write update..."
          value={adminNote}
          onChange={(e) => setAdminNote(e.target.value)}
        ></textarea>

        <button className="add-btn" onClick={addTimelineEntry}>
          Add to Timeline
        </button>
      </div>

    </div>
  );
};

export default AdminReportTimeline;
