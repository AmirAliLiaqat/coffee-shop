"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, PlusCircle, LayoutGrid, List } from "lucide-react";
import { AddMenuItemForm } from "@/components/dashboard/menu/AddMenuItemForm";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { SharedDialog } from "@/components/ui/shared-dialog";
import { productService, Product } from "@/services/product";

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingItem) {
        const updatedProduct = await productService.updateProduct(editingItem._id, values);
        setProducts(products.map(item => item._id === editingItem._id ? updatedProduct : item));
        toast({ title: "Item Updated", description: `${values.name} has been updated.` });
      } else {
        const newProduct = await productService.createProduct(values);
        setProducts([...products, newProduct]);
        toast({ title: "Item Added", description: `${values.name} has been added to the menu.` });
      }
      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the item",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (itemId: string) => {
    try {
      await productService.deleteProduct(itemId);
      setProducts(products.filter(item => item._id !== itemId));
      toast({ title: "Item Deleted", description: "The menu item has been deleted.", variant: "destructive" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the item",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: Product) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const toggleAvailability = async (itemId: string) => {
    try {
      const updatedProduct = await productService.toggleAvailability(itemId);
      setProducts(products.map(item => item._id === itemId ? updatedProduct : item));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle availability",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline animate-slideDown">Menu Management</h1>
        <div className="flex gap-2 animate-fadeIn delay-100">
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")} className="hover:scale-110 transition-transform duration-200">
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
            <span className="sr-only">Toggle View Mode</span>
          </Button>
          <Button onClick={handleAddNew} className="hover:scale-105 transition-transform duration-200">
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
        className="animate-scaleIn"
      >
        <AddMenuItemForm
          onSubmit={handleSubmit}
          defaultValues={editingItem || {}}
          onClose={() => setIsDialogOpen(false)}
        />
      </SharedDialog>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <Card key={item._id} className="flex flex-col animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="p-0">
                <Image
                  src={item.imageUrl || "https://placehold.co/300x200.png"}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="rounded-t-lg w-full object-cover aspect-[3/2] hover:scale-105 transition-transform duration-300"
                  data-ai-hint={item.dataAiHint || "food drink"}
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
                  <label htmlFor={`available-${item._id}`} className="text-sm font-medium">Available</label>
                  <Switch
                    id={`available-${item._id}`}
                    checked={item.available}
                    onCheckedChange={() => toggleAvailability(item._id)}
                    aria-label={`Toggle availability for ${item.name}`}
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="flex-1 hover:scale-105 transition-transform duration-200">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item._id)} className="flex-1 hover:scale-105 transition-transform duration-200">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="animate-slideUp">
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] animate-fadeIn">Image</TableHead>
                  <TableHead className="animate-fadeIn delay-75">Name</TableHead>
                  <TableHead className="animate-fadeIn delay-100">Category</TableHead>
                  <TableHead className="animate-fadeIn delay-150">Price</TableHead>
                  <TableHead className="animate-fadeIn delay-200">Availability</TableHead>
                  <TableHead className="animate-fadeIn delay-250">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((item, index) => (
                  <TableRow key={item._id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                    <TableCell>
                      <Image
                        src={item.imageUrl || "https://placehold.co/64x64.png"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover aspect-square hover:scale-110 transition-transform duration-300"
                        data-ai-hint={item.dataAiHint || "food drink"}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Switch
                        checked={item.available}
                        onCheckedChange={() => toggleAvailability(item._id)}
                        aria-label={`Toggle availability for ${item.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(item)} aria-label="Edit item" className="hover:scale-110 transition-transform duration-200">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(item._id)} aria-label="Delete item" className="hover:scale-110 transition-transform duration-200">
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
