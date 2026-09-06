import { Suspense } from "react";
import { getAllImages } from "@/lib/actions/image.actions";
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
} from "lucide-react";
import {
  SkeletonDashboardHero,
  SkeletonStatsGrid,
  SkeletonToolGrid,
  SkeletonCollectionGrid,
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
  const images = await getAllImages({ page, searchQuery });
  const recentCount = images?.data?.length ?? 0;

  return (
    <div className="dashboard-page animate-in">
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <span className="dashboard-eyebrow">
            <Sparkles size={12} /> Creative workspace
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
          <span>Recent results</span>
          <strong>{recentCount}</strong>
          <small>
            <Layers3 size={13} /> On this page
          </small>
        </article>
        <article>
          <span>Credit workflow</span>
          <strong>1</strong>
          <small>
            <Coins size={13} /> Credit per transform
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
          <span>Library</span>
          <strong>∞</strong>
          <small>
            <Download size={13} /> Save & export
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
        <Suspense fallback={<SkeletonCollectionGrid count={4} />}>
          <Collection
            hasSearch
            images={images?.data ?? []}
            totalPages={images?.totalPage}
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