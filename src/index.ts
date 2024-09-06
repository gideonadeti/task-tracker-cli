#!/usr/bin/env node

interface Task {
  id: number;
  description: string;
  status: "to-do" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
}
