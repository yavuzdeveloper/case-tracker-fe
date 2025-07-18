"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import TaskForm from "./TaskForm";
import { TaskDeleteDialog } from "./TaskDeleteDialog";
import { Badge } from "@/components/ui/badge";
import { getBadgeVariant } from "@/lib/utils";
import { Task } from "@/lib/types";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
}

export default function TaskCard({ task, onDelete, onUpdate }: TaskCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <Card className="h-[170px] flex flex-col">
      <CardHeader className="flex flex-row justify-between items-start p-4 pt-0 pb-0">
        <CardTitle
          className="text-base line-clamp-1 cursor-pointer"
          onClick={() => setIsEditOpen(true)}
        >
          {task.title}
        </CardTitle>
        <div className="flex">
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>Edit Task</TooltipContent>
            </Tooltip>
            <DialogContent onCloseAutoFocus={e => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              <TaskForm
                initialValues={task}
                onSubmit={data => {
                  onUpdate({ id: task.id, ...data });
                  setIsEditOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
          <TaskDeleteDialog taskId={task.id} onDelete={onDelete} />
        </div>
      </CardHeader>
      <CardContent
        className="p-4 pt-0 flex-1 flex flex-col justify-between cursor-pointer"
        onClick={() => setIsEditOpen(true)}
      >
        <p
          className={`text-sm text-gray-600 line-clamp-2 mb-2 min-h-[40px] ${
            task.description ? "max-h-[40px]" : ""
          }`}
          title={task.description}
        >
          {task.description || "Enter description..."}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <Badge variant={getBadgeVariant(task.status)}>
            {task.status?.replace("-", " ")}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
