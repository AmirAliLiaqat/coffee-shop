"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { DashboardHeader, DashboardTabs, ProfileTab, OrdersTab, WishlistTab, AddressesTab, PaymentsTab, TrackingTab, SettingsTab } from "@/components/frontend/userDashboard";

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <DashboardHeader />

      <Tabs defaultValue="profile" className="space-y-4">
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <TabsContent value="profile" className="space-y-4">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <OrdersTab />
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-4">
          <WishlistTab />
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4">
          <AddressesTab />
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <PaymentsTab />
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <TrackingTab />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
} 