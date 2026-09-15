import { buildUrl } from "../utils/url.js";

export function buildRequest({ method, serverUrl, route, queryParams, headers, body }) {
  const url = buildUrl(serverUrl, route, queryParams);

  const fetchOptions = {
    method,
    headers: { ...headers },
  };

  if (body && method !== "GET") {
    fetchOptions.body = body;

    if (!headers["Content-Type"] && !headers["content-type"]) {
      fetchOptions.headers["Content-Type"] = "application/json";
    }
  }

  return { url, fetchOptions };
}
