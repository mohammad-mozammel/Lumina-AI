"use client"
import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import Brand from "./Brand"
import { Coins, Image, LayoutDashboard, Paintbrush, ScanLine, Sparkles, UserRound, Wand2, Plus, ChevronRight } from "lucide-react"

const icons = [LayoutDashboard, Wand2, Sparkles, ScanLine, Paintbrush, Image, UserRound, Coins]

export default function Sidebar() {
  const pathname = usePathname()
  return <aside className="sidebar">
    <div className="sidebar-top">
      <Brand />
      <SignedIn>
        <Link href="/transformations/add/fill" className="create-button"><Plus size={17}/> Create <ChevronRight size={15}/></Link>
      </SignedIn>
      <nav className="sidebar-nav" aria-label="Primary navigation">
        <p className="nav-label">Workspace</p>
        <SignedIn>
          {navLinks.slice(0, 6).map((link, index) => {
            const Icon = icons[index]
            const active = link.route === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(link.route)
            return <Link key={link.route} href={link.route} className={`sidebar-link ${active ? "active" : ""}`}>
              <span className="nav-icon"><Icon size={16}/></span><span>{link.label === "Home" ? "Overview" : link.label}</span>{active && <span className="nav-active-dot" />}
            </Link>
          })}
          <p className="nav-label nav-label-spaced">Account</p>
          {navLinks.slice(6).map((link, index) => {
            const Icon = icons[index + 6]
            const active = pathname.startsWith(link.route)
            return <Link key={link.route} href={link.route} className={`sidebar-link ${active ? "active" : ""}`}>
              <span className="nav-icon"><Icon size={16}/></span><span>{link.label}</span>{active && <span className="nav-active-dot" />}
            </Link>
          })}
        </SignedIn>
        <SignedOut>
          <Button asChild className="create-button"><Link href="/sign-in">Sign in</Link></Button>
        </SignedOut>
      </nav>
    </div>
    <SignedIn>
      <div className="sidebar-user"><UserButton afterSignOutUrl="/" showName /></div>
    </SignedIn>
  </aside>
}
