#!/usr/bin/env node

import { input, select } from "@inquirer/prompts";
import boxen from "boxen";
import chalk from "chalk";
import ora from "ora";
import { showWelcome } from "./ui/welcome.js";

showWelcome();

const method = await select({
  message: "Select a method:",
  choices: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

const url = await input({
  message: "Enter your server URL:",
  default: "http://localhost:3000",
});

const route = await input({
  message: "Enter your route (e.g. /users, default: /):",
  default: "/",
});

const finalUrl = `${url}${route}`;

console.log(`The Report for /${method} on ${finalUrl}`);
