import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShoppingBag, Heart, MapPin, CreditCard, Package, Settings } from "lucide-react";

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardTabs = ({ activeTab, setActiveTab }: DashboardTabsProps) => {
  const tabs = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "orders", icon: ShoppingBag, label: "Orders" },
    { id: "wishlist", icon: Heart, label: "Wishlist" },
    { id: "addresses", icon: MapPin, label: "Addresses" },
    { id: "payments", icon: CreditCard, label: "Payments" },
    { id: "tracking", icon: Package, label: "Tracking" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <TabsList className="flex flex-wrap gap-1 sm:gap-2 p-1 sm:p-0.5 w-full overflow-x-auto">
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.id}
          value={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className="flex items-center justify-center px-2 py-2 text-sm
            min-w-[60px] xs:min-w-[80px] sm:min-w-[120px] md:min-w-[140px]
            flex-1 xs:flex-initial
            whitespace-nowrap"
        >
          <tab.icon className="w-4 h-4 mr-1 lg:mr-2" />
          <span className="hidden lg:inline text-sm">{tab.label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}; 