import { Suspense } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { UserRound, Coins, Image as ImageIcon, Sparkles } from "lucide-react";
import { Collection } from "@/components/shared/Collection";
import Header from "@/components/shared/Header";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { Skeleton, SkeletonCard, SkeletonCollectionGrid } from "@/components/ui/skeleton";

interface ProfileSearchParams {
  page?: string;
}

async function ProfileContent({
  searchParams,
}: {
  searchParams: Promise<ProfileSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user?._id });

  return (
    <div className="profile-page animate-in">
      <Header
        title="Your workspace"
        subtitle="A personal overview of your Lumina activity and saved work."
        action={{ label: "Create new", href: "/transformations/add/fill" }}
      />
      <section className="profile-identity">
        <div className="profile-avatar">
          <UserRound size={23} />
        </div>
        <div>
          <span className="section-kicker">Account</span>
          <h2>Creator workspace</h2>
          <p>Your saved transformations and current usage.</p>
        </div>
      </section>
      <section className="profile-stats">
        <article>
          <div className="stat-row">
            <span>Credits available</span>
            <b>
              <Coins size={16} />
            </b>
          </div>
          <strong>{user?.creditBalance ?? 0}</strong>
          <small>Ready for your next transformation</small>
        </article>
        <article>
          <div className="stat-row">
            <span>Images created</span>
            <b>
              <ImageIcon size={16} aria-hidden="true" />
            </b>
          </div>
          <strong>{images?.data?.length ?? 0}</strong>
          <small>Showing the current library page</small>
        </article>
        <article>
          <div className="stat-row">
            <span>Creative tools</span>
            <b>
              <Sparkles size={16} />
            </b>
          </div>
          <strong>5</strong>
          <small>Enhance, remove, fill, recolor & restore</small>
        </article>
      </section>
      <section className="profile-library">
        <Suspense fallback={<SkeletonCollectionGrid count={4} />}>
          <Collection
            images={images?.data ?? []}
            totalPages={images?.totalPages}
            page={page}
          />
        </Suspense>
      </section>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="profile-page animate-in">
      <Header
        title="Loading..."
        subtitle="Preparing your workspace"
        action={{ label: "Create new", href: "/transformations/add/fill" }}
      />
      <section className="profile-identity">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 mt-4">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      </section>
      <section className="profile-stats grid grid-cols-1 md:grid-cols-3 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>
      <section className="profile-library">
        <SkeletonCollectionGrid count={4} />
      </section>
    </div>
  );
}

const Profile = async ({
  searchParams,
}: {
  searchParams: Promise<ProfileSearchParams>;
}) => {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent searchParams={searchParams} />
    </Suspense>
  );
};

export default Profile;