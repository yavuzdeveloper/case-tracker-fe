// hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskStatus, Task } from "../lib/types";

const baseUrl = "http://localhost:5000";

// 1. Task List
export function useTasks() {
  return useQuery<TaskStatus[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/tasks`);
      return res.json();
    },
  });
}

// 2. Add new task
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTask: Omit<Task, "id">) =>
      fetch(`${baseUrl}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

// 3. Update task
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...updates }: Partial<Task> & { id: string }) =>
      fetch(`${baseUrl}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

// 4. Delete task
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetch(`${baseUrl}/tasks/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
