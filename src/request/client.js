import ora from "ora";

export async function sendRequest(url, fetchOptions) {
  const spinner = ora(`Sending ${fetchOptions.method} request...`).start();

  try {
    const response = await fetch(url, fetchOptions);
    const body = await response.text();

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
