'use client';

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Heart, User } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <nav className="bg-primary/90 backdrop-blur-sm py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-4xl font-headline font-bold text-primary-foreground uppercase tracking-wider">COFFEE SHOP</h1>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link href="/" className="text-primary-foreground hover:text-primary-foreground/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                <Link href="/about" className="text-primary-foreground hover:text-primary-foreground/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
                <Link href="/service" className="text-primary-foreground hover:text-primary-foreground/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">Service</Link>
                <Link href="/reservation" className="text-primary-foreground hover:text-primary-foreground/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">Reservation</Link>
                <Link href="/shop" className="text-primary-foreground hover:text-primary-foreground/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">Shop</Link>
                <Link href="/contact" className="text-primary-foreground hover:text-primary-foreground/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>
                <div className="flex items-center space-x-4 ml-4">
                  <Link href="/wishlist" className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110">
                    <Heart className="h-5 w-5" />
                  </Link>
                  <Link href="/cart" className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                  <Link href="/signup" className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110">
                    <User className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`${isOpen ? 'block' : 'hidden'} md:hidden animate-slideDown`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-2 rounded-md text-base font-medium transition-colors">Home</Link>
              <Link href="/about" className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-2 rounded-md text-base font-medium transition-colors">About</Link>
              <Link href="/service" className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-2 rounded-md text-base font-medium transition-colors">Service</Link>
              <Link href="/reservation" className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-2 rounded-md text-base font-medium transition-colors">Reservation</Link>
              <Link href="/shop" className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-2 rounded-md text-base font-medium transition-colors">Shop</Link>
              <Link href="/contact" className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-2 rounded-md text-base font-medium transition-colors">Contact</Link>
              <div className="flex items-center space-x-4 px-3 py-2">
                <Link href="/wishlist" className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110">
                  <Heart className="h-5 w-5" />
                </Link>
                <Link href="/cart" className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
                <Link href="/signup" className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110">
                  <User className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
