export type OrderStatus =
  | "Pending"
  | "Preparing"
  | "Ready"
  | "Completed"
  | "Cancelled";

export interface Order {
  id: string;
  customerName: string;
  items: string;
  status: OrderStatus;
  totalAmount: string;
  assignedStaff: string;
  orderDate: string;
  notes?: string;
}
