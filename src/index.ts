#!/usr/bin/env node

import * as path from "path";
import * as fs from "fs";

interface Task {
  id: number;
  description: string;
  status: "to-do" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
}

const filePath = path.join(__dirname, "tasks.json");

// Helper to load tasks from the JSON file
function loadTasks(): Task[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// Helper to save tasks to the JSON file
function saveTasks(tasks: Task[]): void {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Helper to generate a new unique task ID
function getNextTaskId(tasks: Task[]): number {
  return tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
}

// Helper to log messages to the console
function consoleLog(message: string, type: "success" | "failure"): void {
  const reset = "\x1b[0m";

  // Color codes for different log types
  const colors = {
    success: "\x1b[32m", // Green
    failure: "\x1b[31m", // Red
  };

  // Log message with color and reset
  console.log(`${colors[type]}${message}${reset}\n`);
}

function addTask(description: string): void {
  const tasks = loadTasks();
  const newTask: Task = {
    id: getNextTaskId(tasks),
    description,
    status: "to-do",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  consoleLog(`Task added successfully (ID: ${newTask.id})`, "success");
}

// Main CLI handler
const [, , command, ...args] = process.argv;

switch (command) {
  case "add":
    if (args.length === 1) {
      addTask(args[0]);
    } else {
      consoleLog(
        args.length === 0
          ? "Please provide a description."
          : "Please provide exactly one description enclosed in quotes.",
        "failure"
      );
    }
    break;

  default:
    consoleLog("Unknown command.", "failure");
    break;
}
