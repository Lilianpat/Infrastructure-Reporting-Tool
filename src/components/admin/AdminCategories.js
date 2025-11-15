import React, { useState } from "react";
import "../../styles/AdminCategories.css";

const AdminCategories = () => {
  const [categories, setCategories] = useState([
    "Pothole",
    "Streetlight",
    "Flooding",
    "Sanitation",
    "Electrical Fault"
  ]);

  const [newCat, setNewCat] = useState("");
  const [editing, setEditing] = useState(null);
  const [editedName, setEditedName] = useState("");

  const addCategory = () => {
    if (!newCat.trim()) return;
    setCategories([...categories, newCat]);
    setNewCat("");
  };

  const saveEdit = (index) => {
    const updated = [...categories];
    updated[index] = editedName;
    setCategories(updated);
    setEditing(null);
    setEditedName("");
  };

  const deleteCategory = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };

  return (
    <div className="admin-categories-page">
      <h2>Manage Categories</h2>

      {/* ADD CATEGORY */}
      <div className="add-cat-box">
        <input
          type="text"
          placeholder="New category"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
        />
        <button onClick={addCategory}>Add</button>
      </div>

      {/* CATEGORY LIST */}
      <div className="cat-list">
        {categories.map((cat, index) => (
          <div key={index} className="cat-item">
            {editing === index ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={() => setEditing(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{cat}</span>
                <div className="cat-actions">
                  <button onClick={() => { setEditing(index); setEditedName(cat); }}>
                    Edit
                  </button>

                  <button className="delete-btn" onClick={() => deleteCategory(index)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
