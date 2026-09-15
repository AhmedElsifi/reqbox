import { input, select, confirm } from "@inquirer/prompts";

export async function promptNewRequest(defaults = {}) {
  const method = await select({
    message: "Select HTTP method:",
    choices: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    default: defaults.method,
  });

  const serverUrl = await input({
    message: "Enter server URL:",
    default: defaults.serverUrl || "http://localhost:3000",
  });

  const route = await input({
    message: "Enter route:",
    default: defaults.route || "/",
  });

  const queryParams = await promptQueryParams(defaults.queryParams);
  const headers = await promptHeaders(defaults.headers);

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
    const name = await input({ message: "Parameter name:" });
    const value = await input({ message: "Parameter value:" });

    params[name] = value;

    addMore = await confirm({
      message: "Add another parameter?",
      default: false,
    });
  }

  return params;
}

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
    const name = await input({ message: "Header name:" });
    const value = await input({ message: "Header value:" });

    headers[name] = value;

    addMore = await confirm({
      message: "Add another header?",
      default: false,
    });
  }

  return headers;
}

async function promptBody(method, defaultBody = null, headers = {}) {
  const addBody = await confirm({
    message: "Add a request body?",
    default: defaultBody !== null,
  });

  if (!addBody) {
    return null;
  }

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

      if (!headers["Content-Type"] && !headers["content-type"]) {
        headers["Content-Type"] = "application/json";
      }

      return parsed;
    } catch {
      console.log("\x1b[31m✖ Invalid JSON. Please try again.\x1b[0m");
    }
  }
}
