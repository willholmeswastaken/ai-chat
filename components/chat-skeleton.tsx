import { Skeleton } from "@/components/ui/skeleton";

export function ChatSkeleton() {
  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* First message skeleton */}
        <div className="space-y-2">
          <div className="flex items-start gap-2 max-w-[85%]">
            <Skeleton className="h-12 w-12 rounded-full bg-gray-700" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px] bg-gray-700" />
              <Skeleton className="h-4 w-[180px] bg-gray-700" />
            </div>
          </div>
          <div className="flex gap-2 ml-14">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-md bg-gray-700" />
            ))}
          </div>
        </div>

        {/* Second message skeleton */}
        <div className="space-y-2 flex justify-end">
          <div className="max-w-[85%]">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px] ml-auto bg-gray-700" />
              <Skeleton className="h-4 w-[150px] ml-auto bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Third message skeleton */}
        <div className="space-y-2">
          <div className="flex items-start gap-2 max-w-[85%]">
            <Skeleton className="h-12 w-12 rounded-full bg-gray-700" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[220px] bg-gray-700" />
              <Skeleton className="h-4 w-[160px] bg-gray-700" />
            </div>
          </div>
          <div className="flex gap-2 ml-14">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-md bg-gray-700" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
