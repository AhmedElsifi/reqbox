#!/usr/bin/env node

import { input, select } from "@inquirer/prompts";
import boxen from "boxen";
import chalk from "chalk";
import ora from "ora";
import { showWelcome } from "./ui/welcome.js";

showWelcome();

const method = select({
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
