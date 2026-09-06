"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NProgress() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const completeLoading = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 150);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const startLoading = () => {
      if (isLoading) return;
      setIsLoading(true);
      setProgress(0);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 80);
    };

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      startLoading();
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      startLoading();
    };

    window.addEventListener("popstate", startLoading);

    const observer = new MutationObserver(() => {
      if (!isLoading) return;
      completeLoading();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", startLoading);
      observer.disconnect();
    };
  }, [isLoading, completeLoading]);

  useEffect(() => {
    if (pathname) {
      completeLoading();
    }
  }, [pathname, completeLoading]);

  if (!isMounted || !isLoading) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[9999] pointer-events-none"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page loading"
    >
      <div
        className="h-full bg-accent transition-all duration-100 ease-out rounded-r-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function PageTransitionOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={cn(
        "fixed inset-0 bg-paper/80 backdrop-blur-sm z-[9998] flex items-center justify-center transition-opacity duration-200",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <svg className="w-full h-full text-accent" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
            <circle
              className="animate-spin"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="31.4 31.4"
              fill="none"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-muted">Loading...</p>
      </div>
    </div>
  );
}