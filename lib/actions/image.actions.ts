"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";

const populateUser = (query: any) => query.populate({
  path: 'author',
  model: User,
  select: '_id firstName lastName clerkId'
})

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ADD IMAGE
export async function addImage({ image, userId, path }: AddImageParams) {
  try {

    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error("User not found");
    }
    const ImageInfo = {
      ...image,
      author: author._id,
    }

    const newImage = await Image.create(ImageInfo)

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error)
  }
}

// UPDATE IMAGE
export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    await connectToDatabase();

    const imageToUpdate = await Image.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error("Unauthorized or image not found");
    }

    const updatedImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    )

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    handleError(error)
  }
}

// DELETE IMAGE
export async function deleteImage(imageId: string) {
  try {
    await connectToDatabase();

    await Image.findByIdAndDelete(imageId);
  } catch (error) {
    handleError(error)
  } finally {
    redirect('/')
  }
}

// GET IMAGE
export async function getImageById(imageId: string) {
  try {
    await connectToDatabase();

    const image = await populateUser(Image.findById(imageId));

    if (!image) throw new Error("Image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error)
  }
}

// GET IMAGES
export async function getAllImages({ limit = 9, page = 1, searchQuery = '', includeStats = true }: {
  limit?: number;
  page: number;
  searchQuery?: string;
  includeStats?: boolean;
}) {
  try {
    await connectToDatabase();

    const safeSearchQuery = escapeRegex(searchQuery.trim()).slice(0, 80);
    const query = safeSearchQuery
      ? {
        $or: [
          { title: { $regex: safeSearchQuery, $options: 'i' } },
          { prompt: { $regex: safeSearchQuery, $options: 'i' } },
          { color: { $regex: safeSearchQuery, $options: 'i' } },
        ]
      }
      : {};

    const skipAmount = (Number(page) - 1) * limit;

    const imageQuery = populateUser(Image.find(query)
      .select('title transformationType publicId secureURL width height config aspectRatio color prompt author createdAt updatedAt')
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit)
      .lean());

    const countQuery = includeStats
      ? Promise.all([Image.countDocuments(query), Image.estimatedDocumentCount()])
      : Promise.resolve([0, 0]);

    const [images, [totalImages, savedImages]] = await Promise.all([imageQuery, countQuery]);

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPage: includeStats ? Math.ceil(totalImages / limit) : 0,
      savedImages,
    }
  } catch (error) {
    handleError(error)
  }
}

// GET IMAGES BY USER
export async function getUserImages({
  limit = 9,
  page = 1,
  userId,
  searchQuery = '',
}: {
  limit?: number;
  page: number;
  userId: string;
  searchQuery?: string;
}) {
  try {
    await connectToDatabase();

    const safeSearchQuery = escapeRegex(searchQuery.trim()).slice(0, 80);
    const query = safeSearchQuery
      ? {
          author: userId,
          $or: [
            { title: { $regex: safeSearchQuery, $options: 'i' } },
            { prompt: { $regex: safeSearchQuery, $options: 'i' } },
            { color: { $regex: safeSearchQuery, $options: 'i' } },
          ],
        }
      : { author: userId };

    const skipAmount = (Number(page) - 1) * limit;

    const imagesQuery = populateUser(Image.find(query)
      .select('title transformationType publicId secureURL width height config aspectRatio color prompt author createdAt updatedAt')
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit)
      .lean());

    const [images, totalImages] = await Promise.all([
      imagesQuery,
      Image.countDocuments(query),
    ]);

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
    };
  } catch (error) {
    handleError(error);
  }
}