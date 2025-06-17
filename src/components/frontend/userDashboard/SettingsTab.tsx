import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">Change Password</h3>
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
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
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">SMS Notifications</label>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Marketing Emails</label>
                <input type="checkbox" className="toggle" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 