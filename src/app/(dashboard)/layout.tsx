'use client';

import { Header } from "@/components/dashboard/layout/Header";
import { SidebarNav } from "@/components/dashboard/layout/SidebarNav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AIAssistantButton } from "@/components/dashboard/layout/AIAssistantButton";
import { RoleBasedRoute } from "@/components/RoleBasedRoute";
import { useAuth } from "@/context/AuthContext";

// Define restricted paths for staff
const STAFF_RESTRICTED_PATHS = [
  '/dashboard',
  '/staff',
  '/analytics',
  '/reports',
  '/sales'
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <RoleBasedRoute allowedRoles={['admin', 'staff']} restrictedPaths={STAFF_RESTRICTED_PATHS}>
      <SidebarProvider defaultOpen={true}>
        <SidebarNav />
        <div className="flex flex-col flex-1 min-h-screen overflow-x-hidden">
          <Header />
          <SidebarInset>
            <div className="h-full w-full">
              <main className="h-full w-full p-4 md:p-6 lg:p-8">
                {children}
              </main>
            </div>
          </SidebarInset>
        </div>
        {user?.role === 'admin' && <AIAssistantButton />}
      </SidebarProvider>
    </RoleBasedRoute>
  );
}
