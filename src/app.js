#!/usr/bin/env node

import { input, select } from "@inquirer/prompts";
import boxen from "boxen";
import chalk from "chalk";
import ora from "ora";
import { showWelcome } from "./ui/welcome.js";

showWelcome();

const method = await select({
  message: "Please select a method for your request:",
  choices: [
    {
      name: "GET",
      value: "GET",
    },
    {
      name: "POST",
      value: "POST",
    },
    {
      name: "PUT",
      value: "PUT",
    },
    {
      name: "PATCH",
      value: "PATCH",
    },
    {
      name: "DELETE",
      value: "DELETE",
    },
  ],
});

const url = await input({
  message: "Enter your server URL (default: http://localhost:3000)",
  default: "http://localhost:3000",
});

const route = await input({
  message: "Enter your route (e.g. /users, default: /)",
  default: "/",
});

const finalUrl = `${url}${route}`;

console.log(`The Report for /${method} on ${finalUrl}`);
