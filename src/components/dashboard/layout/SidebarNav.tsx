"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, FOOTER_NAV_ITEMS, type NavItem } from "@/lib/constants";
import { Logo } from "@/components/icons/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Store } from "lucide-react";
import { UserNav } from "./UserNav";

export function SidebarNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const renderNavItem = (item: NavItem, index: number) => (
    <SidebarMenuItem key={`${item.label}-${index}`}>
      <Link href={item.href} passHref legacyBehavior>
        <SidebarMenuButton
          isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
          tooltip={item.label}
          aria-label={item.label}
        >
          <item.icon />
          {state === "expanded" && <span>{item.label}</span>}
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 flex items-center justify-start group-data-[collapsible=icon]:justify-center">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Store className="h-7 w-7 text-sidebar-primary flex-shrink-0" />
          {state === "expanded" && <Logo className="h-auto w-32 text-sidebar-foreground" />}
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>{NAV_ITEMS.map(renderNavItem)}</SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-2 space-y-2">
        <UserNav />
        <SidebarSeparator />
        <SidebarMenu>{FOOTER_NAV_ITEMS.map(renderNavItem)}</SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
