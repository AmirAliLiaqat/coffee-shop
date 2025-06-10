import { Header } from "@/components/dashboard/layout/Header";
import { SidebarNav } from "@/components/dashboard/layout/SidebarNav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AIAssistantButton } from "@/components/dashboard/layout/AIAssistantButton";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarNav />
      <div className="flex flex-col flex-1 min-h-screen">
        <Header />
        <SidebarInset>
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
      <AIAssistantButton />
    </SidebarProvider>
  );
}
