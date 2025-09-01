"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
import { Icon } from "@/components/ui/icon";
import { ringFocus } from "@/lib/theme/tokens";
import CartButton from "@/components/cart/CartButton";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-borderGold bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <H1 asChild className="text-2xl font-bold text-ink tracking-wide">
              <span>Happy Homes 2.0</span>
            </H1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/catalog"
              className={`text-sm font-medium text-ink transition-subtle hover:text-brand border-b-2 border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
            >
              Catalog
            </Link>
            <Link
              href="/collections"
              className={`text-sm font-medium text-ink transition-subtle hover:text-brand border-b-2 border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
            >
              Collections
            </Link>
            <Link
              href="/artisans"
              className={`text-sm font-medium text-ink transition-subtle hover:text-brand border-b-2 border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
            >
              Artisans
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium text-ink transition-subtle hover:text-brand border-b-2 border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium text-ink transition-subtle hover:text-brand border-b-2 border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className={`text-ink hover:text-brand ${ringFocus}`}>
              <Icon name="search" className="h-5 w-5" aria-hidden />
            </Button>
            <Button variant="ghost" size="icon" className={`text-ink hover:text-brand ${ringFocus}`}>
              <Icon name="user" className="h-5 w-5" aria-hidden />
            </Button>
            <CartButton />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden text-ink hover:text-brand ${ringFocus}`}
            onClick={toggleMenu}
          >
            <Icon 
              name={isMenuOpen ? "x" : "menu"} 
              className="h-6 w-6" 
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Link
                href="/catalog"
                className={`block px-3 py-2 text-base font-medium text-ink transition-subtle hover:text-brand border-l-2 border-transparent hover:border-[var(--kk-brand)] ${ringFocus}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Catalog
              </Link>
              <Link
                href="/collections"
                className={`block px-3 py-2 text-base font-medium text-ink transition-subtle hover:text-brand border-l-2 border-transparent hover:border-[var(--kk-brand)] ${ringFocus}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/artisans"
                className={`block px-3 py-2 text-base font-medium text-ink transition-subtle hover:text-brand border-l-2 border-transparent hover:border-[var(--kk-brand)] ${ringFocus}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Artisans
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 text-base font-medium text-ink transition-subtle hover:text-brand border-l-2 border-transparent hover:border-[var(--kk-brand)] ${ringFocus}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 text-base font-medium text-ink transition-subtle hover:text-brand border-l-2 border-transparent hover:border-[var(--kk-brand)] ${ringFocus}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
            <div className="border-t border-borderGold pt-4 pb-3">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className={`text-ink hover:text-brand ${ringFocus}`}>
                  <Icon name="search" className="h-5 w-5" aria-hidden />
                </Button>
                <Button variant="ghost" size="icon" className={`text-ink hover:text-brand ${ringFocus}`}>
                  <Icon name="user" className="h-5 w-5" aria-hidden />
                </Button>
                <CartButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
