import { Suspense } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getAllImages, getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.actions";
import Link from "next/link";
import { Collection } from "@/components/shared/Collection";
import {
  ArrowRight,
  ImagePlus,
  Sparkles,
  Eraser,
  Paintbrush,
  ScanLine,
  Wand2,
  TrendingUp,
  Coins,
  Download,
  Layers3,
  UserRound,
  Image as ImageIcon,
} from "lucide-react";
import {
  SkeletonDashboardHero,
  SkeletonStatsGrid,
  SkeletonToolGrid,
  SkeletonCollectionGrid,
  Skeleton,
} from "@/components/ui/skeleton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const tools = [
  {
    label: "Enhance",
    desc: "Restore clarity",
    href: "/transformations/add/restore",
    icon: <Wand2 size={17} />,
  },
  {
    label: "Remove background",
    desc: "Clean cutouts",
    href: "/transformations/add/removeBackground",
    icon: <ScanLine size={17} />,
  },
  {
    label: "Object remove",
    desc: "Erase distractions",
    href: "/transformations/add/remove",
    icon: <Eraser size={17} />,
  },
  {
    label: "Recolor",
    desc: "Change details",
    href: "/transformations/add/recolor",
    icon: <Paintbrush size={17} />,
  },
  {
    label: "Generative fill",
    desc: "Extend the frame",
    href: "/transformations/add/fill",
    icon: <Sparkles size={17} />,
  },
];

interface DashboardSearchParams {
  page?: string;
  query?: string;
}

async function DashboardContent({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const searchQuery = resolvedSearchParams?.query || "";

  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const userImages = await getUserImages({ page, userId: user?._id, searchQuery });
  const allImages = await getAllImages({ page, searchQuery, limit: 9 });
  const recentCount = userImages?.data?.length ?? 0;
  const totalImages = userImages?.totalPages ? userImages.totalPages * 9 : recentCount;

  return (
    <div className="dashboard-page animate-in">
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <span className="dashboard-eyebrow">
            <Sparkles size={12} /> Welcome back, {user?.firstName || "Creator"}
          </span>
          <h2>
            Create. Transform.<br /><em>Refine.</em>
          </h2>
          <p>
            Choose a tool, upload an image, and let Lumina handle the repetitive
            work while you stay in control.
          </p>
          <div className="dashboard-hero-actions">
            <Link href="/transformations/add/fill" className="primary-button">
              <Sparkles size={15} /> Start creating
            </Link>
            <Link href="#tools" className="secondary-button light">
              Explore tools
            </Link>
          </div>
        </div>
        <div className="dashboard-hero-orbit">
          <div className="hero-orbit-ring" />
          <div className="hero-orbit-core">
            <Sparkles size={30} />
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <article>
          <span>Images created</span>
          <strong>{totalImages}</strong>
          <small>
            <Layers3 size={13} /> Total in your library
          </small>
        </article>
        <article>
          <span>Credits available</span>
          <strong>{user?.creditBalance ?? 0}</strong>
          <small>
            <Coins size={13} /> Ready for transformations
          </small>
        </article>
        <article>
          <span>AI tools</span>
          <strong>5</strong>
          <small>
            <Sparkles size={13} /> Ready to use
          </small>
        </article>
        <article>
          <span>This page</span>
          <strong>{recentCount}</strong>
          <small>
            <Download size={13} /> Showing current page
          </small>
        </article>
      </section>

      <section id="tools" className="dashboard-section">
        <div className="section-head">
          <div>
            <h2>Tools for every image</h2>
            <span className="muted">Choose a transformation</span>
          </div>
        </div>
        <div className="tool-quick-grid">
          {tools.map((t) => (
            <Link href={t.href} key={t.label} className="tool-quick">
              <div className="tool-quick-icon">{t.icon}</div>
              <div>
                <p>{t.label}</p>
                <span>{t.desc}</span>
              </div>
              <ArrowRight size={14} className="tool-arrow" />
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-section dashboard-library">
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
            images={allImages?.data ?? []}
            totalPages={allImages?.totalPage}
            page={page}
          />
        </Suspense>
      </section>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="dashboard-page animate-in">
      <SkeletonDashboardHero />
      <SkeletonStatsGrid />
      <section id="tools" className="dashboard-section">
        <div className="section-head">
          <div>
            <h2>Tools for every image</h2>
            <span className="muted">Choose a transformation</span>
          </div>
        </div>
        <SkeletonToolGrid count={5} />
      </section>
      <section className="dashboard-section dashboard-library">
        <div className="collection-heading">
          <Skeleton className="h-6 w-40" />
        </div>
        <SkeletonCollectionGrid count={4} />
      </section>
    </div>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent searchParams={searchParams} />
    </Suspense>
  );
}