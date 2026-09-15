import { select } from "@inquirer/prompts";

/**
 * Shows the main menu and returns the user's choice.
 *
 * @returns {Promise<"new" | "history" | "exit">}
 */
export async function showMainMenu() {
  const choice = await select({
    message: "What would you like to do?",
    choices: [
      { name: "New Request", value: "new" },
      { name: "Request History", value: "history" },
      { name: "Exit", value: "exit" },
    ],
  });

  return choice;
}
