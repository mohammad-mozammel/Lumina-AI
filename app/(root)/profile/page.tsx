import { Suspense } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { UserRound, Coins, Image as ImageIcon, Sparkles, Mail, BadgeCheck } from "lucide-react";
import { Collection } from "@/components/shared/Collection";
import Header from "@/components/shared/Header";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { Skeleton, SkeletonCard, SkeletonCollectionGrid } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/shared/UserAvatar";

interface ProfileSearchParams {
  page?: string;
  query?: string;
}

async function ProfileContent({
  searchParams,
}: {
  searchParams: Promise<ProfileSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const searchQuery = resolvedSearchParams?.query || "";
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user?._id, searchQuery });
  const totalImages = images?.totalPages ? images.totalPages * 9 : (images?.data?.length ?? 0);
  return (
    <div className="profile-page animate-in">
      <Header
        title="Your workspace"
        subtitle="A personal overview of your Lumina activity and saved work."
        action={{ label: "Create new", href: "/transformations/add/fill" }}
      />
      <section className="profile-identity">
        <UserAvatar
          photo={user?.photo}
          name={`${user?.firstName || ""} ${user?.lastName || ""}`.trim()}
          size={80}
        />
        <div>
          <span className="section-kicker">Account</span>
          <h2>{user?.firstName || "Creator"} {user?.lastName || ""}</h2>
          <p>Your saved transformations and current usage.</p>
          <div className="flex items-center gap-4 mt-3 text-sm muted">
            <span className="flex items-center gap-1">
              <Mail size={14} />
              {user?.email}
            </span>
            {user?.planId && user.planId > 1 && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                <BadgeCheck size={12} />
                Pro Plan
              </span>
            )}
          </div>
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
          <strong>{totalImages}</strong>
          <small>Total in your library</small>
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
        <div className="collection-heading">
          <h2>Your photo library</h2>
          <div className="flex items-center gap-2 text-sm muted">
            <ImageIcon size={14} />
            <span>{totalImages} images</span>
            {user?.creditBalance !== undefined && (
              <>
                <span>•</span>
                <Coins size={14} />
                <span>{user.creditBalance} credits</span>
              </>
            )}
          </div>
        </div>
        <Suspense fallback={<SkeletonCollectionGrid count={4} />}>
          <Collection
            hasSearch
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
          <Skeleton className="h-3 w-48" />
        </div>
      </section>
      <section className="profile-stats grid grid-cols-1 md:grid-cols-3 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>
      <section className="profile-library">
        <div className="collection-heading">
          <Skeleton className="h-6 w-32" />
        </div>
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