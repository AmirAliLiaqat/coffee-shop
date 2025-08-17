"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Filter, Search, PlusCircle } from "lucide-react";
import { AddOrderForm } from "@/components/dashboard/orders/AddOrderForm";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { SharedDialog } from "@/components/ui/shared-dialog"
import { Order, OrderStatus } from "@/types/dashboard/orders";
import { initialOrders, mockStaffList, orderStatuses } from "@/mock/dashboard/orders"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isAddOrderDialogOpen, setIsAddOrderDialogOpen] = useState(false);
  const [isViewOrderDialogOpen, setIsViewOrderDialogOpen] = useState(false);
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusToUpdate, setStatusToUpdate] = useState<OrderStatus | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [staffFilter, setStaffFilter] = useState("all");

  const { toast } = useToast();

  // Filter orders based on search query and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = searchQuery === "" ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesStaff = staffFilter === "all" ||
      order.assignedStaff.toLowerCase().replace(" ", "-") === staffFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesStaff;
  });

  const handleAddNewOrder = () => {
    setIsAddOrderDialogOpen(true);
  };

  const handleAddOrderSubmit = (values: any) => {
    const newOrder: Order = {
      id: `ORD${String(Date.now()).slice(-3)}`, // Simple ID generation
      customerName: values.customerName,
      items: values.items,
      status: "Pending",
      totalAmount: `$${parseFloat(values.totalAmount).toFixed(2)}`,
      assignedStaff: values.assignedStaff || "N/A",
      orderDate: new Date().toISOString().split("T")[0], // Today's date
      notes: values.notes,
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    toast({ title: "Order Added", description: `Order for ${newOrder.customerName} has been successfully created.` });
    setIsAddOrderDialogOpen(false);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewOrderDialogOpen(true);
  };

  const handleOpenUpdateStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setStatusToUpdate(order.status);
    setIsUpdateStatusDialogOpen(true);
  };

  const handleUpdateStatusSubmit = () => {
    if (selectedOrder && statusToUpdate) {
      setOrders(prevOrders =>
        prevOrders.map(o =>
          o.id === selectedOrder.id ? { ...o, status: statusToUpdate as OrderStatus } : o
        )
      );
      toast({ title: "Status Updated", description: `Order ${selectedOrder.id} status updated to ${statusToUpdate}.` });
      setIsUpdateStatusDialogOpen(false);
      setSelectedOrder(null);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "Preparing": return "bg-yellow-100 text-yellow-700";
      case "Pending": return "bg-orange-100 text-orange-700";
      case "Ready": return "bg-blue-100 text-blue-700";
      case "Cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };


  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline animate-slideDown">Orders Management</h1>
        <Button onClick={handleAddNewOrder} className="hover:scale-105 transition-transform duration-200">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Order
        </Button>
      </div>

      <SharedDialog
        open={isAddOrderDialogOpen}
        onOpenChange={setIsAddOrderDialogOpen}
        title="Add New Order"
        description="Fill in the details to create a new customer order."
        size="lg"
        onClose={() => setIsAddOrderDialogOpen(false)}
      >
        <AddOrderForm
          onSubmit={handleAddOrderSubmit}
          staffList={mockStaffList}
          onClose={() => setIsAddOrderDialogOpen(false)}
        />
      </SharedDialog>

      <SharedDialog
        open={isViewOrderDialogOpen}
        onOpenChange={setIsViewOrderDialogOpen}
        title={`Order Details: ${selectedOrder?.id}`}
        size="lg"
        showCloseButton={true}
        onClose={() => setIsViewOrderDialogOpen(false)}
      >
        {selectedOrder && (
          <div className="space-y-3 py-4 animate-fadeIn">
            <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
            <p><strong>Items:</strong> {selectedOrder.items}</p>
            <p><strong>Total:</strong> {selectedOrder.totalAmount}</p>
            <p><strong>Status:</strong> <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span></p>
            <p><strong>Assigned Staff:</strong> {selectedOrder.assignedStaff}</p>
            <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
            {selectedOrder.notes && <p><strong>Notes:</strong> {selectedOrder.notes}</p>}
          </div>
        )}
      </SharedDialog>

      <SharedDialog
        open={isUpdateStatusDialogOpen}
        onOpenChange={setIsUpdateStatusDialogOpen}
        title={`Update Order Status: ${selectedOrder?.id}`}
        description="Select the new status for this order."
        onSubmit={handleUpdateStatusSubmit}
        submitText="Update Status"
        showCloseButton={true}
        onClose={() => setIsUpdateStatusDialogOpen(false)}
      >
        {selectedOrder && (
          <div className="py-4 space-y-4 animate-fadeIn">
            <div className="grid gap-2">
              <Label htmlFor="status-update">New Status</Label>
              <Select value={statusToUpdate} onValueChange={(value) => setStatusToUpdate(value as OrderStatus)}>
                <SelectTrigger id="status-update">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {orderStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </SharedDialog>

      <Card className="animate-slideUp">
        <CardHeader>
          <CardTitle className="animate-fadeIn">Current Orders</CardTitle>
          <CardDescription className="animate-fadeIn delay-100">View and manage all customer orders.</CardDescription>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 animate-fadeIn delay-150">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer or ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] animate-fadeIn delay-200">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {orderStatuses.map(status => (
                  <SelectItem key={status} value={status.toLowerCase()}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={staffFilter} onValueChange={setStaffFilter}>
              <SelectTrigger className="w-full sm:w-[180px] animate-fadeIn delay-250">
                <SelectValue placeholder="Filter by Staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                {mockStaffList.map(staff => (
                  <SelectItem key={staff.id} value={staff.name.toLowerCase().replace(" ", "-")}>{staff.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setStaffFilter("all");
              }}
              className="animate-fadeIn delay-300 hover:scale-105 transition-transform duration-200"
            >
              <Filter className="mr-2 h-4 w-4" /> Reset Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="animate-fadeIn">Order ID</TableHead>
                <TableHead className="animate-fadeIn delay-75">Customer</TableHead>
                <TableHead className="animate-fadeIn delay-100">Items</TableHead>
                <TableHead className="animate-fadeIn delay-150">Status</TableHead>
                <TableHead className="animate-fadeIn delay-200">Total</TableHead>
                <TableHead className="animate-fadeIn delay-250">Staff</TableHead>
                <TableHead className="animate-fadeIn delay-300">Date</TableHead>
                <TableHead className="animate-fadeIn delay-350">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order, index) => (
                <TableRow key={order.id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{order.assignedStaff}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleViewOrder(order)}
                        aria-label="View order details"
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleOpenUpdateStatusDialog(order)}
                        aria-label="Update order status"
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        <Edit className="h-4 w-4" />
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
