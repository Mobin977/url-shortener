import {
  useCallback,
  useEffect,
  useState,
} from "react";

import "./App.css";

import {
  createShortUrl,
  getAllUrls,
  deleteUrl,
  clearAllUrls,
} from "./services/api";

import type {
  ShortUrl,
} from "./services/api";

/* =========================
   BACKEND URL
========================= */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

function App() {
  const [
    originalUrl,
    setOriginalUrl,
  ] = useState("");

  const [
    shortUrl,
    setShortUrl,
  ] = useState("");

  const [
    urls,
    setUrls,
  ] = useState<ShortUrl[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    loadingUrls,
    setLoadingUrls,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  const [
    copiedId,
    setCopiedId,
  ] = useState<string | null>(
    null
  );

  /* =========================
     LOAD URLS
  ========================= */

  const loadUrls = useCallback(
    async (
      showLoading = false
    ) => {
      try {
        if (showLoading) {
          setLoadingUrls(true);
        }

        const response =
          await getAllUrls();

        setUrls(response.data);
      } catch (error) {
        console.error(
          "Failed to load URLs:",
          error
        );

        setError(
          "Failed to load URL history."
        );
      } finally {
        if (showLoading) {
          setLoadingUrls(false);
        }
      }
    },
    []
  );

  /* =========================
     INITIAL LOAD + AUTO REFRESH
  ========================= */

  useEffect(() => {
    const initialLoad = setTimeout(() => {
      void loadUrls(true);
    }, 0);

    const interval =
      setInterval(() => {
        void loadUrls(false);
      }, 2000);

    return () => {
      clearTimeout(initialLoad);
      clearInterval(interval);
    };
  }, [loadUrls]);

  /* =========================
     CREATE SHORT URL
  ========================= */

  const handleShorten =
    async () => {
      const trimmedUrl =
        originalUrl.trim();

      setError("");
      setSuccess("");

      if (!trimmedUrl) {
        setError(
          "Please enter a URL."
        );
        return;
      }

      let parsedUrl: URL;

      try {
        parsedUrl =
          new URL(trimmedUrl);
      } catch {
        setError(
          "Please enter a valid URL."
        );
        return;
      }

      if (
        parsedUrl.protocol !==
          "http:" &&
        parsedUrl.protocol !==
          "https:"
      ) {
        setError(
          "URL must start with http:// or https://"
        );
        return;
      }

      try {
        setLoading(true);

        const response =
          await createShortUrl(
            trimmedUrl
          );

        setShortUrl(
          response.data.shortUrl
        );

        setOriginalUrl("");

        await loadUrls();

        setSuccess(
          "URL shortened successfully!"
        );

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } catch (error: unknown) {
        const message =
          typeof error ===
            "object" &&
          error !== null &&
          "response" in error &&
          typeof error.response ===
            "object" &&
          error.response !== null &&
          "data" in error.response &&
          typeof error.response.data ===
            "object" &&
          error.response.data !==
            null &&
          "message" in
            error.response.data &&
          typeof error.response.data
            .message === "string"
            ? error.response.data
                .message
            : "Failed to shorten URL.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

  /* =========================
     COPY URL
  ========================= */

  const handleCopy =
    async (
      urlToCopy: string,
      id: string
    ) => {
      try {
        await navigator.clipboard.writeText(
          urlToCopy
        );

        setCopiedId(id);

        setSuccess(
          "URL copied successfully!"
        );

        setTimeout(() => {
          setCopiedId(null);
          setSuccess("");
        }, 2000);
      } catch (error) {
        console.error(
          "Failed to copy URL:",
          error
        );

        setError(
          "Failed to copy URL."
        );
      }
    };

  /* =========================
     DELETE ONE URL
  ========================= */

  const handleDelete =
    async (id: string) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this shortened URL?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setError("");
        setSuccess("");

        await deleteUrl(id);

        setUrls(
          (currentUrls) =>
            currentUrls.filter(
              (url) =>
                url._id !== id
            )
        );

        if (copiedId === id) {
          setCopiedId(null);
        }

        setSuccess(
          "URL deleted successfully!"
        );

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } catch (error) {
        console.error(
          "Failed to delete URL:",
          error
        );

        setError(
          "Failed to delete URL."
        );
      }
    };

  /* =========================
     CLEAR ALL URLS
  ========================= */

  const handleClearAll =
    async () => {
      if (urls.length === 0) {
        setError(
          "There are no URLs to clear."
        );

        return;
      }

      const confirmed =
        window.confirm(
          "Are you sure you want to delete ALL shortened URLs and reset all click statistics?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setError("");
        setSuccess("");

        await clearAllUrls();

        setUrls([]);

        setShortUrl("");

        setCopiedId(null);

        setSuccess(
          "All URLs and click statistics cleared successfully!"
        );

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } catch (error) {
        console.error(
          "Failed to clear URLs:",
          error
        );

        setError(
          "Failed to clear URLs."
        );
      }
    };

  /* =========================
     STATISTICS
  ========================= */

  const totalUrls =
    urls.length;

  const totalClicks =
    urls.reduce(
      (total, url) =>
        total + url.clicks,
      0
    );

  /* =========================
     UI
  ========================= */

  return (
    <div className="app">
      <div className="container">

        <h1>
          URL Shortener
        </h1>

        <p className="subtitle">
          Shorten your long URLs
          quickly and easily.
        </p>

        {/* =========================
            STATS
        ========================= */}

        <div className="stats">

          <div className="stat-card">

            <div className="stat-icon">
              🔗
            </div>

            <div>
              <p className="stat-label">
                Total URLs
              </p>

              <h2 className="stat-value">
                {totalUrls}
              </h2>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              👆
            </div>

            <div>
              <p className="stat-label">
                Total Clicks
              </p>

              <h2 className="stat-value">
                {totalClicks}
              </h2>
            </div>

          </div>

        </div>

        {/* =========================
            FORM
        ========================= */}

        <div className="url-form">

          <input
            type="url"
            placeholder="Enter your long URL..."
            value={originalUrl}
            onChange={(event) =>
              setOriginalUrl(
                event.target.value
              )
            }
            onKeyDown={(event) => {
              if (
                event.key ===
                "Enter"
              ) {
                void handleShorten();
              }
            }}
          />

          <button
            type="button"
            onClick={() =>
              void handleShorten()
            }
            disabled={loading}
          >
            {loading
              ? "Shortening..."
              : "Shorten URL"}
          </button>

        </div>

        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <p className="error-message">
            ❌ {error}
          </p>
        )}

        {/* =========================
            SUCCESS
        ========================= */}

        {success && (
          <p className="success-message">
            ✅ {success}
          </p>
        )}

        {/* =========================
            LATEST RESULT
        ========================= */}

        {shortUrl && (
          <div className="result">

            <p>
              Your shortened URL:
            </p>

            <div className="short-url-row">

              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
              >
                {shortUrl}
              </a>

              <button
                type="button"
                className="copy-button"
                onClick={() =>
                  void handleCopy(
                    shortUrl,
                    "latest"
                  )
                }
              >
                {copiedId ===
                "latest"
                  ? "✓ Copied!"
                  : "Copy"}
              </button>

            </div>

          </div>
        )}

        {/* =========================
            HISTORY
        ========================= */}

        <div className="history">

          <div className="history-header">

            <h2>
              URL History
            </h2>

            <button
              type="button"
              className="clear-all-button"
              onClick={() =>
                void handleClearAll()
              }
            >
              Clear All
            </button>

          </div>

          {loadingUrls ? (
            <p className="empty-message">
              Loading URLs...
            </p>
          ) : urls.length === 0 ? (
            <p className="empty-message">
              No shortened URLs yet.
            </p>
          ) : (
            <div className="url-list">

              {urls.map((url) => {

                const currentShortUrl =
                  `${API_BASE_URL}/${url.shortCode}`;

                return (
                  <div
                    className="url-card"
                    key={url._id}
                  >

                    <div className="url-info">

                      <p className="original-url">
                        {url.originalUrl}
                      </p>

                      <div className="short-url-row">

                        <a
                          href={
                            currentShortUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="short-url"
                        >
                          {
                            currentShortUrl
                          }
                        </a>

                        <button
                          type="button"
                          className="copy-button"
                          onClick={() =>
                            void handleCopy(
                              currentShortUrl,
                              url._id
                            )
                          }
                        >
                          {copiedId ===
                          url._id
                            ? "✓ Copied!"
                            : "Copy"}
                        </button>

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() =>
                            void handleDelete(
                              url._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                      <div className="url-meta">

                        <span>
                          Clicks:{" "}
                          {url.clicks}
                        </span>

                        <span>
                          {new Date(
                            url.createdAt
                          ).toLocaleString()}
                        </span>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default App;