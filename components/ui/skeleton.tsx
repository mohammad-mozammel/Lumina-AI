"use client"

import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/50", className)}
      {...props}
    />
  )
}

export function SkeletonText({ lines = 3, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { lines?: number }) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full max-w-[250px]" />
      ))}
    </div>
  )
}

export function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-4 p-4 border rounded-xl bg-card", className)} {...props}>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-32 w-full rounded-lg" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 rounded" />
        <Skeleton className="h-8 w-20 rounded" />
      </div>
    </div>
  )
}

export function SkeletonDashboardHero({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("dashboard-hero", className)} {...props}>
      <div className="dashboard-hero-copy space-y-4">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <div className="flex gap-3 mt-4">
          <Skeleton className="h-11 w-36 rounded" />
          <Skeleton className="h-11 w-32 rounded" />
        </div>
      </div>
      <div className="dashboard-hero-orbit">
        <Skeleton className="h-40 w-40 rounded-full" />
      </div>
    </div>
  )
}

export function SkeletonStatsGrid({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("stats-grid grid grid-cols-2 md:grid-cols-4 gap-4", className)} {...props}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-xl bg-card space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonToolGrid({ count = 5, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { count?: number }) {
  return (
    <div className={cn("tool-quick-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3", className)} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="tool-quick p-4 border rounded-xl bg-card space-y-3">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonCollectionGrid({ count = 4, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { count?: number }) {
  return (
    <div className={cn("collection-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <article key={i} className="collection-card border rounded-xl bg-card overflow-hidden">
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="p-3 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </article>
      ))}
    </div>
  )
}

export function SkeletonTransformForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("transformation-form grid lg:grid-cols-[1fr_350px] gap-5", className)} {...props}>
      <div className="studio-panel space-y-5 p-5 border rounded-2xl bg-card">
        <div className="studio-toolbar border-b pb-4">
          <div className="space-y-1">
            <Skeleton className="h-2 w-16" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
        </div>
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="studio-panel studio-side sticky top-5 space-y-5 p-5 border rounded-2xl bg-card">
        <div className="studio-side-heading border-b pb-4">
          <div className="space-y-1">
            <Skeleton className="h-2 w-20" />
            <Skeleton className="h-5 w-28" />
          </div>
          <Skeleton className="h-5 w-5" />
        </div>
        <div className="space-y-5">
          <div className="form-section space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-11 w-full rounded" />
          </div>
          <div className="form-section space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-11 w-full rounded" />
          </div>
          <div className="form-section space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-11 w-full rounded" />
          </div>
          <div className="studio-info grid grid-cols-2 gap-4 p-3 rounded-lg bg-muted/30">
            <div className="space-y-1">
              <Skeleton className="h-2 w-20" />
              <Skeleton className="h-5 w-12" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-2 w-12" />
              <Skeleton className="h-5 w-10" />
            </div>
          </div>
          <Skeleton className="h-12 w-full rounded" />
          <Skeleton className="h-12 w-full rounded" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonLandingHero({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn("lv2-hero grid lg:grid-cols-[.86fr_1.14fr] gap-12 min-h-[720px] items-center", className)} {...props}>
      <div className="lv2-hero-copy space-y-6 max-w-2xl">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-5/6" />
        <Skeleton className="h-14 w-4/5" />
        <Skeleton className="h-5 w-3/4" />
        <div className="flex gap-4 mt-6">
          <Skeleton className="h-12 w-40 rounded" />
          <Skeleton className="h-12 w-32 rounded" />
        </div>
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      </div>
      <div className="lv2-hero-preview">
        <Skeleton className="aspect-[4/3] w-full rounded-2xl bg-muted/30" />
      </div>
    </section>
  )
}

export function SkeletonLandingTools({ count = 5, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { count?: number }) {
  return (
    <section className={cn("lv2-section lv2-tools-section", className)} {...props}>
      <div className="lv2-section-head space-y-3 mb-10">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-5 w-1/2" />
      </div>
      <div className="lv2-tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <article key={i} className="lv2-tool-card border rounded-xl p-5 bg-card space-y-4 min-h-[235px]">
            <div className="flex justify-between">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-full border" />
            </div>
            <Skeleton className="h-6 w-24 mt-16" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="aspect-video w-full rounded-lg" />
          </article>
        ))}
      </div>
    </section>
  )
}

export function SkeletonLandingPricing({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn("lv2-section lv2-pricing", className)} {...props}>
      <div className="lv2-pricing-head flex justify-between items-end mb-10">
        <div className="space-y-3">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-12 w-1/2" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="lv2-pricing-grid grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <article key={i} className="pricing-card border rounded-xl p-6 bg-card space-y-4">
            {i === 1 && <Skeleton className="h-5 w-20 rounded-full self-start" />}
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-full rounded" />
            <ul className="space-y-3 border-t pt-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <li key={j} className="flex gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-3 w-3/4" />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export { Skeleton }