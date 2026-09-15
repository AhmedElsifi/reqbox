#!/usr/bin/env node

import chalk from "chalk";
import { select, confirm } from "@inquirer/prompts";
import { showWelcome } from "./ui/welcome.js";
import { showMainMenu } from "./ui/menu.js";
import { promptNewRequest } from "./ui/prompts.js";
import { displayResponse, displayHistory, showHistoryActions } from "./ui/display.js";
import { buildRequest } from "./request/builder.js";
import { sendRequest } from "./request/client.js";
import {
  loadHistory,
  saveHistory,
  createHistoryEntry,
  deleteHistoryEntry,
  clearAllHistory,
} from "./history/history.js";

// --------------------
// Main Application
// --------------------

async function main() {
  showWelcome();

  // Load persisted history from disk
  const history = await loadHistory();

  // Main application loop
  while (true) {
    console.log(); // spacing

    const action = await showMainMenu();

    if (action === "exit") {
      console.log(chalk.dim("\nGoodbye!\n"));
      break;
    }

    if (action === "new") {
      await handleNewRequest(history);
    }

    if (action === "history") {
      await handleHistory(history);
    }
  }
}

// --------------------
// New Request Flow
// --------------------

async function handleNewRequest(history, defaults = null) {
  console.log(chalk.bold.cyan("\nREQBOX > New Request\n"));

  const config = defaults
    ? await promptNewRequest(defaults)
    : await promptNewRequest();

  // Build the request
  const { url, fetchOptions } = buildRequest(config);

  // Send it
  const response = await sendRequest(url, fetchOptions);

  // Attach method for display
  response.method = config.method;

  // Display the response
  displayResponse(url.toString(), response);

  // Save to history (skip if no status — network error)
  if (response.status > 0) {
    const entry = createHistoryEntry({
      method: config.method,
      url: url.toString(),
      serverUrl: config.serverUrl,
      route: config.route,
      queryParams: config.queryParams,
      headers: config.headers,
      body: config.body,
      status: response.status,
      statusText: response.statusText,
    });

    history.push(entry);
    await saveHistory(history);
  }
}

// --------------------
// History Flow
// --------------------

async function handleHistory(history) {
  while (true) {
    console.log(chalk.bold.cyan("\nREQBOX > History\n"));

    if (history.length === 0) {
      console.log(chalk.gray("No request history yet."));
      return;
    }

    displayHistory(history);

    // Let user pick a history entry or go back
    const choices = [
      ...history.map((entry, i) => ({
        name: `${entry.method.padEnd(7)} ${entry.url} ${entry.status || "???"}`,
        value: i,
      })),
      { name: chalk.dim("Back to main menu"), value: -1 },
    ];

    const index = await select({
      message: "Select a request:",
      choices,
    });

    if (index === -1) {
      return;
    }

    const entry = history[index];
    const action = await showHistoryActions(entry);

    if (action === "back") {
      continue;
    }

    if (action === "send") {
      await handleResendRequest(history, entry);
    }

    if (action === "edit") {
      await handleEditRequest(history, entry);
    }

    if (action === "delete") {
      await handleDeleteRequest(history, entry, index);
    }
  }
}

// --------------------
// Resend a saved request
// --------------------

async function handleResendRequest(history, entry) {
  const { url, fetchOptions } = buildRequest({
    method: entry.method,
    serverUrl: entry.serverUrl || new URL(entry.url).origin,
    route: entry.route || new URL(entry.url).pathname,
    queryParams: entry.queryParams || {},
    headers: entry.headers || {},
    body: entry.body ? JSON.stringify(entry.body) : null,
  });

  const response = await sendRequest(url, fetchOptions);
  response.method = entry.method;

  displayResponse(url.toString(), response);

  // Update the history entry with new status
  if (response.status > 0) {
    entry.status = response.status;
    entry.statusText = response.statusText;
    await saveHistory(history);
  }
}

// --------------------
// Edit and resend
// --------------------

async function handleEditRequest(history, entry) {
  const defaults = {
    method: entry.method,
    serverUrl: entry.serverUrl || new URL(entry.url).origin,
    route: entry.route || new URL(entry.url).pathname,
    queryParams: entry.queryParams || {},
    headers: entry.headers || {},
    body: entry.body || null,
  };

  await handleNewRequest(history, defaults);
}

// --------------------
// Delete a history entry
// --------------------

async function handleDeleteRequest(history, entry, index) {
  const confirmed = await confirm({
    message: `Delete ${entry.method} ${entry.url}?`,
    default: false,
  });

  if (confirmed) {
    history.splice(index, 1);
    await saveHistory(history);
    console.log(chalk.dim("Request deleted."));
  }
}

// --------------------
// Run the application
// --------------------

main().catch((error) => {
  console.error(chalk.red(`\nUnexpected error: ${error.message}`));
  process.exit(1);
});
