"use client";

import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "@/app/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useState } from "react";
import { Task } from "@/lib/types";
import Header from "./Header";

type CaseTrackerProps = {
  // tasks?: any[];
  // isLoading: boolean;
  // error?: Error;
  // onCreateTask: (task: any) => void;
  // onDeleteTask: (id: string) => void;
  // onUpdateTask: (id: string, task: any) => void;
  // isCreating: boolean;
};

export default function CaseTracker({}: CaseTrackerProps) {
  // const { data: tasks, isLoading, error } = useTasks();
  // const { mutate: createTask } = useCreateTask();
  // const { mutate: deleteTask } = useDeleteTask();
  // const { mutate: updateTask } = useUpdateTask();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading tasks</div>;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [status, setStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const createTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks(prev => [...prev, newTask]);
    setIsCreateTaskModalOpen(false);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
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
        isFiltered={
          (searchQuery.trim() !== "" || status !== "all") && tasks.length > 0
        }
      />
    </>
  );
}
