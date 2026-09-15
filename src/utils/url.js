import { URL, URLSearchParams } from "node:url";

/**
 * Builds a full URL from server URL, route, and query parameters.
 * Normalizes slashes to prevent double-slash issues.
 */
export function buildUrl(serverUrl, route, queryParams = {}) {
  // Remove trailing slashes from base, ensure route starts with /
  const base = serverUrl.replace(/\/+$/, "");
  const cleanRoute = route.startsWith("/") ? route : `/${route}`;

  const url = new URL(`${base}${cleanRoute}`);

  // Append query parameters using URLSearchParams
  for (const [key, value] of Object.entries(queryParams)) {
    url.searchParams.append(key, value);
  }

  return url;
}

/**
 * Extracts the path + query portion from a full URL for display.
 * e.g. "http://localhost:3000/users?limit=10" -> "/users?limit=10"
 */
export function getPathFromUrl(urlString) {
  try {
    const url = new URL(urlString);
    const path = url.pathname;
    const search = url.search;
    return path + search;
  } catch {
    return urlString;
  }
}
