"use client";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";
import { Search } from "./Search";
import { SkeletonCollectionGrid } from "@/components/ui/skeleton";

interface CollectionProps {
  hasSearch?: boolean;
  images: IImage[];
  totalPages?: number;
  page: number;
  isLoading?: boolean;
}

export const Collection = ({
  hasSearch = false,
  images = [],
  totalPages = 1,
  page,
  isLoading = false,
}: CollectionProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  if (isLoading) {
    return (
      <>
        <div className="collection-heading">
          <h2>Recent creations</h2>
          {hasSearch && <Search />}
        </div>
        <SkeletonCollectionGrid count={4} />
        {totalPages > 1 && (
          <Pagination className="mt-10">
            <PaginationContent className="flex w-full">
              <Button
                disabled={Number(page) <= 1}
                className="primary-button"
                onClick={() => onPageChange("prev")}
              >
                <PaginationPrevious className="hover:bg-transparent " />
              </Button>

              <p className="flex-center p-16-medium w-fit flex-1">
                {page} / {totalPages}
              </p>

              <Button
                className="button w-32 primary-button text-white"
                onClick={() => onPageChange("next")}
                disabled={Number(page) >= totalPages}
              >
                <PaginationNext className="hover:bg-transparent " />
              </Button>
            </PaginationContent>
          </Pagination>
        )}
      </>
    );
  }

  return (
    <>
      <div className="collection-heading">
        <h2>Recent creations</h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="collection-list">
          {images.map((image) => (
            <Card image={image} key={image._id as string} />
          ))}
        </ul>
      ) : (
        <div className="collection-empty">
          <p className="p-20-semibold">Empty List</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <Button
              disabled={Number(page) <= 1}
              className="primary-button"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent " />
            </Button>

            <p className="flex-center p-16-medium w-fit flex-1">
              {page} / {totalPages}
            </p>

            <Button
              className="button w-32 primary-button text-white"
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent " />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {
  return (
    <li>
      <Link href={`/transformations/${image._id}`} className="collection-card">
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-[10px] object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="flex-between">
          <div className="collection-card-title">
            <p className="line-clamp-1">{image.title}</p>
            <span>{image.transformationType}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};