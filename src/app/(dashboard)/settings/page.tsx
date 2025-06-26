import { ShopInfoForm } from "@/components/dashboard/settings/ShopInfoForm";
import { TaxAndChargesForm } from "@/components/dashboard/settings/TaxAndChargesForm";
import { ReceiptFormatForm } from "@/components/dashboard/settings/ReceiptFormatForm";
import { NotificationsForm } from "@/components/dashboard/settings/NotificationsForm";
import { UserRolesForm } from "@/components/dashboard/settings/UserRolesForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, CreditCard, Receipt, Bell, ShieldCheck, User } from "lucide-react";
import { AdminProfileForm } from "@/components/dashboard/settings/AdminProfileForm";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <h1 className="text-3xl font-bold font-headline animate-slideDown">Settings</h1>

      <Tabs defaultValue="profile" className="w-full animate-slideUp">
        <TabsList className="min-w-0 flex flex-row flex-nowrap overflow-x-auto whitespace-nowrap w-full gap-2 h-auto animate-fadeIn sm:grid sm:grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="profile" className="w-10 justify-center px-0 sm:w-auto sm:px-4 flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md animate-fadeIn delay-50">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="shopInfo" className="w-10 justify-center px-0 sm:w-auto sm:px-4 flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md animate-fadeIn delay-75">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Shop Info</span>
          </TabsTrigger>
          <TabsTrigger value="tax" className="w-10 justify-center px-0 sm:w-auto sm:px-4 flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md animate-fadeIn delay-100">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Tax &amp; Charges</span>
          </TabsTrigger>
          <TabsTrigger value="receipt" className="w-10 justify-center px-0 sm:w-auto sm:px-4 flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md animate-fadeIn delay-150">
            <Receipt className="h-4 w-4" />
            <span className="hidden sm:inline">Receipt Format</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="w-10 justify-center px-0 sm:w-auto sm:px-4 flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md animate-fadeIn delay-200">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="w-10 justify-center px-0 sm:w-auto sm:px-4 flex flex-col sm:flex-row items-center gap-2 py-2 data-[state=active]:shadow-md animate-fadeIn delay-250">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">User Roles</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 animate-fadeIn delay-300">
          <AdminProfileForm />
        </TabsContent>

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
