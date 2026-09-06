import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/shared/Header";
import TransformedImage from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";

interface TransformationPageParams {
  params: Promise<{ id: string }>;
}

const ImageDetails = async ({ params }: TransformationPageParams) => {
  const { userId } = auth();
  const { id } = await params;

  const image = await getImageById(id);

  return (
    <>
      <Header
        title={image.title}
        subtitle="Review the source, result, and settings for this transformation."
        action={{ label: "Back to overview", href: "/dashboard" }}
      />

      <section className="detail-meta detail-meta-modern">
        <div>
          <span>Transformation</span>
          <strong>{image.transformationType}</strong>
        </div>
        {image.prompt && (
          <div>
            <span>Prompt</span>
            <strong>{image.prompt}</strong>
          </div>
        )}
        {image.color && (
          <div>
            <span>Color</span>
            <strong>{image.color}</strong>
          </div>
        )}
        {image.aspectRatio && (
          <div>
            <span>Aspect ratio</span>
            <strong>{image.aspectRatio}</strong>
          </div>
        )}
      </section>

      <section className="detail-workspace detail-workspace-modern">
        <div className="transformation-grid">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="transformation-original_image"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="detail-actions">
            <Button asChild type="button" className="submit-button">
              <Link href={`/transformations/${image._id}/update`}>
                Edit transformation
              </Link>
            </Button>
            <DeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;