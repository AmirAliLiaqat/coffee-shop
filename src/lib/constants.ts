import {
  LayoutDashboard,
  ShoppingCart,
  Coffee,
  Warehouse,
  Users,
  UserCircle,
  LineChart,
  Settings,
  LogOut,
  type LucideIcon,
} from 'lucide-react';

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  group?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/menu', label: 'Menu Management', icon: Coffee },
  { href: '/inventory', label: 'Inventory', icon: Warehouse },
  { href: '/staff', label: 'Staff Management', icon: Users },
  { href: '/customers', label: 'Customers', icon: UserCircle },
  { href: '/reports', label: 'Sales Reports', icon: LineChart },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
    { href: '/logout', label: 'Logout', icon: LogOut }, // Placeholder for logout functionality
];
