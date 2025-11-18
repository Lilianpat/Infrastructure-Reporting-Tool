const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");
const { ContactMessage } = require("../models");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Save to database
    await ContactMessage.create({ name, email, phone, message });

    // Send email
    await sendEmail(
      process.env.CONTACT_EMAIL,
      "New Contact Form Message",
      `
        <h2>New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    );

    res.json({ success: true });
  } catch (error) {
    console.error("CONTACT FORM ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to send" });
  }
});


module.exports = router;
