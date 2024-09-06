#!/usr/bin/env node

import * as path from "path";

interface Task {
  id: number;
  description: string;
  status: "to-do" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
}

const filePath = path.join(__dirname, "tasks.json");
