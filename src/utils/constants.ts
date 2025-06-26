import {
  LayoutDashboard,
  ShoppingCart,
  Coffee,
  Warehouse,
  Users,
  UserCircle,
  Settings,
  BarChart3,
  Tag,
  Calendar,
  MessageSquare,
  Truck,
  Bot,
  FileText,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: any;
  roles: string[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin"],
  },
  {
    label: "Staff Management",
    href: "/staff",
    icon: Users,
    roles: ["admin"],
  },
  {
    label: "Menu Management",
    href: "/menu",
    icon: Coffee,
    roles: ["admin", "staff"],
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    roles: ["admin"],
  },
  {
    label: "Reports",
    href: "/reports",
    icon: FileText,
    roles: ["admin"],
  },
  {
    label: "Orders",
    href: "/orders",
    icon: ShoppingCart,
    roles: ["admin", "staff"],
  },
  {
    label: "Promotions",
    href: "/promotions",
    icon: Tag,
    roles: ["admin", "staff"],
  },
  {
    label: "Feedback",
    href: "/feedback",
    icon: MessageSquare,
    roles: ["admin", "staff"],
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: Warehouse,
    roles: ["admin", "staff"],
  },
  {
    label: "Customers",
    href: "/customers",
    icon: UserCircle,
    roles: ["admin", "staff"],
  },
  {
    label: "Reservations",
    href: "/reservations",
    icon: Calendar,
    roles: ["admin", "staff"],
  },
  {
    label: "Suppliers",
    href: "/suppliers",
    icon: Truck,
    roles: ["admin"],
  },
  {
    label: "AI Assistant",
    href: "/ai-assistant",
    icon: Bot,
    roles: ["admin"],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["admin", "staff"],
  },
];
