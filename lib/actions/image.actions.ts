"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";
import { updateCredits } from "./user.actions";

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

// GENERATE IMAGE (Text-to-Image) - Using Pollinations.AI (FREE, no API key needed)
export async function generateImage({
  prompt,
  aspectRatio,
  userId,
  path,
}: {
  prompt: string;
  aspectRatio: string;
  userId: string;
  path: string;
}) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (user.creditBalance < 1) throw new Error("Insufficient credits");

    // Map aspect ratio to width/height
    const [w, h] = aspectRatio.split(":").map(Number);
    const width = 1024;
    const height = Math.round(1024 * (h / w));

    // Use Pollinations.AI - FREE, no API key required
    // https://pollinations.ai/
    const encodedPrompt = encodeURIComponent(prompt);
    const generatedImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true&model=flux`;

    // Download the image as buffer first
    const imageResponse = await fetch(generatedImageUrl);
    if (!imageResponse.ok) {
      throw new Error("Failed to generate image from Pollinations.AI");
    }
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const dataUri = `data:image/png;base64,${base64Image}`;

    // Upload generated image to Cloudinary from buffer
    const cloudinary = (await import("cloudinary")).v2;
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "lumina/generated",
      resource_type: "image",
    });

    // Deduct credit
    await updateCredits(userId, -1);

    // Save to database
    const newImage = await Image.create({
      title: prompt.slice(0, 50),
      transformationType: "generate",
      publicId: uploadResult.public_id,
      secureURL: uploadResult.secure_url,
      width: uploadResult.width,
      height: uploadResult.height,
      config: { prompt, aspectRatio },
      prompt,
      aspectRatio,
      author: user._id,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error: any) {
    if (error?.detail?.includes("insufficient credit") || error?.status === 402) {
      throw new Error("Replicate API credits required. Add credits at https://replicate.com/account/billing");
    }
    handleError(error);
  }
}