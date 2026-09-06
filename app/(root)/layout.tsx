"use client";

import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { SignedIn } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { NProgress } from "@/components/ui/route-preloader";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <>
      <NProgress />
      <ErrorBoundary>
        {isLanding ? (
          <main className="landing-root">{children}<Toaster /></main>
        ) : (
          <main className="root">
            <SignedIn>
              <Sidebar />
              <MobileNav />
            </SignedIn>
            <div className="root-container">
              <div className="wrapper">{children}</div>
            </div>
            <Toaster />
          </main>
        )}
      </ErrorBoundary>
    </>
  );
};

export default Layout;