import { ShopInfoForm } from "@/components/settings/ShopInfoForm";
import { TaxAndChargesForm } from "@/components/settings/TaxAndChargesForm";
import { ReceiptFormatForm } from "@/components/settings/ReceiptFormatForm";
import { NotificationsForm } from "@/components/settings/NotificationsForm";
import { UserRolesForm } from "@/components/settings/UserRolesForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, CreditCard, Receipt, Bell, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-headline">Settings</h1>

      <Tabs defaultValue="shopInfo" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 h-auto">
          <TabsTrigger value="shopInfo" className="flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md">
            <Building className="h-4 w-4" /> Shop Info
          </TabsTrigger>
          <TabsTrigger value="tax" className="flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md">
            <CreditCard className="h-4 w-4" /> Tax &amp; Charges
          </TabsTrigger>
          <TabsTrigger value="receipt" className="flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md">
            <Receipt className="h-4 w-4" /> Receipt Format
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md">
            <ShieldCheck className="h-4 w-4" /> User Roles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shopInfo" className="mt-6">
          <ShopInfoForm />
        </TabsContent>

        <TabsContent value="tax" className="mt-6">
          <TaxAndChargesForm />
        </TabsContent>

        <TabsContent value="receipt" className="mt-6">
          <ReceiptFormatForm />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <NotificationsForm />
        </TabsContent>

        <TabsContent value="roles" className="mt-6">
          <UserRolesForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
