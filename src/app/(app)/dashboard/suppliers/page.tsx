"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Truck, Package, DollarSign, Calendar, AlertCircle } from "lucide-react";
import { SharedDialog } from "@/components/ui/shared-dialog";
import { AddSupplierForm } from "@/components/dashboard/suppliers/AddSupplierForm";

export default function SuppliersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    type: "coffee",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    paymentTerms: "30 days",
    notes: "",
  });

  const suppliers = [
    {
      id: 1,
      name: "Coffee Bean Co.",
      type: "Coffee Beans",
      status: "Active",
      lastOrder: "2024-03-10",
      nextDelivery: "2024-03-25",
      pendingOrders: 2,
    },
    {
      id: 2,
      name: "Fresh Dairy Supply",
      type: "Dairy Products",
      status: "Active",
      lastOrder: "2024-03-12",
      nextDelivery: "2024-03-19",
      pendingOrders: 1,
    },
    {
      id: 3,
      name: "Bakery Essentials",
      type: "Bakery Supplies",
      status: "Inactive",
      lastOrder: "2024-02-28",
      nextDelivery: "N/A",
      pendingOrders: 0,
    },
  ];

  const upcomingDeliveries = [
    {
      id: 1,
      supplier: "Coffee Bean Co.",
      items: ["Ethiopian Yirgacheffe", "Colombian Supremo"],
      deliveryDate: "2024-03-25",
      status: "Confirmed",
    },
    {
      id: 2,
      supplier: "Fresh Dairy Supply",
      items: ["Whole Milk", "Heavy Cream"],
      deliveryDate: "2024-03-19",
      status: "Pending",
    },
  ];

  const handleCancel = () => {
    setIsDialogOpen(false);
    setNewSupplier({
      name: "",
      type: "coffee",
      contactName: "",
      email: "",
      phone: "",
      address: "",
      paymentTerms: "30 days",
      notes: "",
    });
  };

  const handleSubmit = () => {
    // Handle form submission
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Suppliers</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Supplier
        </Button>
      </div>

      <SharedDialog
        open={isDialogOpen}
        size="lg"
        onOpenChange={setIsDialogOpen}
        title="Add New Supplier"
        description="Add a new supplier to your vendor list."
      >
        <AddSupplierForm
          supplier={newSupplier}
          onChange={setNewSupplier}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </SharedDialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Supplier Overview</CardTitle>
            <CardDescription>
              Key supplier metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Active Suppliers</span>
                </div>
                <span className="font-medium">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Pending Orders</span>
                </div>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Monthly Spend</span>
                </div>
                <span className="font-medium">$12,450</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Active Suppliers</CardTitle>
            <CardDescription>
              List of current suppliers and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{supplier.name}</p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${supplier.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {supplier.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        <span>{supplier.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Last Order: {supplier.lastOrder}</span>
                      </div>
                      {supplier.status === "Active" && (
                        <div className="flex items-center gap-1">
                          <Truck className="h-4 w-4" />
                          <span>Next Delivery: {supplier.nextDelivery}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {supplier.pendingOrders > 0 && (
                      <div className="flex items-center gap-1 text-yellow-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{supplier.pendingOrders} pending</span>
                      </div>
                    )}
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deliveries</CardTitle>
          <CardDescription>
            Scheduled supplier deliveries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{delivery.supplier}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      <span>{delivery.items.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Delivery: {delivery.deliveryDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${delivery.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {delivery.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    Track
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 