"use client";

import { Suspense, lazy, ComponentType } from "react";
import { Skeleton } from "./skeleton";

export function dynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFn);

  return function DynamicComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback ?? <Skeleton className="h-64 w-full" />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export const DynamicMediaUploader = dynamicImport(
  () => import("@/components/shared/MediaUploader"),
  <Skeleton className="aspect-[4/3] w-full rounded-xl bg-muted/30" />
);

export const DynamicTransformedImage = dynamicImport(
  () => import("@/components/shared/TransformedImage"),
  <Skeleton className="aspect-[4/3] w-full rounded-xl bg-muted/30" />
);

export const DynamicSidebar = dynamicImport(
  () => import("@/components/shared/Sidebar"),
  <Skeleton className="h-64 w-64" />
);

export const DynamicMobileNav = dynamicImport(
  () => import("@/components/shared/MobileNav"),
  <Skeleton className="h-16 w-full" />
);