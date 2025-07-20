"use client";

import { useState } from "react";
import TaskCard from "./TaskCard";
import { useDeleteTask, useTasks, useUpdateTask } from "@/app/hooks/useTasks";
import { Card } from "@/components/ui/card";
import { Task } from "@/lib/types";

import EmptyTask from "./EmptyTask";
import CustomPagination from "./CustomPagination";
import TaskListSkeleton from "./TaskListSkeleton";
import { PAGE_TASK_SIZE } from "@/constant";

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
  isFiltered: boolean;
};

export default function TaskList({
  tasks,
  onDelete,
  onUpdate,
  isFiltered,
}: TaskListProps) {
  const [page, setPage] = useState(1);
  // const { data: tasks, isLoading, error } = useTasks();
  // const { mutate: deleteTask } = useDeleteTask();
  // const { mutate: updateTask } = useUpdateTask();

  // Pagination
  const totalTasks = tasks?.length || 0;
  const totalPages = Math.ceil(totalTasks / PAGE_TASK_SIZE);
  const paginatedTasks =
    tasks?.slice((page - 1) * PAGE_TASK_SIZE, page * PAGE_TASK_SIZE) || [];

  const isLoading = false;

  return (
    <div
      className="container mx-auto p-8 space-y-6 -mt-4"
      data-testid="task-list"
    >
      <Card className="p-6">
        <div
          className="flex flex-wrap content-start gap-4 overflow-y-auto"
          style={{ alignContent: "flex-start" }}
        >
          {isLoading ? (
            <TaskListSkeleton />
          ) : paginatedTasks.length > 0 ? (
            paginatedTasks.map(task => (
              <div
                key={task.id}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
              >
                <TaskCard task={task} onDelete={onDelete} onUpdate={onUpdate} />
              </div>
            ))
          ) : (
            <EmptyTask isFiltered={isFiltered} />
          )}
        </div>

        {tasks.length !== 0 && (
          <CustomPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className="-mt-4 -mb-4"
          />
        )}
      </Card>
    </div>
  );
}
