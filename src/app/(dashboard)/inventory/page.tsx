"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, PlusCircle, AlertTriangle, PackagePlus } from "lucide-react";
import { AddInventoryItemForm } from "@/components/dashboard/inventory/AddInventoryItemForm";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SharedDialog } from "@/components/ui/shared-dialog"
import { InventoryItem } from "@/types/dashboard/inventory";
import { initialInventoryItems } from "@/mock/dashboard/inventory";

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(initialInventoryItems);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const handleSubmit = (values: any) => {
    if (editingItem) {
      setInventoryItems(inventoryItems.map(item => item.id === editingItem.id ? { ...item, ...values } : item));
      toast({ title: "Item Updated", description: `${values.itemName} has been updated in inventory.` });
    } else {
      const newItem = { id: String(Date.now()), ...values };
      setInventoryItems([...inventoryItems, newItem]);
      toast({ title: "Item Added", description: `${values.itemName} has been added to inventory.` });
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (itemId: string) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== itemId));
    toast({ title: "Item Deleted", description: "The inventory item has been deleted.", variant: "destructive" });
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleAddStock = (item: InventoryItem) => {
    setSelectedItem(item);
    setStockQuantity(1);
    setIsStockDialogOpen(true);
  };

  const handleStockUpdate = () => {
    if (selectedItem && stockQuantity > 0) {
      setInventoryItems(inventoryItems.map(item =>
        item.id === selectedItem.id
          ? { ...item, quantity: item.quantity + stockQuantity }
          : item
      ));
      toast({
        title: "Stock Updated",
        description: `Added ${stockQuantity} ${selectedItem.unit} of ${selectedItem.itemName} to inventory.`
      });
      setIsStockDialogOpen(false);
      setSelectedItem(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline animate-slideDown">Inventory Management</h1>
        <Button onClick={handleAddNew} className="hover:scale-105 transition-transform duration-200">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </div>

      <SharedDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        title={editingItem ? "Edit Inventory Item" : "Add New Inventory Item"}
        description={editingItem ? "Update the details of the inventory item." : "Fill in the details to add a new item to inventory."}
        size="lg"
        onClose={() => setIsFormOpen(false)}
        className="animate-scaleIn"
      >
        <AddInventoryItemForm
          onSubmit={handleSubmit}
          defaultValues={editingItem || {}}
          onClose={() => setIsFormOpen(false)}
        />
      </SharedDialog>

      <SharedDialog
        open={isStockDialogOpen}
        onOpenChange={setIsStockDialogOpen}
        title="Add Stock"
        description={`Add stock to ${selectedItem?.itemName}`}
        onSubmit={handleStockUpdate}
        submitText="Add Stock"
        className="animate-scaleIn"
      >
        <div className="grid gap-4 py-4 animate-fadeIn">
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity to Add</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </SharedDialog>

      <Card className="animate-slideUp">
        <CardHeader>
          <CardTitle className="animate-fadeIn">Current Stock</CardTitle>
          <CardDescription className="animate-fadeIn delay-100">Track and manage your inventory levels.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="animate-fadeIn">Item Name</TableHead>
                <TableHead className="animate-fadeIn delay-75">Quantity</TableHead>
                <TableHead className="animate-fadeIn delay-100">Unit</TableHead>
                <TableHead className="animate-fadeIn delay-150">Supplier</TableHead>
                <TableHead className="animate-fadeIn delay-200">Status</TableHead>
                <TableHead className="animate-fadeIn delay-250">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item, index) => (
                <TableRow key={item.id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                  <TableCell className="font-medium">{item.itemName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.supplier || "N/A"}</TableCell>
                  <TableCell>
                    {item.lowStockThreshold !== undefined && item.quantity <= item.lowStockThreshold ? (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> Low Stock
                      </Badge>
                    ) : (
                      <Badge variant="secondary">In Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(item)} aria-label="Edit Item" className="hover:scale-110 transition-transform duration-200">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleAddStock(item)}
                        aria-label="Add Stock"
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        <PackagePlus className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)} aria-label="Delete Item" className="hover:scale-110 transition-transform duration-200">
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
    </div>
  );
}
