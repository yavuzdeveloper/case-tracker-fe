import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, Plus, X } from "lucide-react";
import TaskForm from "./TaskForm";
import { TASK_STATUSES } from "@/constant";
import { Badge } from "../ui/badge";
import { getBadgeVariant } from "@/lib/utils";
import { TaskStatus } from "@/lib/types";
import useIsMobile from "@/hooks/useIsMobile";

interface HeaderProps {
  createTask: (data: any) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applyFilters: (status: string, query: string) => void;
}

const title = "Task Manager";

export default function Header({
  createTask,
  open,
  onOpenChange,
  applyFilters,
}: HeaderProps) {
  const [status, setStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);

  const isMobile = useIsMobile();

  const statusOptions = useMemo(
    () => [{ value: "all", label: "All" }, ...TASK_STATUSES],
    []
  );

  const handleApplyFilters = () => {
    setIsFilterPopoverOpen(false);
    applyFilters(status, searchQuery);
  };

  const renderFilterPopover = () => {
    const isFiltering = searchQuery.trim() !== "" || status !== "all";

    return (
      <Popover open={isFilterPopoverOpen} onOpenChange={setIsFilterPopoverOpen}>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-2 flex-1">
            {status !== "all" && (
              <Badge
                variant={getBadgeVariant(status as TaskStatus)}
                className="cursor-pointer"
              >
                {status}
              </Badge>
            )}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                readOnly
                disabled={isFilterPopoverOpen}
                className={`pl-10 pr-3 py-2 text-sm bg-white text-black cursor-pointer border border-gray-300 rounded-md hover:border-gray-400 transition-all w-full ${
                  isFiltering ? "font-medium border-gray-500 shadow-sm" : ""
                }`}
                value={searchQuery}
                placeholder="Search tasks..."
              />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-72 p-4 space-y-4">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Input
              id="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by task title..."
              className="text-black pr-10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
              >
                <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          <>
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="mt-1 bg-white text-black w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(s => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
          <Button className="w-full" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </PopoverContent>
      </Popover>
    );
  };

  const renderCreateButton = (isDesktop = false) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className={`${
            isDesktop ? "px-4 py-2 min-w-[140px]" : "w-10 h-10 p-0"
          } bg-white text-black hover:bg-gray-100 flex items-center justify-center`}
        >
          <Plus className={`w-4 h-4 ${isDesktop ? "mr-2" : ""}`} />
          {isDesktop ? "Create Task" : ""}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <TaskForm onSubmit={createTask} />
      </DialogContent>
    </Dialog>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-black text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isMobile ? (
          <div className="md:hidden py-4 space-y-4">
            <div className="text-center">
              <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <div className="flex flex-row gap-2 px-2">
              {renderFilterPopover()}
              {renderCreateButton()}
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex items-center gap-4">
              {renderFilterPopover()}
              {renderCreateButton(true)}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
