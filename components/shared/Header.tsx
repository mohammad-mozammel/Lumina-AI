import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"

export default function Header({ title, subtitle, action }: { title: string, subtitle?: string, action?: {label:string, href:string} }) {
 return <header className="app-page-header">
   <div className="app-title-wrap">
     <span className="app-kicker"><Sparkles size={12}/> Lumina workspace</span>
     <h1>{title}</h1>
     {subtitle && <p>{subtitle}</p>}
   </div>
   {action && <Link href={action.href} className="outline-button">{action.label}<ArrowUpRight size={15}/></Link>}
 </header>
}
