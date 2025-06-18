"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/utils/constants";
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
import { UserNav } from "./UserNav";
import { useAuth } from "@/context/AuthContext";
import { Store } from "lucide-react";

export function SidebarNav() {
  const pathname = usePathname();
  const { state, setOpenMobile, isMobile } = useSidebar();
  const { user } = useAuth();

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  // Filter navigation items based on user role
  const filteredNavItems = NAV_ITEMS.filter(item =>
    user?.role ? item.roles.includes(user.role) : false
  );

  const renderNavItem = (item: typeof NAV_ITEMS[0], index: number) => (
    <SidebarMenuItem key={`${item.label}-${index}`}>
      <Link href={item.href} passHref legacyBehavior>
        <SidebarMenuButton
          isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
          tooltip={item.label}
          aria-label={item.label}
          onClick={handleNavClick}
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
        <Link href="/dashboard" className="flex items-center gap-2" onClick={handleNavClick}>
          {state === "expanded" ? (
            <Logo className="h-auto w-32" variant="sidebar" size="md" />
          ) : (
            <Store />
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>{filteredNavItems.map(renderNavItem)}</SidebarMenu>
      </SidebarContent>
      <SidebarSeparator className='m-0 p-0' />
      <SidebarFooter className="p-2">
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
