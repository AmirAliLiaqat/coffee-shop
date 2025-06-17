import { InventoryItem } from "@/types/dashboard/inventory";

export const initialInventoryItems: InventoryItem[] = [
  {
    id: "1",
    itemName: "Coffee Beans - Espresso Blend",
    quantity: 20,
    unit: "kg",
    supplier: "Pro Roasters",
    lowStockThreshold: 5,
  },
  {
    id: "2",
    itemName: "Whole Milk",
    quantity: 15,
    unit: "liters",
    supplier: "Dairy Farm Co.",
    lowStockThreshold: 3,
  },
  {
    id: "3",
    itemName: "Croissant Dough - Frozen",
    quantity: 50,
    unit: "units",
    supplier: "Bakery Supplies Inc.",
    lowStockThreshold: 10,
  },
  {
    id: "4",
    itemName: "Sugar Syrup - Vanilla",
    quantity: 5,
    unit: "bottles",
    supplier: "Sweet Flavors Ltd.",
    lowStockThreshold: 1,
  },
];
