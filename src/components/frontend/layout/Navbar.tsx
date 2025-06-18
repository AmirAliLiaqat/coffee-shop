'use client';

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Heart, User, LogOut, Menu, X } from 'lucide-react'
import { Logo } from '@/components/icons/Logo';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/service', label: 'Service' },
  { href: '/reservation', label: 'Reservation' },
  { href: '/shop', label: 'Shop' },
  { href: '/contact', label: 'Contact' },
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
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLinkClick = () => setIsOpen(false);

  const handleUserClick = () => {
    if (isAuthenticated) {
      router.push('/userDashboard');
    } else {
      router.push('/signin');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/home');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
                  <Link
                    href="/wishlist"
                    className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110"
                    aria-label="Wishlist"
                  >
                    <Heart className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/cart"
                    className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110"
                    aria-label="Cart"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={handleUserClick}
                    className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110"
                    aria-label={isAuthenticated ? "Dashboard" : "Sign In"}
                  >
                    <User className="h-5 w-5" />
                  </button>
                  {isAuthenticated && (
                    <button
                      onClick={handleLogout}
                      className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110"
                      aria-label="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  )}
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
                <Link
                  href="/wishlist"
                  onClick={handleLinkClick}
                  className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110"
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5" />
                </Link>
                <Link
                  href="/cart"
                  onClick={handleLinkClick}
                  className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => {
                    handleUserClick();
                    handleLinkClick();
                  }}
                  className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110"
                  aria-label={isAuthenticated ? "Dashboard" : "Sign In"}
                >
                  <User className="h-5 w-5" />
                </button>
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      handleLogout();
                      handleLinkClick();
                    }}
                    className="text-primary-foreground hover:text-primary-foreground/80 p-2 rounded-md transition-all hover:scale-110"
                    aria-label="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
