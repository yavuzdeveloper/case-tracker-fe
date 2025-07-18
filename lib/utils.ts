import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TaskStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBadgeVariant = (status: TaskStatus) => {
  console.log("status", status);
  switch (status) {
    case "done":
      return "primary";
    case "in-progress":
      return "chart-3";
    case "todo":
      return "destructive";
    default:
      return "outline";
  }
};
