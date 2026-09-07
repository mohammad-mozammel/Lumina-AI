"use server";

import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";


// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    let user = await User.findOne({ clerkId: userId });

    // Auto-create user if not found (for local dev without webhook)
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);
      
      if (!clerkUser) throw new Error("User not found in Clerk");
      
      const newUser = await User.create({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        username: clerkUser.username || clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0] || "user",
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        photo: clerkUser.imageUrl || "",
        creditBalance: 10,
        planId: 1,
      });

      // Set public metadata in Clerk
      try {
        await clerkClient.users.updateUserMetadata(userId, {
          publicMetadata: {
            userId: newUser._id.toString(),
          },
        });
      } catch (metaError) {
        console.warn("Failed to update Clerk metadata:", metaError);
      }

      user = newUser;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const filter = creditFee < 0
      ? { _id: userId, creditBalance: { $gte: Math.abs(creditFee) } }
      : { _id: userId };
    const updatedUserCredits = await User.findOneAndUpdate(
      filter,
      { $inc: { creditBalance: creditFee } },
      { new: true }
    )

    if (!updatedUserCredits) {
      throw new Error(creditFee < 0 ? "Insufficient credits" : "User credits update failed");
    }

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}