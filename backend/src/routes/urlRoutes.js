const express = require("express");

const {
  createShortUrl,
  redirectToOriginalUrl,
  getAllUrls,
  deleteUrl,
  clearAllUrls,
} = require("../controllers/urlController");

const router = express.Router();

/* =========================
   GET ALL URLS
========================= */

router.get("/", getAllUrls);

/* =========================
   CREATE SHORT URL
========================= */

router.post("/", createShortUrl);

/* =========================
   CLEAR ALL URLS
   IMPORTANT:
   This must come before /:id
========================= */

router.delete(
  "/clear-all",
  clearAllUrls
);

/* =========================
   DELETE ONE URL
========================= */

router.delete(
  "/:id",
  deleteUrl
);

/* =========================
   REDIRECT
========================= */

router.get(
  "/:shortCode",
  redirectToOriginalUrl
);

module.exports = router;
