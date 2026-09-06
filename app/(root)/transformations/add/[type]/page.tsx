import { Suspense } from "react";
import Header from "@/components/shared/Header";
import { transformationTypes } from "@/constants";
import TransformationFrom from "@/components/shared/TransformationFrom";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { SkeletonTransformForm } from "@/components/ui/skeleton";

type TransformationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground";

async function TransformationContent({
  params,
}: {
  params: { type: TransformationTypeKey };
}) {
  const { userId } = auth();
  const transformation = transformationTypes[params.type];

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header
        title={transformation.title}
        subtitle={transformation.subTitle}
        action={{ label: "Back to overview", href: "/dashboard" }}
      />
      <section className="transformation-create-page">
        <TransformationFrom
          action="Add"
          userId={user?._id}
          type={transformation.type as any}
          creditBalance={user?.creditBalance}
        />
      </section>
    </>
  );
}

function TransformationSkeleton() {
  return (
    <>
      <Header
        title="Loading..."
        subtitle="Preparing transformation workspace"
        action={{ label: "Back to overview", href: "/dashboard" }}
      />
      <section className="transformation-create-page">
        <SkeletonTransformForm />
      </section>
    </>
  );
}

const AddTransformationsTypePage = async ({
  params,
}: {
  params: Promise<{ type: TransformationTypeKey }>;
}) => {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<TransformationSkeleton />}>
      <TransformationContent params={resolvedParams} />
    </Suspense>
  );
};

export default AddTransformationsTypePage;