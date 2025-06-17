import { Order, OrderStatus } from "@/types/dashboard/orders";

export const initialOrders: Order[] = [
  {
    id: "ORD001",
    customerName: "Alice Wonderland",
    items: "Latte, Croissant",
    status: "Completed",
    totalAmount: "$8.50",
    assignedStaff: "John Doe",
    orderDate: "2024-07-28",
  },
  {
    id: "ORD002",
    customerName: "Bob The Builder",
    items: "Espresso, Muffin",
    status: "Preparing",
    totalAmount: "$6.00",
    assignedStaff: "Jane Smith",
    orderDate: "2024-07-28",
  },
  {
    id: "ORD003",
    customerName: "Charlie Brown",
    items: "Cappuccino",
    status: "Pending",
    totalAmount: "$4.50",
    assignedStaff: "N/A",
    orderDate: "2024-07-29",
    notes: "Extra hot milk",
  },
  {
    id: "ORD004",
    customerName: "Diana Prince",
    items: "Americano, Cookie",
    status: "Ready",
    totalAmount: "$7.00",
    assignedStaff: "John Doe",
    orderDate: "2024-07-29",
  },
  {
    id: "ORD005",
    customerName: "Edward Scissorhands",
    items: "Mocha, Scone",
    status: "Cancelled",
    totalAmount: "$9.25",
    assignedStaff: "Jane Smith",
    orderDate: "2024-07-27",
  },
];

export const mockStaffList = [
  { id: "staff1", name: "John Doe" },
  { id: "staff2", name: "Jane Smith" },
  { id: "staff3", name: "Mike Ross" },
  { id: "staff4", name: "Sarah Connor" },
  { id: "staff0", name: "N/A" },
];

export const orderStatuses: OrderStatus[] = [
  "Pending",
  "Preparing",
  "Ready",
  "Completed",
  "Cancelled",
];
