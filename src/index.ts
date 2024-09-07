#!/usr/bin/env node

import * as path from "path";
import * as fs from "fs";

// Task interface
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
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) || [];
  } catch {
    return [];
  }
}

// Helper to save tasks to the JSON file
function saveTasks(tasks: Task[]) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Helper to generate a new unique task ID
function getNextTaskId(tasks: Task[]): number {
  return tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
}

// Helper to log messages to the console
function consoleLog(
  message: string,
  type: "success" | "failure",
  example?: string
) {
  const reset = "\x1b[0m";

  // Color codes for different log types
  const colors = {
    success: "\x1b[32m", // Green
    failure: "\x1b[31m", // Red
  };

  // Retrieve color based on the provided type
  const color = colors[type];

  // Construct the message with or without example
  const fullMessage = example
    ? `${message}\nValid example: ${example}`
    : message;

  // Log the message with color and reset
  console.log(`${color}${fullMessage}${reset}\n`);
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

function updateTask(id: number, description: string): void {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.description = description;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    consoleLog(`Task ${id} updated successfully.`, "success");
  } else {
    consoleLog(`Task with ID ${id} not found.`, "failure");
  }
}

// Delete a task by ID
function deleteTask(id: number): void {
  let tasks = loadTasks();
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  if (tasks.length === initialLength) {
    consoleLog(`Task with ID ${id} not found.`, "failure");
  } else {
    saveTasks(tasks);
    consoleLog(`Task with ID ${id} deleted successfully.`, "success");
  }
}

function markTask(id: number, status: "in-progress" | "done") {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.status = status;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    consoleLog(`Task with ID ${id} marked as ${status}.`, "success");
  } else {
    consoleLog(`Task with ID ${id} not found.`, "failure");
  }
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
        "failure",
        'ttc add "Buy groceries"'
      );
    }
    break;

  case "update":
    const updateId = parseInt(args[0], 10);
    if (args.length === 2 && !isNaN(updateId)) {
      updateTask(updateId, args[1]);
    } else {
      consoleLog(
        "Please provide a valid task ID and new description.",
        "failure",
        'ttc update 1 "Buy groceries and cook dinner"'
      );
    }
    break;

  case "delete":
    if (args.length === 1) {
      const deleteId = parseInt(args[0], 10);
      if (!isNaN(deleteId)) {
        // Prompt user for confirmation
        process.stdout.write(
          `${"\x1b[33m"}Are you sure you want to delete the task with ID ${deleteId}? This is irreversible. (y/N): ${"\x1b[0m"}`
        );
        process.stdin.once("data", (input) => {
          const response = input.toString().trim().toLowerCase();
          if (response === "y") {
            deleteTask(deleteId);
          } else {
            console.log("Task deletion cancelled.");
          }
          process.stdin.pause(); // Stop waiting for input after confirmation
        });
      } else {
        consoleLog(
          "Please provide a valid task ID to delete.",
          "failure",
          "ttc delete 1"
        );
      }
    } else {
      consoleLog(
        "Invalid number of arguments. Please provide exactly one task ID to delete.",
        "failure",
        "ttc delete 1"
      );
    }
    break;

  case "mark-in-progress":
    const inProgressId = parseInt(args[0], 10);
    if (!isNaN(inProgressId)) {
      markTask(inProgressId, "in-progress");
    } else {
      consoleLog(
        "Please provide a valid task ID.",
        "failure",
        "ttc mark-in-progress 1"
      );
    }
    break;

  case "mark-done":
    const doneId = parseInt(args[0], 10);
    if (!isNaN(doneId)) {
      markTask(doneId, "done");
    } else {
      consoleLog(
        "Please provide a valid task ID.",
        "failure",
        "ttc mark-done 1"
      );
    }
    break;

  default:
    consoleLog(
      "Unknown command. Available commands: add, update, delete, mark-in-progress, mark-done",
      "failure",
      'ttc add "Buy groceries"'
    );
    break;
}
