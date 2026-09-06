"use client";

import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { Check, Sparkles, Coins, Zap } from "lucide-react";
import Header from "@/components/shared/Header";
import { plans } from "@/constants";
import Checkout from "@/components/shared/Checkout";
import { useState, Suspense } from "react";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

type User = {
  creditBalance?: number;
  _id?: string;
};

type Props = {
  user: User;
  userId: string;
};

function CreditsContent({ user, userId }: Props) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const formatPrice = (amount: number) => {
    if (amount === 0) return "$0";
    return amount % 1 === 0 ? `$${amount}` : `$${amount.toFixed(2)}`;
  };

  const getDisplayedPrice = (amount: number) =>
    billing === "yearly" && amount > 0 ? amount * 0.8 : amount;

  const getAnnualTotal = (monthly: number) =>
    monthly > 0 ? monthly * 12 * 0.8 : 0;

  const pricingData = plans.map((plan, index) => ({
    ...plan,
    label: index === 0 ? "FREE" : index === 1 ? "CREATOR" : "PRO",
    name: index === 0 ? "Explore" : index === 1 ? "Pro" : "Studio",
    description:
      index === 0
        ? "Perfect for trying out Lumina AI."
        : index === 1
        ? "More credits, more power, more possibilities."
        : "For teams and high volume creators.",
    monthly: index === 0 ? 0 : index === 1 ? 19 : 49,
    featured: index === 1,
    cta: index === 0 ? "Get started" : index === 1 ? "Start Pro" : "Start Studio",
    features:
      index === 0
        ? [
            "20 credits / month",
            "Basic AI tools",
            "Standard resolution",
            "Community support",
          ]
        : index === 1
        ? [
            "1,000 credits / month",
            "All AI tools",
            "High resolution exports",
            "Priority processing",
            "Email support",
          ]
        : [
            "5,000 credits / month",
            "All AI tools",
            "Highest resolution",
            "Team collaboration",
            "Priority support",
          ],
  }));

  return (
    <div className="credits-page animate-in">
      <Header
        title="Buy credits"
        subtitle="Add credits when you need more room to create."
      />
      <section className="credit-balance-card">
        <div>
          <span>Current balance</span>
          <strong>{user?.creditBalance ?? 0}</strong>
          <small>
            <Coins size={13} /> credits available
          </small>
        </div>
        <div className="credit-balance-mark">
          <Sparkles size={28} />
        </div>
      </section>

      <section className="lv2-section lv2-pricing" id="pricing">
        <div className="lv2-pricing-head">
          <div>
            <span className="lv2-kicker">
              <Sparkles size={13} /> SIMPLE, TRANSPARENT PRICING
            </span>
            <h2>Choose the plan<br />that fits you.</h2>
          </div>
          <div className="lv2-billing">
            <span className={billing === "monthly" ? "is-active" : ""}>
              Monthly
            </span>
            <button
              type="button"
              className="lv2-billing-toggle"
              data-billing={billing}
              aria-label="Toggle billing frequency"
              onClick={() => setBilling((value) => (value === "monthly" ? "yearly" : "monthly"))}
            >
              <span />
            </button>
            <span className={billing === "yearly" ? "is-active" : ""}>
              Yearly
            </span>
            <em>Save 20%</em>
          </div>
        </div>

        <div className="lv2-pricing-grid">
          {pricingData.map((plan) => {
            const discountedPrice = getDisplayedPrice(plan.monthly);
            const annualTotal = getAnnualTotal(plan.monthly);
            const isFree = plan.monthly === 0;

            return (
              <article key={plan._id} className={plan.featured ? "lv2-plan-featured" : ""}>
                {plan.featured && <span className="lv2-popular">Most popular</span>}
                <span className="lv2-plan-label">{plan.label}</span>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>

                {billing === "yearly" && plan.monthly > 0 ? (
                  <span className="lv2-plan-price-original">
                    {formatPrice(plan.monthly)}<small>/mo</small>
                  </span>
                ) : null}

                <strong>
                  {formatPrice(discountedPrice)}
                  <small>{isFree ? "" : "/mo"}</small>
                </strong>

                {billing === "yearly" && plan.monthly > 0 ? (
                  <span className="lv2-plan-billing-note">
                    Billed annually at {formatPrice(annualTotal)} / year
                  </span>
                ) : null}

                {isFree ? (
                  <button className="credits-btn lv2-plan-button" disabled>
                    Included with your account
                  </button>
                ) : (
                  <SignedIn>
                    <Checkout
                      plan={plan.name}
                      amount={billing === "yearly" ? annualTotal : plan.monthly}
                      credits={plan.credits}
                      buyerId={userId}
                    />
                  </SignedIn>
                )}

                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={13} />{feature}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p className="lv2-pricing-note">
          <Zap size={13} /> Need more? Contact us for custom enterprise plans.
        </p>
      </section>
    </div>
  );
}

function CreditsSkeleton() {
  return (
    <div className="credits-page animate-in">
      <Header title="Loading..." subtitle="Preparing pricing plans" />
      <section className="credit-balance-card">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full" />
      </section>

      <section className="lv2-section lv2-pricing" id="pricing">
        <div className="lv2-pricing-head">
          <div className="space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-1/2" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>

        <div className="lv2-pricing-grid grid grid-cols-1 md:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>
    </div>
  );
}

export default function CreditsClient({ user, userId }: Props) {
  return (
    <Suspense fallback={<CreditsSkeleton />}>
      <CreditsContent user={user} userId={userId} />
    </Suspense>
  );
}