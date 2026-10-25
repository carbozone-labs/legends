"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { joinHref, nav } from "@/data/club";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

// "Join Us" lives in the nav list for the mobile menu; on desktop the CTA button covers it.
const desktopNav = nav.filter((n) => n.id !== "join");

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathname = usePathname();

  // On the homepage, track which section is in view (only ids that exist there)
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = nav.filter((n) => n.href.startsWith("/#")).map((n) => n.id).concat("home");
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Close the menu when the route changes
  useEffect(() => setOpen(false), [pathname]);

  const routeItem = nav.find((n) => n.href !== "/" && !n.href.startsWith("/#") && pathname.startsWith(n.href));
  const activeId = routeItem?.id ?? (pathname === "/" ? active : "");

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  }, []);

  // Scroll lock + Escape + focus handling while the menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const behind = ["main", "footer", "a[href='#main']"].map((q) => document.querySelector<HTMLElement>(q)).filter(Boolean) as HTMLElement[];
    behind.forEach((el) => el.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => document.querySelector<HTMLElement>("#mobile-menu a")?.focus(), 350);
    return () => {
      document.body.style.overflow = prev;
      behind.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, close]);


  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-base",
          scrolled || open ? "border-b border-gold/20 bg-obsidian/90 backdrop-blur-md" : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-content items-center justify-between gutter">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo/legends-logo-sm.webp" alt="" width={48} height={48} className="size-11 sm:size-12" priority />
            <span className="font-display text-xl uppercase leading-none tracking-wider">
              Legends
              <span className="mt-1 block font-sans text-[0.62rem] font-medium normal-case tracking-[0.12em] text-ivory/60">
                Rotaract Club of Pune City
              </span>
              <span className="sr-only"> (home)</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-6">
              {desktopNav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={activeId === item.id ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-sm font-medium transition-colors duration-base",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-saffron after:transition-transform after:duration-base after:ease-cinematic",
                      activeId === item.id ? "text-saffron after:scale-x-100" : "text-ivory/75 after:scale-x-0 hover:text-ivory hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={joinHref}
              className="hidden min-h-11 items-center bg-saffron px-5 text-sm font-semibold text-obsidian transition-colors duration-base hover:bg-ivory xl:inline-flex"
            >
              Join the Movement
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 items-center justify-center text-ivory xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => (open ? close() : setOpen(true))}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "m"}
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <X aria-hidden /> : <Menu aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} active={activeId} onClose={close} />
    </>
  );
}
