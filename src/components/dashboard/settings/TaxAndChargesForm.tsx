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
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const taxAndChargesSchema = z.object({
  taxRate: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0 && parseFloat(val) <= 100, {
    message: "Tax rate must be a number between 0 and 100",
  }),
  enableServiceCharge: z.boolean(),
  serviceChargeRate: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0 && parseFloat(val) <= 100, {
    message: "Service charge rate must be a number between 0 and 100",
  }),
  enableDeliveryFee: z.boolean(),
  deliveryFee: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
    message: "Delivery fee must be a positive number",
  }),
});

type TaxAndChargesFormValues = z.infer<typeof taxAndChargesSchema>;

// Mock current tax and charges settings
const currentSettings: TaxAndChargesFormValues = {
  taxRate: "8.5",
  enableServiceCharge: true,
  serviceChargeRate: "10",
  enableDeliveryFee: true,
  deliveryFee: "5.00",
};

export function TaxAndChargesForm() {
  const { toast } = useToast();
  const form = useForm<TaxAndChargesFormValues>({
    resolver: zodResolver(taxAndChargesSchema),
    defaultValues: currentSettings,
  });

  function onSubmit(values: TaxAndChargesFormValues) {
    console.log("Tax and charges updated:", values);
    toast({
      title: "Settings Updated",
      description: "Your tax and charges settings have been successfully saved.",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Tax & Charges Settings</CardTitle>
        <CardDescription>Configure sales tax and additional charges for your business.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="taxRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sales Tax Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" placeholder="8.5" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the percentage of sales tax applicable to your business.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="enableServiceCharge"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Service Charge</FormLabel>
                      <FormDescription>
                        Enable or disable service charge on orders
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

              {form.watch("enableServiceCharge") && (
                <FormField
                  control={form.control}
                  name="serviceChargeRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Charge Rate (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="enableDeliveryFee"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Delivery Fee</FormLabel>
                      <FormDescription>
                        Enable or disable delivery fee for orders
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

              {form.watch("enableDeliveryFee") && (
                <FormField
                  control={form.control}
                  name="deliveryFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Fee Amount ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="5.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 