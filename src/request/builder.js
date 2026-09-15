import { buildUrl } from "../utils/url.js";

/**
 * Builds a complete request configuration ready for fetch.
 *
 * @param {object} options
 * @param {string} options.method - HTTP method
 * @param {string} options.serverUrl - Base server URL
 * @param {string} options.route - Route path
 * @param {object} options.queryParams - Query parameters
 * @param {object} options.headers - Custom headers
 * @param {string} options.body - Raw body string (already JSON-stringified)
 * @returns {{ url: URL, fetchOptions: object }}
 */
export function buildRequest({ method, serverUrl, route, queryParams, headers, body }) {
  const url = buildUrl(serverUrl, route, queryParams);

  const fetchOptions = {
    method,
    headers: { ...headers },
  };

  // Attach body for methods that support it
  if (body && method !== "GET") {
    fetchOptions.body = body;

    // Auto-set Content-Type if not already provided and body is JSON
    if (!headers["Content-Type"] && !headers["content-type"]) {
      fetchOptions.headers["Content-Type"] = "application/json";
    }
  }

  return { url, fetchOptions };
}
