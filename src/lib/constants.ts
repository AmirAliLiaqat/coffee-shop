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
  BarChart3,
  Tag,
  Calendar,
  MessageSquare,
  Truck,
  Bot,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  group?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/menu", label: "Menu Management", icon: Coffee },
  { href: "/inventory", label: "Inventory", icon: Warehouse },
  { href: "/staff", label: "Staff Management", icon: Users },
  { href: "/customers", label: "Customers", icon: UserCircle },
  { href: "/reservations", label: "Reservations", icon: Calendar },
  { href: "/promotions", label: "Promotions", icon: Tag },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/reports", label: "Sales Reports", icon: LineChart },
  { href: "/suppliers", label: "Suppliers", icon: Truck },
  {
    href: "/feedback",
    label: "Customer Feedback",
    icon: MessageSquare,
  },
  { href: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
  { href: "/logout", label: "Logout", icon: LogOut },
];
