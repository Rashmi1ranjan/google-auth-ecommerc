const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');


const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const googleAuth = async (req, res) => {
    try {
        const url = client.generateAuthUrl({
            access_type: "offline",
            scope: ["profile", "email"],
          });
        
          res.redirect(url); // Redirect user to Google Login
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
// Step 2: Handle Google OAuth callback

const googleAuthCallback = async (req, res) => {
const code = req.query.code;
  if (!code) {
    return res.status(400).send("Authorization code not found");
  }

  try {
    // Exchange code for access token

    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // Get user info
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // Create JWT
    const jwtToken = jwt.sign({ id: sub, email, name, picture }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set JWT as HTTP-only cookie
    res.cookie("auth_token", jwtToken, { httpOnly: true, secure: false });

    res.send(`Welcome, ${name}! Login Successful.`);
  } catch (error) {
    console.error("Error in authentication:", error);
    res.status(500).send("Authentication failed");
    }
}

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

module.exports = { register, googleAuth, googleAuthCallback, login, logout};
