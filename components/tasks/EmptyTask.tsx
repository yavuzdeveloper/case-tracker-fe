import { Filter, Search, ClipboardList } from "lucide-react";

export default function EmptyTask({ isFiltered }: { isFiltered: boolean }) {
  const Icon = isFiltered ? Filter : ClipboardList;

  return (
    <div className="w-full flex flex-col items-center justify-center h-[300px] gap-4 p-8 text-center">
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
        <Icon className="w-12 h-12 text-muted-foreground" />
      </div>

      <div className="space-y-2">
        {isFiltered ? (
          <>
            <h3 className="text-lg font-medium text-muted-foreground">
              No results match your filters
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Try adjusting your search term or status filter to find matching
              tasks.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-medium text-muted-foreground">
              No tasks found
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              You don't have any tasks yet. Click the "Create Task" button to
              get started.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
