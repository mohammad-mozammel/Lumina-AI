"use client";

import { CldImage } from "next-cloudinary";
import { UserRound } from "lucide-react";

interface UserAvatarProps {
  photo?: string;
  name: string;
  size?: number;
}

export function UserAvatar({ photo, name, size = 80 }: UserAvatarProps) {
  return (
    <div className="profile-avatar">
      {photo ? (
        <CldImage
          src={photo}
          alt={name}
          width={size}
          height={size}
          crop="fill"
          gravity="face"
          className="rounded-full"
        />
      ) : (
        <UserRound size={size * 0.28} />
      )}
    </div>
  );
}