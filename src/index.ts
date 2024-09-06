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
