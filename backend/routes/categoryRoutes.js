const express = require("express");
const router = express.Router();
const { Category } = require("../models");
const auth = require("../middleware/authMiddleware");

// GET all categories
router.get("/", async (req, res) => {
  const categories = await Category.findAll({ order: [["createdAt", "DESC"]] });
  res.json({ categories });
});

// ADD category
router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });

  const cat = await Category.create({ name });
  res.json({ message: "Category added", category: cat });
});

// UPDATE category
router.put("/:id", async (req, res) => {
  const { name } = req.body;

  await Category.update({ name }, { where: { id: req.params.id } });

  res.json({ message: "Category updated" });
});

// DELETE category
router.delete("/:id", async (req, res) => {
  await Category.destroy({ where: { id: req.params.id } });
  res.json({ message: "Category deleted" });
});

// UPDATE CATEGORY
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
const express = require("express");
const router = express.Router();
const { Category } = require("../models");
const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// GET ALL CATEGORIES (ADMIN ONLY)
router.get("/", auth, adminOnly, async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: "Error loading categories" });
  }
});

// ADD CATEGORY
router.post("/", auth, adminOnly, async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.json({ category });
  } catch (err) {
    res.status(500).json({ message: "Error adding category" });
  }
});

// UPDATE CATEGORY
router.put("/:id", auth, adminOnly, async (req, res) => {
  try {
    const { name } = req.body;
    await Category.update({ name }, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Error updating category" });
  }
});

// DELETE CATEGORY
router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Error deleting category" });
  }
});

module.exports = router;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name;
    await category.save();

    res.json({ message: "Category updated", category });

  } catch (err) {
    console.error("EDIT CATEGORY ERROR:", err);
    res.status(500).json({ message: "Failed to update category" });
  }
});


module.exports = router;
