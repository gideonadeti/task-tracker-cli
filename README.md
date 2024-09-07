# Task Tracker CLI

A command-line interface (CLI) tool for tracking and managing tasks. This tool allows you to add, update, delete, mark tasks as in-progress or done, and list tasks by their status.

## Features

- Add new tasks with descriptions.
- Update existing tasks by ID.
- Delete tasks by ID.
- Mark tasks as "in-progress" or "done".
- List tasks, with optional filtering by status (e.g., "to-do", "in-progress", "done").

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/gideonadeti/task-tracker-cli.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-tracker-cli
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Build the project (for TypeScript compilation):

   ```bash
   npm run build
   ```

5. Make the script globally executable (optional):

   ```bash
   npm i -g
   ```

## Usage

To use the task tracker, follow this syntax:

```bash
npx ttc <command> [options]
```

If you made the script globally executable:

```bash
ttc <command> [options]
```

### Available Commands and Options

| Command and Options                  | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `add <description>`   | Add a new task with the given description.              |
| `update <id> <description>`  | Update an existing task with the specified ID.           |
| `delete <id>`         | Delete the task with the specified ID.                  |
| `mark-in-progress <id>` | Mark the task with the specified ID as "in-progress". |
| `mark-done <id>`      | Mark the task with the specified ID as "done".          |
| `list [status]`       | List tasks. Optionally filter by status (`to-do`, `in-progress`, `done`). |
| `--help`              | Display the help menu.                                  |

### Examples

**The following examples assume the script is installed globally.**  
**If the script is not installed globally, prefix each command with `npx`.**

- Add a new task:

  ```bash
  ttc add "Buy groceries"
  ```

- Update an existing task:

  ```bash
  ttc update 1 "Buy groceries and cook dinner"
  ```

- Delete a task:

  ```bash
  ttc delete 1
  ```

- Mark a task as in-progress:

  ```bash
  ttc mark-in-progress 2
  ```

- Mark a task as done:

  ```bash
  ttc mark-done 2
  ```

- List all tasks:

  ```bash
  ttc list
  ```

- List tasks with a specific status:

  ```bash
  ttc list done
  ```

- Display the help menu:

  ```bash
  ttc --help
  ```

## Task Data

The task data is stored in a `tasks.json` file located in the `dist` directory after the build step. You can view and manually edit tasks by modifying this file directly (not recommended unless you're familiar with JSON structures).

## Contributing

Feel free to fork this repository, make improvements, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Note

This project is a sample solution for the [task tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).
