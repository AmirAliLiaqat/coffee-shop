export interface Supplier {
  id: number;
  name: string;
  type: string;
  status: string;
  lastOrder: string;
  nextDelivery: string;
  pendingOrders: number;
}

export interface Delivery {
  id: number;
  supplier: string;
  items: string[];
  deliveryDate: string;
  status: string;
}
