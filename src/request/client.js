import ora from "ora";

/**
 * Sends an HTTP request using native fetch.
 *
 * @param {URL} url - The full URL to send the request to
 * @param {object} fetchOptions - Options to pass to fetch (method, headers, body)
 * @returns {Promise<{ ok: boolean, status: number, statusText: string, headers: object, body: string, error?: string }>}
 */
export async function sendRequest(url, fetchOptions) {
  const spinner = ora(`Sending ${fetchOptions.method} request...`).start();

  try {
    const response = await fetch(url, fetchOptions);

    // Read response body as text
    const body = await response.text();

    // Collect response headers as a plain object
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    spinner.succeed("Request completed");

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers,
      body,
    };
  } catch (error) {
    spinner.fail("Request failed");

    return {
      ok: false,
      status: 0,
      statusText: "Network Error",
      headers: {},
      body: "",
      error: error.message,
    };
  }
}
