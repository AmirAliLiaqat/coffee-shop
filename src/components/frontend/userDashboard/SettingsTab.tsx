import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { updateSettings, updatePreferences } from "@/services/auth";

export const SettingsTab = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New passwords do not match",
      });
      return;
    }

    try {
      // Update profile settings
      const settingsData = await updateSettings({
        fullName: formData.fullName,
        email: formData.email,
        currentPassword: formData.currentPassword || undefined,
        newPassword: formData.newPassword || undefined,
      });

      // Update preferences
      await updatePreferences(preferences);

      // Update local storage and context
      if (settingsData.token) {
        localStorage.setItem("token", settingsData.token);
      }
      updateUser(settingsData.user);

      toast({
        title: "Success",
        description: "Settings updated successfully",
      });

      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.response?.data?.message || err.message || "Something went wrong",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">Profile Information</h3>
            <div className="space-y-2">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Change Password</h3>
            <div className="space-y-2">
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Current Password"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Preferences</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">Email Notifications</label>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={preferences.emailNotifications}
                  onChange={handlePreferenceChange}
                  className="toggle"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">SMS Notifications</label>
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={preferences.smsNotifications}
                  onChange={handlePreferenceChange}
                  className="toggle"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Marketing Emails</label>
                <input
                  type="checkbox"
                  name="marketingEmails"
                  checked={preferences.marketingEmails}
                  onChange={handlePreferenceChange}
                  className="toggle"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
        </form>
      </CardContent>
    </Card>
  );
}; 