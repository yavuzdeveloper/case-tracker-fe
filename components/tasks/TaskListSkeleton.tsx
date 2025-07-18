import { PAGE_TASK_SIZE } from "@/constant";
import { Skeleton } from "../ui/skeleton";

export default function TaskListSkeleton() {
  return Array.from({ length: PAGE_TASK_SIZE }).map((_, index) => (
    <div
      key={index}
      className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
    >
      <Skeleton className="h-[150px] w-full rounded-lg" />
    </div>
  ));
}
