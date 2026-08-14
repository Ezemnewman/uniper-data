"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant shadow-sm">
      <div className="container-page flex items-center justify-between h-16">
        <Link href="/#top" className="flex items-center gap-sm" onClick={() => setIsOpen(false)}>
          <BarChart3 className="text-primary" size={26} aria-hidden="true" />
          <span className="text-title-md font-bold text-primary tracking-tight">Uniper Data</span>
        </Link>

        <nav className="hidden md:flex gap-md" aria-label="Primary">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={
                i === 0
                  ? "text-primary border-b-2 border-primary pb-1 text-label-md"
                  : "text-secondary hover:text-primary-container transition-colors text-label-md"
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button asChild size="sm" className="hidden md:inline-flex">
          <a href="#pricing">Get Started</a>
        </Button>

        <button
          className="md:hidden p-2 text-on-surface"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <nav
          className="md:hidden bg-surface-container-lowest border-t border-outline-variant px-margin-mobile py-md flex flex-col gap-sm animate-fade-up"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-surface text-body-md py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button asChild className="mt-sm">
            <a href="#pricing" onClick={() => setIsOpen(false)}>
              Get Started
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}
