const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDatabase = require("./config/database");
const urlRoutes = require("./routes/urlRoutes");
const {
  redirectToOriginalUrl,
} = require("./controllers/urlController");

const app = express();

const PORT = process.env.PORT || 5000;

/* =========================
   DATABASE
========================= */

connectDatabase();

/* =========================
   MIDDLEWARE
========================= */

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);

app.use(express.json());

/* =========================
   API ROUTES
========================= */

app.use("/api/urls", urlRoutes);

/* =========================
   SHORT URL REDIRECT
========================= */

app.get(
  "/:shortCode",
  redirectToOriginalUrl
);

/* =========================
   HOME ROUTE
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "URL Shortener API is running 🚀",
  });
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});