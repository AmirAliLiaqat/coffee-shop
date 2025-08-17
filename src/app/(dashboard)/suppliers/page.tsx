"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Truck, Package, DollarSign, Calendar, AlertCircle } from "lucide-react";
import { SharedDialog } from "@/components/ui/shared-dialog";
import { AddSupplierForm } from "@/components/dashboard/suppliers/AddSupplierForm";
import { toast } from "@/components/ui/use-toast";
import { Delivery, Supplier } from "@/types/dashboard/supplier";
import { suppliers, upcomingDeliveries } from "@/mock/dashboard/supplier";

export default function SuppliersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
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
    setIsDialogOpen(false);
  };

  const handleViewSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsViewDialogOpen(true);
  };

  const handleTrackDelivery = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    toast({
      title: "Tracking Delivery",
      description: `Tracking delivery from ${delivery.supplier} scheduled for ${delivery.deliveryDate}`,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline animate-slideDown">Suppliers</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="animate-fadeIn delay-100">
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

      <SharedDialog
        open={isViewDialogOpen}
        size="lg"
        onOpenChange={setIsViewDialogOpen}
        title={selectedSupplier?.name || "Supplier Details"}
        description="View supplier information and history"
      >
        {selectedSupplier && (
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <p className="text-sm text-muted-foreground">{selectedSupplier.type}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <p className="text-sm text-muted-foreground">{selectedSupplier.status}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Order Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Last Order</Label>
                    <p className="text-sm text-muted-foreground">{selectedSupplier.lastOrder}</p>
                  </div>
                  <div>
                    <Label>Next Delivery</Label>
                    <p className="text-sm text-muted-foreground">{selectedSupplier.nextDelivery}</p>
                  </div>
                  <div>
                    <Label>Pending Orders</Label>
                    <p className="text-sm text-muted-foreground">{selectedSupplier.pendingOrders}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
              <Button>
                Edit Supplier
              </Button>
            </div>
          </div>
        )}
      </SharedDialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-slideUp">
        <Card className="animate-fadeIn">
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

        <Card className="md:col-span-2 animate-fadeIn delay-75">
          <CardHeader>
            <CardTitle>Active Suppliers</CardTitle>
            <CardDescription>
              List of current suppliers and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suppliers.map((supplier, index) => (
                <div
                  key={supplier.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg animate-fadeIn gap-4"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="space-y-1 w-full sm:w-auto">
                    <div className="flex flex-wrap items-center gap-2">
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
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {supplier.pendingOrders > 0 && (
                      <div className="flex items-center gap-1 text-yellow-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{supplier.pendingOrders} pending</span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewSupplier(supplier)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fadeIn delay-150">
        <CardHeader>
          <CardTitle>Upcoming Deliveries</CardTitle>
          <CardDescription>
            Scheduled supplier deliveries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeliveries.map((delivery, index) => (
              <div
                key={delivery.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg animate-fadeIn gap-4"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="space-y-1 w-full sm:w-auto">
                  <p className="font-medium">{delivery.supplier}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${delivery.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {delivery.status}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTrackDelivery(delivery)}
                  >
                    Track
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div >
  );
} 