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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const receiptFormatSchema = z.object({
  headerText: z.string().min(2, "Header text must be at least 2 characters."),
  footerText: z.string().optional(),
  showLogo: z.boolean(),
  showQRCode: z.boolean(),
  showTaxDetails: z.boolean(),
  paperSize: z.enum(["58mm", "80mm", "A4"]),
  fontSize: z.enum(["small", "medium", "large"]),
  includeOrderNumber: z.boolean(),
  includeServerName: z.boolean(),
});

type ReceiptFormatFormValues = z.infer<typeof receiptFormatSchema>;

// Mock current receipt format settings
const currentSettings: ReceiptFormatFormValues = {
  headerText: "BrewControl Cafe",
  footerText: "Thank you for your business!",
  showLogo: true,
  showQRCode: true,
  showTaxDetails: true,
  paperSize: "80mm",
  fontSize: "medium",
  includeOrderNumber: true,
  includeServerName: true,
};

export function ReceiptFormatForm() {
  const { toast } = useToast();
  const form = useForm<ReceiptFormatFormValues>({
    resolver: zodResolver(receiptFormatSchema),
    defaultValues: currentSettings,
  });

  function onSubmit(values: ReceiptFormatFormValues) {
    console.log("Receipt format updated:", values);
    toast({
      title: "Settings Updated",
      description: "Your receipt format settings have been successfully saved.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Receipt Format</CardTitle>
        <CardDescription>Customize the appearance and content of your receipts.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="headerText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Header Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Business Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This text will appear at the top of each receipt.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="footerText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Footer Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Thank you for your business!" {...field} />
                  </FormControl>
                  <FormDescription>
                    Optional text to appear at the bottom of each receipt.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="paperSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paper Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select paper size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="58mm">58mm (Thermal)</SelectItem>
                        <SelectItem value="80mm">80mm (Thermal)</SelectItem>
                        <SelectItem value="A4">A4</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fontSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Font Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="showLogo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Show Logo</FormLabel>
                      <FormDescription>
                        Display your business logo on receipts
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
                name="showQRCode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Show QR Code</FormLabel>
                      <FormDescription>
                        Include a QR code for digital receipts
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
                name="showTaxDetails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Show Tax Details</FormLabel>
                      <FormDescription>
                        Display tax breakdown on receipts
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
                name="includeOrderNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Include Order Number</FormLabel>
                      <FormDescription>
                        Display order number on receipts
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
                name="includeServerName"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Include Server Name</FormLabel>
                      <FormDescription>
                        Display server name on receipts
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