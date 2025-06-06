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
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/menu", label: "Menu Management", icon: Coffee },
  { href: "/dashboard/inventory", label: "Inventory", icon: Warehouse },
  { href: "/dashboard/staff", label: "Staff Management", icon: Users },
  { href: "/dashboard/customers", label: "Customers", icon: UserCircle },
  { href: "/dashboard/reservations", label: "Reservations", icon: Calendar },
  { href: "/dashboard/promotions", label: "Promotions", icon: Tag },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/reports", label: "Sales Reports", icon: LineChart },
  { href: "/dashboard/suppliers", label: "Suppliers", icon: Truck },
  {
    href: "/dashboard/feedback",
    label: "Customer Feedback",
    icon: MessageSquare,
  },
  { href: "/dashboard/ai-assistant", label: "AI Assistant", icon: Bot },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
  { href: "/dashboard/logout", label: "Logout", icon: LogOut },
];
