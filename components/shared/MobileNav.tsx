"use client"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Menu, Plus, LayoutDashboard, Wand2, Sparkles, ScanLine, Paintbrush, Image, UserRound, Coins } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { usePathname } from "next/navigation"
import Brand from "./Brand"
import { Button } from "../ui/button"

const icons = [LayoutDashboard, Wand2, Sparkles, ScanLine, Paintbrush, Image, UserRound, Coins]
export default function MobileNav() {
 const pathname=usePathname()
 return <header className="mobile-header">
   <Brand compact />
   <div className="mobile-actions">
    <SignedIn><Link href="/transformations/add/fill" className="mobile-create" aria-label="Create"><Plus size={18}/></Link><UserButton afterSignOutUrl="/" /></SignedIn>
    <SignedOut><Button asChild className="dark-button"><Link href="/sign-in">Sign in</Link></Button></SignedOut>
    <Sheet>
      <SheetTrigger asChild><button className="icon-button" aria-label="Open navigation"><Menu size={21}/></button></SheetTrigger>
      <SheetContent className="sheet-content" side="left">
        <SheetTitle><Brand /></SheetTitle>
        <div className="mobile-nav-list">
          {navLinks.map((link, index) => { const Icon=icons[index]; const active=link.route === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(link.route); return <Link key={link.route} href={link.route} className={`sidebar-link ${active ? "active":""}`}><Icon size={17}/>{link.label === "Home" ? "Overview" : link.label}</Link> })}
        </div>
      </SheetContent>
    </Sheet>
   </div>
 </header>
}
