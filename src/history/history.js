import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";
import { randomUUID } from "node:crypto";

const HISTORY_DIR = join(homedir(), ".reqbox");
const HISTORY_FILE = join(HISTORY_DIR, "history.json");

export async function loadHistory() {
  try {
    const data = await readFile(HISTORY_FILE, "utf-8");
    const parsed = JSON.parse(data);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    console.warn(
      `\x1b[33mWarning: Could not read history file. Starting fresh.\x1b[0m`
    );
    return [];
  }
}

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

export function createHistoryEntry(request) {
  return {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...request,
  };
}

export function deleteHistoryEntry(history, id) {
  return history.filter((entry) => entry.id !== id);
}

export function clearAllHistory() {
  return [];
}
