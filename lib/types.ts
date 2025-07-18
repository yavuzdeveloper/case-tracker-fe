// export type TaskStatus = "pending" | "in_progress" | "completed"; // Explicit status types

// export type Task = {
//   id: string;
//   title: string;
//   description?: string; // Added optional description
//   status: TaskStatus; // Enforced status type
//   dueDate: string; // ISO string format
//   createdAt?: string; // Optional backend timestamp
// };

// Jira default status
export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: Date;
};
