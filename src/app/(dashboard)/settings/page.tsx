import { ShopInfoForm } from "@/components/dashboard/settings/ShopInfoForm";
import { TaxAndChargesForm } from "@/components/dashboard/settings/TaxAndChargesForm";
import { ReceiptFormatForm } from "@/components/dashboard/settings/ReceiptFormatForm";
import { NotificationsForm } from "@/components/dashboard/settings/NotificationsForm";
import { UserRolesForm } from "@/components/dashboard/settings/UserRolesForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, CreditCard, Receipt, Bell, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <h1 className="text-3xl font-bold font-headline animate-slideDown">Settings</h1>

      <Tabs defaultValue="shopInfo" className="w-full animate-slideUp">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 h-auto animate-fadeIn">
          <TabsTrigger value="shopInfo" className="flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md animate-fadeIn delay-75">
            <Building className="h-4 w-4" /> Shop Info
          </TabsTrigger>
          <TabsTrigger value="tax" className="flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md animate-fadeIn delay-100">
            <CreditCard className="h-4 w-4" /> Tax &amp; Charges
          </TabsTrigger>
          <TabsTrigger value="receipt" className="flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md animate-fadeIn delay-150">
            <Receipt className="h-4 w-4" /> Receipt Format
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md animate-fadeIn delay-200">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md animate-fadeIn delay-250">
            <ShieldCheck className="h-4 w-4" /> User Roles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shopInfo" className="mt-6 animate-fadeIn delay-300">
          <ShopInfoForm />
        </TabsContent>

        <TabsContent value="tax" className="mt-6 animate-fadeIn delay-300">
          <TaxAndChargesForm />
        </TabsContent>

        <TabsContent value="receipt" className="mt-6 animate-fadeIn delay-300">
          <ReceiptFormatForm />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 animate-fadeIn delay-300">
          <NotificationsForm />
        </TabsContent>

        <TabsContent value="roles" className="mt-6 animate-fadeIn delay-300">
          <UserRolesForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
