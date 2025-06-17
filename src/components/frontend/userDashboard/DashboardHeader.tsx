import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { LogOut } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold">My Dashboard</h1>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          <Bell className="w-4 h-4 mr-2" />
          <span>Notifications</span>
          <Badge variant="secondary" className="ml-2">3</Badge>
        </Button>
        <Button variant="outline" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}; 