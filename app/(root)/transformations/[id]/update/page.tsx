import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { getImageById } from "@/lib/actions/image.actions";
import TransformationFrom from "@/components/shared/TransformationFrom";

type TransformationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground";

interface TransformationUpdatePageParams {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: TransformationUpdatePageParams) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const { id } = await params;
  const user = await getUserById(userId);
  const image = await getImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header
        title={transformation.title}
        subtitle={transformation.subTitle}
        action={{ label: "Cancel", href: `/transformations/${image._id}` }}
      />

      <section className="transformation-edit-page">
        <TransformationFrom
          action="Update"
          userId={user._id}
          type={image.transformationType as any}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;