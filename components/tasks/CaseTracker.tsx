"use client";

import TaskList from "./TaskList";
import { useState } from "react";
import { Task } from "@/lib/types";
import Header from "./Header";
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "@/hooks/useTasks";

type CaseTrackerProps = {};

export default function CaseTracker({}: CaseTrackerProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [status, setStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  //React Query hooks
  const { data: tasks = [], isLoading } = useTasks();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  // Create
  const createTask = (task: Omit<Task, "id">) => {
    createTaskMutation.mutate(task);
    setIsCreateTaskModalOpen(false);
  };

  // Update
  const updateTask = (updatedTask: Task) => {
    updateTaskMutation.mutate(updatedTask);
    setEditingTask(null);
  };

  // Delete
  const deleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  const applyFilters = (status: string, searchQuery: string) => {
    setStatus(status);
    setSearchQuery(searchQuery);
  };

  const filteredTasks = tasks.filter(task => {
    const titleMatch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const statusMatch = status === "all" || task.status === status;
    return titleMatch && statusMatch;
  });

  return (
    <>
      <Header
        createTask={createTask}
        open={isCreateTaskModalOpen}
        onOpenChange={setIsCreateTaskModalOpen}
        applyFilters={applyFilters}
      />
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onUpdate={updateTask}
        isLoading={isLoading}
        isFiltered={
          (searchQuery.trim() !== "" || status !== "all") && tasks.length > 0
        }
      />
    </>
  );
}
