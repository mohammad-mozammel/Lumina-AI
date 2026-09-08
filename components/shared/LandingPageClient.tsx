"use client"

import Link from "next/link"
import { CldImage } from "next-cloudinary"
import {
  ArrowRight, Check, ChevronDown, Eraser, Expand, ImagePlus, Layers3,
  Menu, Palette, ScanLine, ShieldCheck, Sparkles, Upload, Wand2, Play, X, Zap, CheckCircle, Search
} from "lucide-react"
import { useState } from "react"

import Image from "next/image"


type LandingImage = {
  _id?: string
  publicId: string
  title?: string
  transformationType?: string
  width?: number
  height?: number
  config?: Record<string, unknown>
}

const tools = [
  { title: "Generate Image", text: "Create images from text prompts.", icon: Sparkles, image: "/assets/images/Enhance.webp" },
  { title: "Enhance", text: "Restore clarity and detail.", icon: Wand2, image: "/assets/images/Enhance.webp" },
  { title: "Remove Background", text: "Instantly remove and clean backgrounds.", icon: ScanLine, image: "/assets/images/Remove Background.webp" },
  { title: "Object Remove", text: "Erase unwanted objects in seconds.", icon: Eraser, image: "/assets/images/Object Remove.webp" },
  { title: "Generative Fill", text: "Extend, replace or imagine new content.", icon: Expand, image: "/assets/images/Generative Fill.webp" },
  { title: "Recolor", text: "Change colors to match your vision.", icon: Palette, image: "/assets/images/Recolor.webp" },
]

const faqs = [
  ["What is Lumina AI?", "Lumina AI is an AI image creation and transformation workspace for generating, enhancing, restoring, removing, recoloring and extending images from one place."],
  ["How does the credit system work?", "Credits are consumed when you run an AI operation. You see the estimated cost before submitting a transformation, keeping usage predictable."],
  ["Can I use Lumina AI without a subscription?", "Yes. You can start with the free plan and use the included monthly credits before deciding whether you need more capacity."],
  ["Can I cancel anytime?", "Yes. Paid plans are designed to be flexible and can be managed from your account settings."],
  ["Which image formats are supported?", "Common image formats such as JPG, PNG and WebP can be used for image workflows, subject to the current upload limits."],
]

const trustedBrands = [
  { name: "Adobe", src: "/assets/icons/Adobe.svg" },
  { name: "Canva", src: "/assets/icons/Canva.svg" },
  { name: "Figma", src: "/assets/icons/Figma.svg" },
  { name: "Framer", src: "/assets/icons/Framer.svg" },
  { name: "Notion", src: "/assets/icons/Notion.svg" },
  { name: "Webflow", src: "/assets/icons/Webflow.svg" },
]

const pricingPlans = [
  {
    label: "FREE",
    name: "Explore",
    description: "Perfect for trying out Lumina AI.",
    monthly: 0,
    cta: "Get started",
    features: ["20 credits / month", "Basic AI tools", "Standard resolution", "Community support"],
  },
  {
    label: "CREATOR",
    name: "Pro",
    description: "More credits, more power, more possibilities.",
    monthly: 19,
    cta: "Start Pro",
    featured: true,
    features: ["1,000 credits / month", "All AI tools", "High resolution exports", "Priority processing", "Email support"],
  },
  {
    label: "PRO",
    name: "Studio",
    description: "For teams and high volume creators.",
    monthly: 49,
    cta: "Start Studio",
    features: ["5,000 credits / month", "All AI tools", "Highest resolution", "Team collaboration", "Priority support"],
  },
]

const reviews = [
  {
    quote: "Lumina AI turns the messy part of working with images into one calm, repeatable workflow. Total game changer.",
    initials: "DR",
    name: "Darlene Robertson",
    role: "Product Designer",
  },
  {
    quote: "I can go from a rough concept to a polished campaign asset in minutes instead of losing an afternoon to busywork.",
    initials: "JM",
    name: "Jordan Mitchell",
    role: "Creative Director",
  },
  {
    quote: "The background removal and generative fill tools have become essential to our daily content workflow.",
    initials: "SK",
    name: "Sofia Kim",
    role: "E-commerce Founder",
  },
  {
    quote: "Lumina gives our whole team a faster way to explore ideas while keeping the final output beautifully consistent.",
    initials: "AN",
    name: "Alex Nguyen",
    role: "Brand Strategist",
  },
]

const showcasePlaceholders = [
  "/assets/images/Mountain.webp",
  "/assets/images/Portrait.webp",
  "/assets/images/Sea beach.webp",
  "/assets/images/Mohammad Mozammel.webp",
  "/assets/images/Mountain (2).webp",
  "/assets/images/Room interior.webp",
  "/assets/images/Energy.webp",
  "/assets/images/House.webp",

]

function ProductPreview() {
  return (
    <div className="lv2-product-frame lv2-dashboard-preview">
      <div className="lv2-dashboard-shell">
        <aside className="lv2-dashboard-sidebar">
          <div className="lv2-dashboard-brand"><Image src="/lumina-icon.png" alt="" width={15} height={15} /> <span>Lumina <small>AI</small></span></div>
          <div className="lv2-dashboard-create"><span>+</span> Create <b>›</b></div>
          <small className="lv2-dashboard-label">Workspace</small>
          {[
            ["✣", "Generate Image"], ["✣", "Image Restore"], ["⌁", "Generative Fill"],
            ["⌘", "Object Remove"], ["♢", "Object Recolor"], ["▧", "Background Remove"],
          ].map(([icon, label], index) => <div className={`lv2-dashboard-nav ${index === 0 ? "is-active" : ""}`} key={label}><span>{icon}</span>{label}{index === 0 ? <b>•</b> : null}</div>)}
          <small className="lv2-dashboard-label lv2-dashboard-label-account">Account</small>
          <div className="lv2-dashboard-nav"><span>♙</span>Profile</div>
          <div className="lv2-dashboard-nav"><span>◉</span>Buy Credits</div>
          <div className="lv2-dashboard-user"><span>M</span><small>Mohammad Mozammel</small></div>
        </aside>
        <div className="lv2-dashboard-main">
          <section className="lv2-dashboard-hero-card">
            <div><span className="lv2-dashboard-eyebrow">* Creative workspace</span><h3>Create. Transform.<br /><em>Refine.</em></h3><p>Choose a tool, upload an image, and let Lumina handle the repetitive work while you stay in control.</p><div><span>✣ &nbsp; Start creating</span><b>Explore tools</b></div></div>
            <div className="lv2-dashboard-orbit"><Sparkles size={5} /> </div>
          </section>
          <div className="lv2-dashboard-stats">
            <div><small>Recent results</small><strong>{showcasePlaceholders.length}</strong><span>♧ On this page</span></div>
            <div><small>Credit workflow</small><strong>1</strong><span>◉ Credit per transform</span></div>
            <div><small>AI tools</small><strong>5</strong><span>✣ Ready to use</span></div>
            <div><small>Library</small><strong>∞</strong><span>⇩ Save & export</span></div>
          </div>
          <div className="lv2-dashboard-section-head"><h4>Tools for every image</h4></div>
          <div className="lv2-dashboard-tools">{["Generate Image", "Enhance", "Remove Background", "Object Remove", "Recolor", "Generative Fill"].map((tool, index) => <div key={tool}><i>{["✣", "✣", "⌁", "⌘", "♢", "⌁"][index]}</i><strong>{tool}</strong><small>{["Create from text", "Restore clarity", "Clean cutouts", "Erase distractions", "Change details", "Extend the frame"][index]}</small><b>›</b></div>)}</div>
          <div className="lv2-dashboard-library-head"><h4>Recent creations</h4><span>⌕ &nbsp; Search</span></div>
          <div className="lv2-dashboard-library">
            {showcasePlaceholders.map((src) => <Image key={src} src={src} width={500} height={500} alt="Lumina AI creation" />)}
          </div>
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return <div className="lv2-faq-list">{faqs.map(([q, a], i) => <div className={`lv2-faq-item ${open === i ? "is-open" : ""}`} key={q}>
    {
      open === i ? (
        <button onClick={() => setOpen(null)}><span>{q}</span>-</button>
      ) : (
        <button onClick={() => setOpen(i)}><span>{q}</span>+</button>
      )
    }
    <div className="lv2-faq-answer"><p>{a}</p></div>
  </div>)}</div>
}

function TestimonialCarousel() {
  const [activeReview, setActiveReview] = useState(0)
  const review = reviews[activeReview]

  const showReview = (direction: number) => {
    setActiveReview((current) => (current + direction + reviews.length) % reviews.length)
  }

  return (
    <section className="lv2-testimonial" aria-label="Customer reviews">
      <div className="lv2-quote">“</div>
      <blockquote key={activeReview}>{review.quote}</blockquote>
      <div className="lv2-person">
        <span>{review.initials}</span>
        <div><span>{review.name}</span><small>{review.role}</small></div>
      </div>
      <div className="lv2-testimonial-controls">
        {/* <div className="lv2-testimonial-dots" aria-label="Choose a review">
          {reviews.map((item, index) => <button key={item.name} type="button" className={index === activeReview ? "is-active" : ""} onClick={() => setActiveReview(index)} aria-label={`Show review from ${item.name}`} aria-current={index === activeReview ? "true" : undefined} />)}
        </div> */}
        <div className="lv2-testimonial-arrows">
          <button type="button" onClick={() => showReview(-1)} aria-label="Previous review">←</button>
          <button type="button" onClick={() => showReview(1)} aria-label="Next review">→</button>
        </div>
      </div>
      <div className="lv2-testimonial-sparkles">
        <Sparkles size={15} />
      </div>
    </section>
  )
}

export default function LandingPage({ isSignedIn, recentImages = [] }: { isSignedIn: boolean; recentImages?: LandingImage[] }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  const href = isSignedIn ? "/dashboard" : "/sign-up"
  const label = isSignedIn ? "Open workspace" : "Start creating for free"

  const formatPrice = (amount: number) => {
    if (amount === 0) return "$0"
    return amount % 1 === 0 ? `$${amount}` : `$${amount.toFixed(2)}`
  }

  const getDisplayedPrice = (amount: number) => (billing === "yearly" && amount > 0 ? amount * 0.8 : amount)

  return <div className="lv2-landing">
    <header className="lv2-nav-wrap">
      <nav className="lv2-nav">
        <Link href="/" className="lv2-brand "><span><Sparkles size={15} /></span>Lumina <strong>AI</strong> </Link>
        <div className="lv2-nav-links">
          <a href="#product">Product </a><a href="#tools">Tools</a><a href="#use-cases">Use Cases </a><a href="#pricing">Pricing</a><a href="#resources">Resources </a>
        </div>
        <div className="lv2-nav-actions"> {!isSignedIn ? <Link href="/sign-in" className="lv2-login">Log in</Link> : null}<Link href={href} className="lv2-dark-button signup">{isSignedIn ? "Open workspace" : "Start free"} <ArrowRight size={14} /></Link><button className="lv2-menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
      </nav>
      {mobileOpen && <div className="lv2-mobile-menu"><a href="#product" onClick={() => setMobileOpen(false)}>Product</a><a href="#tools" onClick={() => setMobileOpen(false)}>Tools</a><a href="#use-cases" onClick={() => setMobileOpen(false)}>Use Cases</a><a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a><a href="#resources" onClick={() => setMobileOpen(false)}>Resources</a><Link href="/sign-in">Log in</Link></div>}
    </header>

    <main>
      <section className="lv2-hero" id="product">
        <div className="lv2-hero-copy">
          <div className="lv2-eyebrow"><Sparkles size={13} /> AI image creation & transformation studio</div>
          <h1>Create<br />Transform<br /><em>Refine</em></h1>
          <p>All-in-one AI workspace to generate, enhance and edit images. Everything you need. One beautiful workspace.</p>
          <div className="lv2-hero-actions"><Link href={href} className="lv2-dark-button lv2-hero-cta"><Sparkles size={15} />{label}<ArrowRight size={15} /></Link><a href="#use-cases" className="lv2-secondary"><span><Play size={11} fill="currentColor" /></span> See how it works</a></div>
          <div className="lv2-benefits"><span><CheckCircle size={14} /> No credit card required</span><span><CheckCircle size={14} /> Free credits every month</span><span><CheckCircle size={14} /> Cancel anytime</span></div>
        </div>
        <div className="lv2-hero-preview"><ProductPreview /></div>
      </section>

      <section className="lv2-trust"><span>TRUSTED BY CREATORS & TEAMS WORLDWIDE</span><div>{trustedBrands.map((brand) => <Image key={brand.name} className={`lv2-brand-${brand.name.toLowerCase()}`} src={brand.src} width={92} height={26} alt={brand.name} />)}</div></section>

      <section className="lv2-section lv2-tools-section" id="tools">
        <div className="lv2-section-head"><div><span className="lv2-kicker"><Sparkles size={13} /> POWERFUL AI TOOLS</span><h2>Everything you need to<br />create without limits.</h2></div><p>From simple edits to complete transformations, Lumina AI gives you the tools to bring your ideas to life.</p></div>
        <div className="lv2-tools-grid">{tools.map(({ title, text, icon: Icon, image }) => <article className="lv2-tool-card" key={title}><div className="lv2-tool-top"><span><Icon size={18} /></span><ArrowRight size={18} /></div><h3>{title}</h3><p>{text}</p><div className="lv2-tool-image"><Image src={image} alt="" width={600} height={400} loading="lazy" /></div></article>)}</div>
      </section>

      <section className="lv2-section lv2-how" id="use-cases">
        <div className="lv2-how-head"><div><span className="lv2-kicker"><Sparkles size={13} /> HOW IT WORKS</span><h2>Three simple steps<br />to amazing results.</h2></div><p>From an idea to a polished asset without the busywork.</p></div>
        <div className="lv2-steps">
          <div><span className="lv2-step-number">01</span><div className="lv2-step-icon"><Upload size={21} strokeWidth={1.8} /></div><h3>Upload or start</h3><p>Upload your image or start with a blank canvas.</p></div>
          <div><span className="lv2-step-number">02</span><div className="lv2-step-icon"><Wand2 size={21} strokeWidth={1.8} /></div><h3>Choose a tool</h3><p>Select the AI tool you want and customize your preferences.</p></div>
          <div><span className="lv2-step-number">03</span><div className="lv2-step-icon"><ImagePlus size={21} strokeWidth={1.8} /></div><h3>Generate & export</h3><p>Generate, refine and export your image in high quality.</p></div>
        </div>
      </section>

      <section className="lv2-showcase">
        <div className="lv2-showcase-copy">
          <span className="lv2-kicker lv2-kicker-dark"> <Sparkles size={13} />BUILT FOR REAL CREATIVE WORK</span>
          <h2>Ideas move faster<br />when your tools<br /><em>live together.</em></h2>
          <p>Keep your creative workflow in one place. No more switching between disconnected tools, tabs and apps.</p>
          <div className="lv2-showcase-list">
            <span><CheckCircle size={14} /> Lightning fast</span>
            <span><CheckCircle size={14} /> Privacy focused</span>
            <span><CheckCircle size={14} /> High resolution</span>
            <span><CheckCircle size={14} /> Works everywhere</span>
          </div>
        </div>
        <div className="lv2-library">
          <div className="lv2-collection-heading">
            <h2>Recent creations</h2>
            <div className="lv2-collection-search"><span><Search size={11} /> Search images </span><span>View all</span></div>
          </div>
          <ul className="lv2-collection-list">
            {showcasePlaceholders.map((src, index) => (
              <li key={src} className="lv2-collection-card">
                <Image
                  src={src}
                  alt="Lumina AI creation"
                  width={500}
                  height={500}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lv2-section lv2-pricing" id="pricing">
        <div className="lv2-pricing-head">
          <div>
            <span className="lv2-kicker"><Sparkles size={13} /> SIMPLE, TRANSPARENT PRICING</span>
            <h2>Choose the plan<br />that fits you.</h2>
          </div>
          <div className="lv2-billing">
            <span className={billing === "monthly" ? "is-active" : ""}>Monthly</span>
            <button
              type="button"
              className="lv2-billing-toggle"
              data-billing={billing}
              aria-label="Toggle billing frequency"
              onClick={() => setBilling((value) => value === "monthly" ? "yearly" : "monthly")}
            >
              <span />
            </button>
            <span className={billing === "yearly" ? "is-active" : ""}>Yearly</span>
            <em>Save 20%</em>
          </div>
        </div>
        <div className="lv2-pricing-grid">
          {pricingPlans.map((plan) => {
            const discountedPrice = getDisplayedPrice(plan.monthly)
            const annualTotal = plan.monthly > 0 ? plan.monthly * 12 * 0.8 : 0

            return (
              <article key={plan.label} className={plan.featured ? "lv2-plan-featured" : ""}>
                {plan.featured ? <span className="lv2-popular">Most popular</span> : null}
                <span className="lv2-plan-label">{plan.label}</span>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                {billing === "yearly" && plan.monthly > 0 ? <span className="lv2-plan-price-original">{formatPrice(plan.monthly)}<small>/mo</small></span> : null}
                <strong>{formatPrice(discountedPrice)}<small>/mo</small></strong>
                {billing === "yearly" && plan.monthly > 0 ? <span className="lv2-plan-billing-note">Billed annually at {formatPrice(annualTotal)} / year</span> : null}
                <Link href="/sign-up" className="lv2-plan-button">{plan.cta}</Link>
                <ul>{plan.features.map((feature) => <li key={feature}><Check size={13} />{feature}</li>)}</ul>
              </article>
            )
          })}
        </div>
        <p className="lv2-pricing-note"><Zap size={13} /> Need more? Contact us for custom enterprise plans.</p>
      </section>

      <TestimonialCarousel />

      <section className="lv2-section lv2-faq" id="resources"><div className="lv2-faq-layout"><div><span className="lv2-kicker"><Sparkles size={13} />FAQ</span><h2>Questions,<br />answered.</h2><p>Everything you need to know about Lumina AI.</p></div><FAQ /></div></section>

      <section className="lv2-cta"><div className="lv2-orbits"><Sparkles size={15} /><Sparkles size={15} /><Sparkles size={15} /></div><span className="lv2-kicker lv2-kicker-dark"> <Sparkles size={13} />START CREATING TODAY</span><h2>Create less friction.<br /><em>Create more.</em></h2><p>Join creators already building faster with Lumina AI.</p><Link href={href} className="lv2-lime-button">{label} <ArrowRight size={14} /></Link></section>
    </main>

    <footer className="lv2-footer"><div className="lv2-footer-top"><div><Link href="/" className="lv2-brand lv2-footer-brand"><span><Image src="/lumina-icon.png" alt="" width={31} height={31} /></span><h3>Lumina AI</h3></Link><p>AI image creation & transformation studio<br />for creators who want more control.</p><div className="lv2-socials"><span>𝕏</span><span>in</span><span>◎</span><span>▶</span></div></div><div className="lv2-footer-col"><span>Product</span><a href="#product">Overview</a><a href="#tools">Features</a><a href="#pricing">Pricing</a><a href="#use-cases">Changelog</a></div><div className="lv2-footer-col"><span>Tools</span><a href="#tools">Generate Image</a><a href="#tools">Enhance</a><a href="#tools">Remove Background</a><a href="#tools">Object Remove</a><a href="#tools">Generative Fill</a><a href="#tools">Recolor</a></div><div className="lv2-footer-col"><span>Resources</span><a href="#resources">Blog</a><a href="#resources">Docs</a><a href="#resources">Tutorials</a><a href="#resources">Help Center</a></div><div className="lv2-footer-col"><span>Company</span><a href="#product">About</a><a href="#product">Careers</a><a href="#product">Contact</a><a href="#product">Privacy Policy</a><a href="#product">Terms of Service</a></div></div><div className="lv2-footer-bottom"><span>© 2026 Lumina AI. All rights reserved.</span><span>Made for visual work.</span></div></footer>
  </div>
}
