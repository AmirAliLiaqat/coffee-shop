'use client';

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Heart, User, LogOut, Menu, X } from 'lucide-react'
import { Logo } from '@/components/icons/Logo';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/service', label: 'Service' },
  { href: '/reservation', label: 'Reservation' },
  { href: '/shop', label: 'Shop' },
  { href: '/contact', label: 'Contact' },
]

const actionLinks = [
  { href: '/wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/cart', icon: ShoppingCart, label: 'Cart' },
  { href: '/signup', icon: User, label: 'Sign Up' },
  { href: '/userDashboard', icon: LogOut, label: 'Dashboard' },
]

const NavLink = ({ href, children, onClick, className = '' }: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`text-primary-foreground hover:text-primary-foreground/80 px-3 py-2 rounded-md text-sm font-medium transition-colors ${className}`}
  >
    {children}
  </Link>
)

const MobileMenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
  >
    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
  </button>
)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <div className="w-full">
      <nav className="bg-primary/90 backdrop-blur-sm py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex-shrink-0 flex items-center justify-center gap-2">
              <Logo className="h-auto w-48" variant="navbar" size="lg" />
            </Link>

            <MobileMenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navigationLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}

                <div className="flex items-center space-x-4 ml-4 border-l border-primary-foreground/20">
                  {actionLinks.map(({ href, icon: Icon, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110"
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`${isOpen ? 'block' : 'hidden'} md:hidden animate-slideDown`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block"
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="flex items-center space-x-4 px-3 py-2">
                {actionLinks.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={handleLinkClick}
                    className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
