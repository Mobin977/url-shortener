const { nanoid } = require("nanoid");

const Url = require("../models/Url");

/* =========================
   CREATE SHORT URL
========================= */

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "Original URL is required.",
      });
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(originalUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid URL.",
      });
    }

    if (
      parsedUrl.protocol !== "http:" &&
      parsedUrl.protocol !== "https:"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only HTTP and HTTPS URLs are allowed.",
      });
    }

    let shortCode = nanoid(6);

    let existingUrl =
      await Url.findOne({ shortCode });

    while (existingUrl) {
      shortCode = nanoid(6);

      existingUrl =
        await Url.findOne({ shortCode });
    }

    const newUrl = await Url.create({
      originalUrl: parsedUrl.toString(),
      shortCode,
    });

    return res.status(201).json({
      success: true,
      message:
        "Short URL created successfully.",

      data: {
        id: newUrl._id,
        originalUrl: newUrl.originalUrl,
        shortCode: newUrl.shortCode,

        shortUrl:
          `${req.protocol}://${req.get(
            "host"
          )}/${newUrl.shortCode}`,

        clicks: newUrl.clicks,
        createdAt: newUrl.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "Create short URL error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error. Please try again.",
    });
  }
};

/* =========================
   REDIRECT TO ORIGINAL URL
========================= */

const redirectToOriginalUrl = async (
  req,
  res
) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({
      shortCode,
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found.",
      });
    }

    url.clicks += 1;

    await url.save();

    return res.redirect(
      url.originalUrl
    );
  } catch (error) {
    console.error(
      "Redirect URL error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error. Please try again.",
    });
  }
};

/* =========================
   GET ALL URLS
========================= */

const getAllUrls = async (
  req,
  res
) => {
  try {
    const urls = await Url.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: urls.length,
      data: urls,
    });
  } catch (error) {
    console.error(
      "Get all URLs error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error. Please try again.",
    });
  }
};

/* =========================
   DELETE ONE URL
========================= */

const deleteUrl = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const deletedUrl =
      await Url.findByIdAndDelete(id);

    if (!deletedUrl) {
      return res.status(404).json({
        success: false,
        message: "URL not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Short URL deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete URL error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error. Please try again.",
    });
  }
};

/* =========================
   CLEAR ALL URLS
========================= */

const clearAllUrls = async (
  req,
  res
) => {
  try {
    await Url.deleteMany({});

    return res.status(200).json({
      success: true,
      message:
        "All URLs cleared successfully.",
    });
  } catch (error) {
    console.error(
      "Clear all URLs error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error. Please try again.",
    });
  }
};

/* =========================
   EXPORTS
========================= */

module.exports = {
  createShortUrl,
  redirectToOriginalUrl,
  getAllUrls,
  deleteUrl,
  clearAllUrls,
};
