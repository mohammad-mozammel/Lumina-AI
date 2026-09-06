import { Suspense } from "react";
import { auth } from "@clerk/nextjs";
import { getAllImages } from "@/lib/actions/image.actions";
import LandingPageClient from "@/components/shared/LandingPageClient";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SkeletonLandingHero,
  SkeletonLandingTools,
  SkeletonLandingPricing,
} from "@/components/ui/skeleton";

async function LandingContent() {
  const { userId } = auth();
  let recentImages: any[] = [];

  try {
    const result = await getAllImages({ limit: 8, page: 1, includeStats: false });
    recentImages = result?.data || [];
  } catch {
    recentImages = [];
  }

  return <LandingPageClient isSignedIn={Boolean(userId)} recentImages={recentImages} />;
}

function LandingSkeleton() {
  return (
    <div className="lv2-landing">
      <header className="lv2-nav-wrap">
        <nav className="lv2-nav">
          <div className="lv2-brand">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-5 w-24 ml-2" />
          </div>
          <div className="lv2-nav-links">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="lv2-nav-actions">
            <Skeleton className="h-4 w-12 rounded-full" />
            <Skeleton className="h-10 w-24 rounded" />
            <Skeleton className="h-10 w-10 rounded" />
          </div>
        </nav>
      </header>
      <main>
        <SkeletonLandingHero />
        <section className="lv2-trust">
          <Skeleton className="h-3 w-48 mb-4" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
        </section>
        <SkeletonLandingTools count={5} />
        <section className="lv2-section lv2-how" id="use-cases">
          <div className="lv2-how-head space-y-3 mb-10">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="lv2-steps grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center space-y-3">
                <Skeleton className="h-2 w-8 mx-auto rounded-full" />
                <Skeleton className="h-10 w-10 mx-auto rounded-full border" />
                <Skeleton className="h-6 w-24 mx-auto" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </section>
        <section className="lv2-showcase">
          <div className="lv2-showcase-copy space-y-4 max-w-xl">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-5/6" />
            <Skeleton className="h-12 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
            <div className="lv2-showcase-list space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
          <div className="lv2-library">
            <div className="lv2-collection-heading flex justify-between mb-6">
              <Skeleton className="h-6 w-32" />
              <div className="flex gap-4">
                <Skeleton className="h-10 w-40 rounded" />
                <Skeleton className="h-10 w-20 rounded" />
              </div>
            </div>
            <SkeletonLandingTools count={8} />
          </div>
        </section>
        <SkeletonLandingPricing />
        <section className="lv2-testimonial">
          <Skeleton className="h-12 w-12 mx-auto rounded-full bg-accent/20" />
          <Skeleton className="h-8 w-3/4 mx-auto max-w-2xl mt-4" />
          <Skeleton className="h-5 w-48 mx-auto mt-2" />
          <Skeleton className="h-4 w-32 mx-auto mt-1" />
          <div className="lv2-testimonial-controls flex gap-4 mt-6 justify-center">
            <Skeleton className="h-10 w-10 rounded-full border" />
            <Skeleton className="h-10 w-10 rounded-full border" />
          </div>
        </section>
        <section className="lv2-section lv2-faq" id="resources">
          <div className="lv2-faq-layout grid lg:grid-cols-[.65fr_1fr] gap-12">
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-12 w-1/2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="lv2-faq-list space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="border-b pb-4">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="lv2-cta text-center py-20 space-y-6">
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-12 w-3/4 mx-auto max-w-2xl" />
          <Skeleton className="h-12 w-5/6 mx-auto max-w-xl" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-12 w-48 mx-auto rounded" />
        </section>
      </main>
      <footer className="lv2-footer">
        <div className="lv2-footer-top grid grid-cols-2 md:grid-cols-6 gap-8 py-8">
          <div className="col-span-2 space-y-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="lv2-footer-bottom flex justify-between py-4 border-t">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </footer>
    </div>
  );
}

export default async function LandingPage() {
  return (
    <Suspense fallback={<LandingSkeleton />}>
      <LandingContent />
    </Suspense>
  );
}