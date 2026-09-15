import { URL } from "node:url";

export function buildUrl(serverUrl, route, queryParams = {}) {
  const base = serverUrl.replace(/\/+$/, "");
  const cleanRoute = route.startsWith("/") ? route : `/${route}`;
  const url = new URL(`${base}${cleanRoute}`);

  for (const [key, value] of Object.entries(queryParams)) {
    url.searchParams.append(key, value);
  }

  return url;
}

export function getPathFromUrl(urlString) {
  try {
    const url = new URL(urlString);
    return url.pathname + url.search;
  } catch {
    return urlString;
  }
}
