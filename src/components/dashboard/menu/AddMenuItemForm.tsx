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
import { CreateProductData } from "@/services/product";
import { PRODUCT_CATEGORIES_ARRAY } from "@/utils/constants";

const menuItemSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required."),
  price: z.coerce.number().min(0.01, "Price must be positive."),
  image: z.instanceof(File).optional(),
  available: z.boolean().default(true),
  preparationTime: z.coerce.number().min(1, "Preparation time must be at least 1 minute.").optional(),
  calories: z.coerce.number().min(0, "Calories must be positive.").optional(),
  ingredients: z.string().optional(),
});

type MenuItemFormValues = z.infer<typeof menuItemSchema>;

interface AddMenuItemFormProps {
  onSubmit: (values: CreateProductData) => void;
  defaultValues?: Partial<CreateProductData>;
  onClose?: () => void;
}

export function AddMenuItemForm({ onSubmit, defaultValues, onClose }: AddMenuItemFormProps) {
  // Check if we're editing an existing item (has _id) or adding a new one
  const isEditing = defaultValues && '_id' in defaultValues;

  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      available: true,
      ...defaultValues,
    },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        form.setValue('image', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (values: MenuItemFormValues) => {
    const productData: CreateProductData = {
      name: values.name,
      category: values.category,
      price: values.price,
      description: values.description,
      image: values.image,
      available: values.available,
      preparationTime: values.preparationTime,
      calories: values.calories,
      ingredients: values.ingredients,
    };
    onSubmit(productData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="image"
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
                      className="rounded-md object-cover h-24 w-24"
                      data-ai-hint="food coffee"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                      <UploadCloud size={32} />
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

        <div className="grid grid-cols-2 gap-3">
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
                    {PRODUCT_CATEGORIES_ARRAY.map((category) => (
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
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="preparationTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prep Time (min)</FormLabel>
                <FormControl>
                  <Input type="number" min="1" placeholder="e.g. 5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calories</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="e.g. 250" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List the main ingredients, separated by commas..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Available</FormLabel>
                <FormDescription className="text-sm">
                  Is this item currently available for purchase?
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <DialogFooter>
          {onClose && <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>}
          <Button type="submit">{isEditing ? "Update Item" : "Add Item"}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
