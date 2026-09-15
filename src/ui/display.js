import chalk from "chalk";
import boxen from "boxen";
import { getPathFromUrl } from "../utils/url.js";

/**
 * Displays the response from a sent request.
 */
export function displayResponse(url, response) {
  // If there was a network error
  if (response.error) {
    console.log(
      boxen(
        [
          chalk.bold("Request Failed"),
          "",
          chalk.red(response.error),
        ].join("\n"),
        {
          padding: 1,
          margin: 1,
          borderStyle: "round",
          borderColor: "red",
        },
      ),
    );
    return;
  }

  const statusColor = response.ok ? chalk.green : chalk.red;

  // Format the response body
  let formattedBody = response.body;
  if (response.body) {
    try {
      const parsed = JSON.parse(response.body);
      formattedBody = JSON.stringify(parsed, null, 2);
    } catch {
      // Not JSON, keep as plain text
    }
  }

  const lines = [
    chalk.bold("Request"),
    `${chalk.cyan(response.method || "")} ${url}`,
    "",
    chalk.bold("Response"),
    `${statusColor(response.status)} ${statusColor(response.statusText)}`,
  ];

  // Show response headers if present
  if (response.headers && Object.keys(response.headers).length > 0) {
    lines.push("");
    lines.push(chalk.bold("Response Headers"));
    for (const [key, value] of Object.entries(response.headers)) {
      lines.push(`${chalk.gray(key)}: ${value}`);
    }
  }

  lines.push("");
  lines.push(chalk.bold("Body"));
  lines.push(formattedBody || chalk.gray("(empty response)"));

  console.log(
    boxen(lines.join("\n"), {
      padding: 1,
      margin: 1,
      borderStyle: "round",
    }),
  );
}

/**
 * Displays the request history as a numbered list.
 */
export function displayHistory(history) {
  if (history.length === 0) {
    console.log(chalk.gray("\nNo request history yet.\n"));
    return;
  }

  console.log(chalk.bold("\nRequest History\n"));

  for (let i = 0; i < history.length; i++) {
    const entry = history[i];
    const path = getPathFromUrl(entry.url);
    const statusColor =
      entry.status >= 200 && entry.status < 300 ? chalk.green : chalk.red;
    const time = new Date(entry.createdAt).toLocaleString();

    console.log(
      `  ${chalk.dim(`${i + 1}.`)} ${chalk.cyan(entry.method.padEnd(7))} ${chalk.white(path)} ${statusColor(entry.status || "???")} ${chalk.dim(time)}`,
    );
  }

  console.log();
}

/**
 * Shows history entry actions and returns the user's choice.
 */
export async function showHistoryActions(entry) {
  const { select } = await import("@inquirer/prompts");

  const path = getPathFromUrl(entry.url);

  const choice = await select({
    message: `${entry.method} ${path} — Choose action:`,
    choices: [
      { name: "Send Request", value: "send" },
      { name: "Edit Request", value: "edit" },
      { name: "Delete Request", value: "delete" },
      { name: "Back", value: "back" },
    ],
  });

  return choice;
}
