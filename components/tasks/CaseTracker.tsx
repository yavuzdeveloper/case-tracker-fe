"use client";

import { useRouter, useSearchParams } from "next/navigation";

import TaskList from "./TaskList";
import { useState } from "react";
import { Task } from "@/lib/types";
import Header from "./Header";
import { useAddTaskMutation, useGetTasksQuery } from "@/api/api";

export default function CaseTracker() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const statusFromQuery = searchParams.get("status") || "all";
  const searchQueryFromQuery = searchParams.get("search") || "";

  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [status, setStatus] = useState(statusFromQuery);
  const [searchQuery, setSearchQuery] = useState(searchQueryFromQuery || "");

  const { data: tasks = [], isLoading } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();

  const createTask = async (task: Omit<Task, "id">) => {
    await addTask(task);
    setIsCreateTaskModalOpen(false);
  };

  const applyFilters = (newStatus: string, newSearchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", newStatus);
    params.set("search", newSearchQuery);
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
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
        status={status}
        setStatus={setStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <TaskList
        tasks={filteredTasks}
        isLoading={isLoading}
        isFiltered={
          (searchQuery.trim() !== "" || status !== "all") && tasks.length > 0
        }
      />
    </>
  );
}
