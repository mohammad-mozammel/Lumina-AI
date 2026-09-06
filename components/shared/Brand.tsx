"use client"
import Link from "next/link"
import Image from "next/image"

export default function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="Lumina AI home">
      <span className="brand-mark brand-mark-image" aria-hidden="true">
        <Image src="/lumina-icon.png" alt="" width={34} height={34} />
      </span>
      {!compact && <span className="brand-word">Lumina <span>AI</span></span>}
    </Link>
  )
}
