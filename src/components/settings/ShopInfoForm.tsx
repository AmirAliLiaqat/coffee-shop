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

const shopInfoSchema = z.object({
  shopName: z.string().min(2, "Shop name must be at least 2 characters."),
  address: z.string().min(5, "Address seems too short.").optional(),
  phone: z.string().min(10, "Phone number seems too short.").optional(),
  email: z.string().email("Invalid email address.").optional(),
  operatingHours: z.string().min(5, "Operating hours seem too short.").optional(),
});

type ShopInfoFormValues = z.infer<typeof shopInfoSchema>;

// Mock current shop info
const currentShopInfo: ShopInfoFormValues = {
  shopName: "BrewControl Cafe",
  address: "123 Coffee Lane, Flavor Town, CA 90210",
  phone: "(555) 987-6543",
  email: "hello@brewcontrol.com",
  operatingHours: "Mon-Fri: 7 AM - 7 PM, Sat-Sun: 8 AM - 6 PM",
};

export function ShopInfoForm() {
  const { toast } = useToast();
  const form = useForm<ShopInfoFormValues>({
    resolver: zodResolver(shopInfoSchema),
    defaultValues: currentShopInfo,
  });

  function onSubmit(values: ShopInfoFormValues) {
    console.log("Shop info updated:", values);
    toast({
      title: "Shop Info Updated",
      description: "Your shop information has been successfully saved.",
    });
    // Here you would typically send data to your backend
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Shop Information</CardTitle>
        <CardDescription>Manage your coffee shop's basic details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Coffee Shop Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, City, State ZIP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@yourshop.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="operatingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operating Hours</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g. Mon-Fri: 8 AM - 6 PM, Sat: 9 AM - 5 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
