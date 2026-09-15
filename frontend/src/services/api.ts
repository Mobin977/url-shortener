/* =========================
   API URL
========================= */

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/urls";

/* =========================
   TYPES
========================= */

export interface ShortUrl {
  _id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUrlResponse {
  success: boolean;
  message: string;

  data: {
    id: string;
    originalUrl: string;
    shortCode: string;
    shortUrl: string;
    clicks: number;
    createdAt: string;
  };
}

/* =========================
   HELPER
========================= */

const handleResponse = async (
  response: Response
) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Something went wrong."
    );
  }

  return data;
};

/* =========================
   CREATE SHORT URL
========================= */

export const createShortUrl =
  async (
    originalUrl: string
  ): Promise<CreateUrlResponse> => {
    const response =
      await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          originalUrl,
        }),
      });

    return handleResponse(
      response
    );
  };

/* =========================
   GET ALL URLS
========================= */

export const getAllUrls =
  async (): Promise<{
    success: boolean;
    count: number;
    data: ShortUrl[];
  }> => {
    const response =
      await fetch(API_URL);

    return handleResponse(
      response
    );
  };

/* =========================
   DELETE ONE URL
========================= */

export const deleteUrl =
  async (
    id: string
  ): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response =
      await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

    return handleResponse(
      response
    );
  };

/* =========================
   CLEAR ALL URLS
========================= */

export const clearAllUrls =
  async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response =
      await fetch(
        `${API_URL}/clear-all`,
        {
          method: "DELETE",
        }
      );

    return handleResponse(
      response
    );
  };