import { select } from "@inquirer/prompts";

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
