import { Suspense } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import CreditsClient from "./CreditsClient";
import { Skeleton } from "@/components/ui/skeleton";

async function CreditsContent() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);

  return <CreditsClient user={user} userId={userId} />;
}

function CreditsSkeleton() {
  return (
    <div className="credits-page animate-in">
      <div className="flex items-center justify-between py-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-24 rounded" />
      </div>
      <section className="credit-balance-card p-6 border rounded-2xl bg-card">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
      </section>
      <section className="lv2-section lv2-pricing mt-12" id="pricing">
        <div className="space-y-4 mb-10">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-10 w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border rounded-xl bg-card space-y-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-full rounded" />
            <ul className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="flex gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-3 w-3/4" />
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 border rounded-xl bg-card space-y-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-full rounded" />
            <ul className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="flex gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-3 w-3/4" />
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 border rounded-xl bg-card space-y-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-full rounded" />
            <ul className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="flex gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-3 w-3/4" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

const Credits = async () => {
  return (
    <Suspense fallback={<CreditsSkeleton />}>
      <CreditsContent />
    </Suspense>
  );
};

export default Credits;