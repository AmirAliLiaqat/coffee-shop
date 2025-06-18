import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/auth";
import { useToast } from "@/components/ui/use-toast";

interface UserData {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  createdAt?: string;
}

export const ProfileTab = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser();
        setUserData(response);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch user data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gray-200" />
              <div className="h-8 w-32 bg-gray-200 rounded" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Failed to load profile information</p>
        </CardContent>
      </Card>
    );
  }

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
              <AvatarFallback>{userData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Change Photo</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <p className="text-gray-600">{userData.fullName}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-gray-600">{userData.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <p className="text-gray-600 capitalize">{userData.role || 'User'}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Member Since</label>
              <p className="text-gray-600">
                {userData.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
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