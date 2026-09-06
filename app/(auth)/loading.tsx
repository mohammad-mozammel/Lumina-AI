"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="auth min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6">
        <Skeleton className="h-12 w-12 rounded-xl mx-auto" />
        <Skeleton className="h-6 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}