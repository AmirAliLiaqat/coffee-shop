'use client';

import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <nav className="bg-primary/90 backdrop-blur-sm py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="index.html" className="flex-shrink-0">
              <h1 className="text-4xl font-headline font-bold text-primary-foreground uppercase tracking-wider">COFFEE SHOP</h1>
            </a>

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
                <a href="index.html" className="text-primary-foreground hover:text-primary-foreground/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="about.html" className="text-primary-foreground hover:text-primary-foreground/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                <a href="service.html" className="text-primary-foreground hover:text-primary-foreground/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">Service</a>
                <a href="menu.html" className="text-primary-foreground hover:text-primary-foreground/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">Menu</a>

                {/* Dropdown */}
                <div className="relative group">
                  <button className="text-primary-foreground hover:text-primary-foreground/80 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
                    Pages
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-background ring-1 ring-border hidden group-hover:block animate-scaleIn">
                    <div className="py-1">
                      <a href="reservation.html" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">Reservation</a>
                      <a href="testimonial.html" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">Testimonial</a>
                    </div>
                  </div>
                </div>

                <a href="contact.html" className="text-primary-foreground hover:text-primary-foreground/80 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`${isOpen ? 'block' : 'hidden'} md:hidden animate-slideDown`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="index.html" className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-2 rounded-md text-base font-medium transition-colors">Home</a>
              <a href="about.html" className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-2 rounded-md text-base font-medium transition-colors">About</a>
              <a href="service.html" className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-2 rounded-md text-base font-medium transition-colors">Service</a>
              <a href="menu.html" className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-2 rounded-md text-base font-medium transition-colors">Menu</a>
              <a href="reservation.html" className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-2 rounded-md text-base font-medium transition-colors">Reservation</a>
              <a href="testimonial.html" className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-2 rounded-md text-base font-medium transition-colors">Testimonial</a>
              <a href="contact.html" className="text-primary-foreground hover:text-primary-foreground/80 block px-3 py-2 rounded-md text-base font-medium transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
