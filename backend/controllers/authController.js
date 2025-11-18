const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User, Student, Staff, ServiceProvider } = require("../models");

const sendEmail = require("../utils/sendEmail");


exports.registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
      registrationNumber,
      staffNumber,
      businessName,
      serviceType,
      department,
      address
    } = req.body;

    // Check if email exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      full_name: fullName,
      email,
      password_hash: hashedPassword,
      role
    });

    // Role-specific records
    if (role === "student") {
      await Student.create({
        user_id: newUser.id,
        registration_number: registrationNumber,
        department
      });
    }

    if (role === "staff") {
      await Staff.create({
        user_id: newUser.id,
        staff_number: staffNumber,
        department
      });
    }

    if (role === "service_provider") {
      await ServiceProvider.create({
        user_id: newUser.id,
        business_name: businessName,
        service_type: serviceType,
        address
      });
    }

    // EMAIL VERIFICATION
    const crypto = require("crypto");
    

    const token = crypto.randomBytes(32).toString("hex");

    newUser.verificationToken = token;
    await newUser.save();

    const verifyURL = `${process.env.CLIENT_URL}/verify/${token}`;

    await sendEmail(
      newUser.email,
      "Verify Your Account",
      `
      <h2>Verify Your Email</h2>
      <p>Click the link below to verify your account:</p>
      <a href="${verifyURL}" target="_blank">Verify Email</a>
      `
    );

    // Response
    return res.status(201).json({
      message: "Registration successful! Verify your email.",
      user: {
        id: newUser.id,
        name: newUser.full_name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST BODY:", req.body);

    // 1️⃣ Check if user exists
    const user = await User.findOne({ where: { email } });

    console.log("USER FOUND IN DB:", user ? user.toJSON() : null);
    console.log("HASH IN DATABASE:", user.password_hash);
console.log("PASSWORD ENTERED:", password);
console.log("Hash Length:", user.password_hash.length);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2️⃣ Compare password
    const isCorrect = await bcrypt.compare(password, user.password_hash);

    console.log("PASSWORD MATCH:", isCorrect);

    if (!isCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2️⃣ Check if user is verified
if (!user.verified) {
  return res.status(403).json({
    message: "Please verify your email before logging in.",
    needVerification: true
  });
}

    // 3️⃣ Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣ return success
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.verified = true;
    user.verificationToken = null;

    await user.save();

    return res.json({ message: "Email verified successfully" });

  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.json({ message: "If the email exists, a reset link was sent." });
    }

    const crypto = require("crypto");
    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // valid 10 mins
    await user.save();

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail(
      user.email,
      "Password Reset Request",
      `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetURL}" target="_blank">Reset Password</a>
      `
    );

    return res.json({ message: "Password reset link sent" });

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password_hash = hashed;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.verified) {
      return res.json({ message: "Email already verified" });
    }

    const crypto = require("crypto");
  

    const newToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = newToken;
    await user.save();

    const verifyURL = `${process.env.CLIENT_URL}/verify/${newToken}`;

    await sendEmail(
      user.email,
      "Verify Your Account",
      `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verifyURL}" target="_blank">Verify Email</a>
      `
    );

    res.json({ message: "Verification email resent successfully" });

  } catch (error) {
    console.error("RESEND VERIFICATION ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

