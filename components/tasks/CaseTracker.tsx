"use client";

import TaskList from "./TaskList";
import { useState } from "react";
import { Task } from "@/lib/types";
import Header from "./Header";
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "@/api/api";

export default function CaseTracker() {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [status, setStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: tasks = [], isLoading } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [updateTaskMutation] = useUpdateTaskMutation();
  const [deleteTaskMutation] = useDeleteTaskMutation();

  const createTask = async (task: Omit<Task, "id">) => {
    await addTask(task);
    setIsCreateTaskModalOpen(false);
  };

  const updateTask = async (updatedTask: Task) => {
    await updateTaskMutation(updatedTask);
  };

  const deleteTask = async (id: string) => {
    await deleteTaskMutation(id);
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
