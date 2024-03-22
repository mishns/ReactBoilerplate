export const DEV_COOKIES_HEADERS: RequestInit =
  process.env.NODE_ENV === "development"
    ? { credentials: "include", mode: "cors", referrerPolicy: "same-origin" }
    : {};
export const API_URL = "http://127.0.0.1:4000";
