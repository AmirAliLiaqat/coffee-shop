import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProfileTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Change Photo</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <p className="text-gray-600">John Doe</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-gray-600">john@example.com</p>
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <label className="text-sm font-medium">Member Since</label>
              <p className="text-gray-600">January 2024</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Bio</label>
            <p className="text-gray-600 mt-1">Coffee enthusiast and regular customer.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 