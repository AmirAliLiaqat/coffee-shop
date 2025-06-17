export const suppliers = [
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

export const upcomingDeliveries = [
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
