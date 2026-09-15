import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";
import { randomUUID } from "node:crypto";

const HISTORY_DIR = join(homedir(), ".reqbox");
const HISTORY_FILE = join(HISTORY_DIR, "history.json");

/**
 * Loads request history from disk.
 * Returns an empty array if the file doesn't exist or is corrupted.
 */
export async function loadHistory() {
  try {
    const data = await readFile(HISTORY_FILE, "utf-8");
    const parsed = JSON.parse(data);

    // Basic validation: must be an array
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    // File not found or invalid JSON — start fresh
    if (error.code === "ENOENT") {
      return [];
    }

    // Corrupted file — log warning and start fresh
    console.warn(
      `\x1b[33mWarning: Could not read history file. Starting fresh.\x1b[0m`
    );
    return [];
  }
}

/**
 * Saves request history to disk.
 * Creates the ~/.reqbox directory if it doesn't exist.
 */
export async function saveHistory(history) {
  try {
    await mkdir(HISTORY_DIR, { recursive: true });
    await writeFile(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
  } catch (error) {
    console.warn(
      `\x1b[33mWarning: Could not save history. ${error.message}\x1b[0m`
    );
  }
}

/**
 * Creates a new history entry with a unique ID and timestamp.
 */
export function createHistoryEntry(request) {
  return {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...request,
  };
}

/**
 * Deletes a history entry by ID.
 * Returns the updated history array.
 */
export function deleteHistoryEntry(history, id) {
  return history.filter((entry) => entry.id !== id);
}

/**
 * Clears all history.
 */
export function clearAllHistory() {
  return [];
}
