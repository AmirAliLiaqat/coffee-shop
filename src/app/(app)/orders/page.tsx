
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Filter, Search, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { AddOrderForm } from "@/components/orders/AddOrderForm";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

type OrderStatus = "Pending" | "Preparing" | "Ready" | "Completed" | "Cancelled";

interface Order {
  id: string;
  customerName: string;
  items: string; // Item[] in a real app
  status: OrderStatus;
  totalAmount: string; // number in a real app
  assignedStaff: string; // StaffMember object in a real app
  orderDate: string;
  notes?: string;
}

const initialOrders: Order[] = [
  { id: "ORD001", customerName: "Alice Wonderland", items: "Latte, Croissant", status: "Completed", totalAmount: "$8.50", assignedStaff: "John Doe", orderDate: "2024-07-28" },
  { id: "ORD002", customerName: "Bob The Builder", items: "Espresso, Muffin", status: "Preparing", totalAmount: "$6.00", assignedStaff: "Jane Smith", orderDate: "2024-07-28" },
  { id: "ORD003", customerName: "Charlie Brown", items: "Cappuccino", status: "Pending", totalAmount: "$4.50", assignedStaff: "N/A", orderDate: "2024-07-29", notes: "Extra hot milk" },
  { id: "ORD004", customerName: "Diana Prince", items: "Americano, Cookie", status: "Ready", totalAmount: "$7.00", assignedStaff: "John Doe", orderDate: "2024-07-29" },
  { id: "ORD005", customerName: "Edward Scissorhands", items: "Mocha, Scone", status: "Cancelled", totalAmount: "$9.25", assignedStaff: "Jane Smith", orderDate: "2024-07-27" },
];

const mockStaffList = [
  { id: "staff1", name: "John Doe" },
  { id: "staff2", name: "Jane Smith" },
  { id: "staff3", name: "Mike Ross" },
  { id: "staff4", name: "Sarah Connor" },
  { id: "staff0", name: "N/A" },
];

const orderStatuses: OrderStatus[] = ["Pending", "Preparing", "Ready", "Completed", "Cancelled"];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isAddOrderDialogOpen, setIsAddOrderDialogOpen] = useState(false);
  const [isViewOrderDialogOpen, setIsViewOrderDialogOpen] = useState(false);
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusToUpdate, setStatusToUpdate] = useState<OrderStatus | "">("");

  const { toast } = useToast();

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
      case "Pending": return "bg-orange-100 text-orange-700"; // Changed from red for better distinction from Cancelled
      case "Ready": return "bg-blue-100 text-blue-700";
      case "Cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Orders Management</h1>
        <Button onClick={handleAddNewOrder}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Order
        </Button>
      </div>

      {/* Add Order Dialog */}
      <Dialog open={isAddOrderDialogOpen} onOpenChange={setIsAddOrderDialogOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="font-headline">Add New Order</DialogTitle>
            <DialogDescription>Fill in the details to create a new customer order.</DialogDescription>
          </DialogHeader>
          <AddOrderForm
            onSubmit={handleAddOrderSubmit}
            staffList={mockStaffList}
            onClose={() => setIsAddOrderDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* View Order Dialog */}
      <Dialog open={isViewOrderDialogOpen} onOpenChange={setIsViewOrderDialogOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="font-headline">Order Details: {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-3 py-4">
              <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
              <p><strong>Items:</strong> {selectedOrder.items}</p>
              <p><strong>Total:</strong> {selectedOrder.totalAmount}</p>
              <p><strong>Status:</strong> <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span></p>
              <p><strong>Assigned Staff:</strong> {selectedOrder.assignedStaff}</p>
              <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
              {selectedOrder.notes && <p><strong>Notes:</strong> {selectedOrder.notes}</p>}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOrderDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline">Update Order Status: {selectedOrder?.id}</DialogTitle>
            <DialogDescription>Select the new status for this order.</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="py-4 space-y-4">
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateStatusDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateStatusSubmit} disabled={!statusToUpdate || statusToUpdate === selectedOrder?.status}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Card>
        <CardHeader>
          <CardTitle>Current Orders</CardTitle>
          <CardDescription>View and manage all customer orders.</CardDescription>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by customer or ID..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {orderStatuses.map(status => (
                   <SelectItem key={status} value={status.toLowerCase()}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by Staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                {mockStaffList.map(staff => (
                   <SelectItem key={staff.id} value={staff.name.toLowerCase().replace(" ", "-")}>{staff.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Apply Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Assigned Staff</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
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
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" aria-label="View Order" onClick={() => handleViewOrder(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" aria-label="Update Status" onClick={() => handleOpenUpdateStatusDialog(order)}>
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
