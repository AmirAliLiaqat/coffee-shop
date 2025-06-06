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
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { UploadCloud } from "lucide-react";

const menuItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required."),
  price: z.coerce.number().min(0.01, "Price must be positive."),
  imageUrl: z.string().url("Invalid URL").optional(),
  available: z.boolean().default(true),
});

type MenuItemFormValues = z.infer<typeof menuItemSchema>;

interface AddMenuItemFormProps {
  onSubmit: (values: MenuItemFormValues) => void;
  defaultValues?: Partial<MenuItemFormValues>;
  onClose?: () => void;
}

const categories = ["Hot Drinks", "Cold Drinks", "Pastries", "Sandwiches", "Snacks"];

export function AddMenuItemForm({ onSubmit, defaultValues, onClose }: AddMenuItemFormProps) {
  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      available: true,
      ...defaultValues,
    },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultValues?.imageUrl || null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        // In a real app, you'd upload the file and set form.setValue('imageUrl', uploadedUrl)
        form.setValue('imageUrl', reader.result as string); // For demo purposes
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center gap-2">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Menu item preview"
                      width={128}
                      height={128}
                      className="rounded-md object-cover h-32 w-32"
                      data-ai-hint="food coffee"
                    />
                  ) : (
                     <div className="w-32 h-32 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                        <UploadCloud size={48} />
                     </div>
                  )}
                  <Input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Classic Latte" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A short description of the item..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Available</FormLabel>
                <FormDescription>
                  Is this item currently available for purchase?
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <DialogFooter>
          {onClose && <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>}
          <Button type="submit">Save Item</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
