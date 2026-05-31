"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function useGSAP(
  callback: () => void | (() => void),
  deps: unknown[] = []
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback();
    });
    ctxRef.current = ctx;

    return () => {
      ctx.revert();
    };
  }, deps);
}
