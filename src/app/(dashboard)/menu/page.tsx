"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, PlusCircle, LayoutGrid, List, ImageIcon, Coffee } from "lucide-react";
import { AddMenuItemForm } from "@/components/dashboard/menu/AddMenuItemForm";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { SharedDialog } from "@/components/ui/shared-dialog";
import { productService, Product, CreateProductData } from "@/services/product";

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const { toast } = useToast();

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

  const handleSubmit = async (values: CreateProductData) => {
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
      console.error("Error saving product:", error);
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

  const handleImageError = (itemId: string) => {
    setImageErrors(prev => new Set(prev).add(itemId));
  };

  const getImageUrl = (item: Product) => {
    if (imageErrors.has(item._id) || !item.imageUrl) {
      return "https://placehold.co/300x200/6366f1/ffffff?text=No+Image";
    }
    return item.imageUrl;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col gap-6">
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

        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn delay-150">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Coffee className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <div className="h-4 w-4 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold">{products.filter(p => p.available).length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <div className="h-4 w-4 bg-orange-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">{new Set(products.map(p => p.category)).size}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <ImageIcon className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">With Images</p>
                  <p className="text-2xl font-bold">{products.filter(p => p.imageUrl).length}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
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
          defaultValues={editingItem || undefined}
          onClose={() => setIsDialogOpen(false)}
        />
      </SharedDialog>

      {products.length === 0 ? (
        <Card className="animate-fadeIn">
          <CardContent className="pt-12 pb-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <ImageIcon className="h-16 w-16 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">No menu items yet</h3>
                <p className="text-muted-foreground">Get started by adding your first menu item.</p>
              </div>
              <Button onClick={handleAddNew} className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add First Item
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <Card key={item._id} className="flex flex-col animate-fadeIn hover:shadow-lg transition-shadow duration-300" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="p-0 relative overflow-hidden">
                <div className="relative w-full aspect-[3/2] bg-muted">
                  <Image
                    src={getImageUrl(item)}
                    alt={item.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    onError={() => handleImageError(item._id)}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {!item.imageUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <CardTitle className="text-lg font-headline mb-1 line-clamp-1">{item.name}</CardTitle>
                <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                <p className="text-xl font-semibold text-primary">${item.price.toFixed(2)}</p>
                {item.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>}
                {item.ingredients && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">Ingredients: {item.ingredients}</p>}
                {item.preparationTime && <p className="text-xs text-muted-foreground mt-1">⏱️ {item.preparationTime} min</p>}
                {item.calories && <p className="text-xs text-muted-foreground mt-1">🔥 {item.calories} cal</p>}
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
                  <TableHead className="animate-fadeIn delay-125">Price</TableHead>
                  <TableHead className="animate-fadeIn delay-150">Prep Time</TableHead>
                  <TableHead className="animate-fadeIn delay-175">Calories</TableHead>
                  <TableHead className="animate-fadeIn delay-200">Availability</TableHead>
                  <TableHead className="animate-fadeIn delay-250">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((item, index) => (
                  <TableRow key={item._id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                    <TableCell>
                      <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden">
                        <Image
                          src={getImageUrl(item)}
                          alt={item.name}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                          onError={() => handleImageError(item._id)}
                          sizes="64px"
                        />
                        {!item.imageUrl && (
                          <div className="absolute inset-0 flex items-center justify-center bg-muted">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-[150px]">
                      <div className="truncate" title={item.name}>{item.name}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-primary">${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {item.preparationTime ? (
                        <span className="text-sm text-muted-foreground">⏱️ {item.preparationTime}m</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.calories ? (
                        <span className="text-sm text-muted-foreground">🔥 {item.calories}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
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
