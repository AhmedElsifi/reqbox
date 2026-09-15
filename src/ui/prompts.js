import { input, select, confirm } from "@inquirer/prompts";

/**
 * Prompts the user to build a new request.
 * Accepts optional defaults for editing existing requests.
 *
 * @param {object} defaults - Optional pre-filled values
 * @returns {Promise<object>} Request configuration
 */
export async function promptNewRequest(defaults = {}) {
  // HTTP Method
  const method = await select({
    message: "Select HTTP method:",
    choices: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    default: defaults.method,
  });

  // Server URL
  const serverUrl = await input({
    message: "Enter server URL:",
    default: defaults.serverUrl || "http://localhost:3000",
  });

  // Route
  const route = await input({
    message: "Enter route:",
    default: defaults.route || "/",
  });

  // Query Parameters
  const queryParams = await promptQueryParams(defaults.queryParams);

  // Headers
  const headers = await promptHeaders(defaults.headers);

  // Request Body (only for methods that support it)
  let body = null;
  if (method !== "GET") {
    body = await promptBody(method, defaults.body, headers);
  }

  return {
    method,
    serverUrl,
    route,
    queryParams,
    headers,
    body,
  };
}

/**
 * Prompts for query parameters.
 */
async function promptQueryParams(defaults = {}) {
  const addParams = await confirm({
    message: "Add query parameters?",
    default: Object.keys(defaults).length > 0,
  });

  if (!addParams) {
    return {};
  }

  const params = { ...defaults };
  let addMore = true;

  while (addMore) {
    const name = await input({
      message: "Parameter name:",
    });

    const value = await input({
      message: "Parameter value:",
    });

    params[name] = value;

    addMore = await confirm({
      message: "Add another parameter?",
      default: false,
    });
  }

  return params;
}

/**
 * Prompts for custom headers.
 */
async function promptHeaders(defaults = {}) {
  const addHeaders = await confirm({
    message: "Add custom headers?",
    default: Object.keys(defaults).length > 0,
  });

  if (!addHeaders) {
    return {};
  }

  const headers = { ...defaults };
  let addMore = true;

  while (addMore) {
    const name = await input({
      message: "Header name:",
    });

    const value = await input({
      message: "Header value:",
    });

    headers[name] = value;

    addMore = await confirm({
      message: "Add another header?",
      default: false,
    });
  }

  return headers;
}

/**
 * Prompts for a JSON request body with validation.
 */
async function promptBody(method, defaultBody = null, headers = {}) {
  const addBody = await confirm({
    message: "Add a request body?",
    default: defaultBody !== null,
  });

  if (!addBody) {
    return null;
  }

  // Loop until valid JSON is provided
  while (true) {
    const bodyInput = await input({
      message: "Enter JSON body:",
      default: defaultBody ? JSON.stringify(defaultBody, null, 2) : "",
    });

    if (!bodyInput.trim()) {
      return null;
    }

    try {
      const parsed = JSON.parse(bodyInput);

      // Auto-add Content-Type if not already set
      if (!headers["Content-Type"] && !headers["content-type"]) {
        headers["Content-Type"] = "application/json";
      }

      return parsed;
    } catch {
      console.log("\x1b[31m✖ Invalid JSON. Please try again.\x1b[0m");
    }
  }
}
