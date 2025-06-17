export const mockOrders = [
  {
    id: "12345",
    date: "March 15, 2024",
    status: "In Transit",
    items: [
      { name: "Cappuccino", quantity: 2, price: 4.5 },
      { name: "Croissant", quantity: 1, price: 3.5 },
    ],
    total: 12.5,
  },
  {
    id: "67890",
    date: "June 27, 2025",
    status: "In Progress",
    items: [
      { name: "Cappuccino", quantity: 2, price: 25.25 },
      { name: "Croissant", quantity: 1, price: 20.25 },
      { name: "Cold Coffee", quantity: 1, price: 30.25 },
    ],
    total: 75.5,
  },
];
