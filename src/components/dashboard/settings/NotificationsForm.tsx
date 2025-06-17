"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const notificationsSchema = z.object({
  lowInventoryAlerts: z.boolean(),
  lowInventoryThreshold: z.enum(["5", "10", "15", "20"]),
  newOrderNotifications: z.boolean(),
  orderNotificationMethod: z.enum(["email", "sms", "both"]),
  dailySalesReport: z.boolean(),
  reportTime: z.enum(["6pm", "8pm", "10pm", "midnight"]),
  weeklyInventoryReport: z.boolean(),
  inventoryReportDay: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday"]),
  systemAlerts: z.boolean(),
  maintenanceAlerts: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsSchema>;

// Mock current notification settings
const currentSettings: NotificationsFormValues = {
  lowInventoryAlerts: true,
  lowInventoryThreshold: "10",
  newOrderNotifications: true,
  orderNotificationMethod: "both",
  dailySalesReport: true,
  reportTime: "8pm",
  weeklyInventoryReport: true,
  inventoryReportDay: "monday",
  systemAlerts: true,
  maintenanceAlerts: true,
};

export function NotificationsForm() {
  const { toast } = useToast();
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: currentSettings,
  });

  function onSubmit(values: NotificationsFormValues) {
    console.log("Notification settings updated:", values);
    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been successfully saved.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Notification Settings</CardTitle>
        <CardDescription>Manage your notification preferences for various system events.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="lowInventoryAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Low Inventory Alerts</FormLabel>
                      <FormDescription>
                        Receive notifications when inventory items are running low
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("lowInventoryAlerts") && (
                <FormField
                  control={form.control}
                  name="lowInventoryThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Low Inventory Threshold</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select threshold" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="5">5 items</SelectItem>
                          <SelectItem value="10">10 items</SelectItem>
                          <SelectItem value="15">15 items</SelectItem>
                          <SelectItem value="20">20 items</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="newOrderNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">New Order Notifications</FormLabel>
                      <FormDescription>
                        Get notified when new orders are placed
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("newOrderNotifications") && (
                <FormField
                  control={form.control}
                  name="orderNotificationMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notification Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select notification method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="dailySalesReport"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Daily Sales Report</FormLabel>
                      <FormDescription>
                        Receive daily sales summary reports
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("dailySalesReport") && (
                <FormField
                  control={form.control}
                  name="reportTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="6pm">6:00 PM</SelectItem>
                          <SelectItem value="8pm">8:00 PM</SelectItem>
                          <SelectItem value="10pm">10:00 PM</SelectItem>
                          <SelectItem value="midnight">12:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="weeklyInventoryReport"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Weekly Inventory Report</FormLabel>
                      <FormDescription>
                        Receive weekly inventory status reports
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("weeklyInventoryReport") && (
                <FormField
                  control={form.control}
                  name="inventoryReportDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Day</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="systemAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">System Alerts</FormLabel>
                      <FormDescription>
                        Receive notifications for system-related events
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maintenanceAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Maintenance Alerts</FormLabel>
                      <FormDescription>
                        Receive notifications for equipment maintenance
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 