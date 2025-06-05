"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, PlusCircle, LayoutGrid, List } from "lucide-react";
import { AddMenuItemForm } from "@/components/menu/AddMenuItemForm";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { SharedDialog } from "@/components/ui/shared-dialog"

interface MenuItem {
  id: string;
  imageUrl?: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
  description?: string;
  dataAiHint?: string;
}

const initialMenuItems: MenuItem[] = [
  { id: "1", imageUrl: "https://placehold.co/150x150.png", name: "Espresso", category: "Hot Drinks", price: 3.00, available: true, description: "Strong black coffee.", dataAiHint: "espresso coffee" },
  { id: "2", imageUrl: "https://placehold.co/150x150.png", name: "Croissant", category: "Pastries", price: 2.50, available: true, description: "Buttery and flaky.", dataAiHint: "croissant pastry" },
  { id: "3", imageUrl: "https://placehold.co/150x150.png", name: "Iced Latte", category: "Cold Drinks", price: 4.50, available: false, description: "Chilled latte with milk.", dataAiHint: "iced latte" },
  { id: "4", imageUrl: "https://placehold.co/150x150.png", name: "Chicken Sandwich", category: "Sandwiches", price: 7.00, available: true, description: "Grilled chicken with lettuce and tomato.", dataAiHint: "chicken sandwich" },
];

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const { toast } = useToast();

  const handleSubmit = (values: any) => {
    if (editingItem) {
      setMenuItems(menuItems.map(item => item.id === editingItem.id ? { ...item, ...values } : item));
      toast({ title: "Item Updated", description: `${values.name} has been updated.` });
    } else {
      const newItem = { id: String(Date.now()), ...values };
      setMenuItems([...menuItems, newItem]);
      toast({ title: "Item Added", description: `${values.name} has been added to the menu.` });
    }
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (itemId: string) => {
    // Add confirmation dialog here if needed
    setMenuItems(menuItems.filter(item => item.id !== itemId));
    toast({ title: "Item Deleted", description: "The menu item has been deleted.", variant: "destructive" });
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const toggleAvailability = (itemId: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === itemId ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Menu Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}>
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
            <span className="sr-only">Toggle View Mode</span>
          </Button>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </div>
      </div>

      <SharedDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingItem ? "Edit Menu Item" : "Add New Menu Item"}
        description={editingItem ? "Update the details of the menu item." : "Fill in the details to add a new item to the menu."}
        size="lg"
        onClose={() => setIsDialogOpen(false)}
      >
        <AddMenuItemForm
          onSubmit={handleSubmit}
          defaultValues={editingItem || {}}
          onClose={() => setIsDialogOpen(false)}
        />
      </SharedDialog>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={item.imageUrl || "https://placehold.co/300x200.png"}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="rounded-t-lg w-full object-cover aspect-[3/2]"
                  data-ai-hint={(item as any).dataAiHint || "food drink"}
                />
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <CardTitle className="text-lg font-headline mb-1">{item.name}</CardTitle>
                <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                <p className="text-xl font-semibold text-primary">${item.price.toFixed(2)}</p>
                {item.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>}
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 pt-4">
                <div className="flex items-center space-x-2 w-full justify-between">
                  <label htmlFor={`available-${item.id}`} className="text-sm font-medium">Available</label>
                  <Switch
                    id={`available-${item.id}`}
                    checked={item.available}
                    onCheckedChange={() => toggleAvailability(item.id)}
                    aria-label={`Toggle availability for ${item.name}`}
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="flex-1">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)} className="flex-1">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.imageUrl || "https://placehold.co/64x64.png"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover aspect-square"
                        data-ai-hint={(item as any).dataAiHint || "food drink"}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Switch
                        checked={item.available}
                        onCheckedChange={() => toggleAvailability(item.id)}
                        aria-label={`Toggle availability for ${item.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(item)} aria-label="Edit item">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)} aria-label="Delete item">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
