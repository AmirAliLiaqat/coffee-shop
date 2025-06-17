import { MenuItem } from "@/types/dashboard/menu";

export const initialMenuItems: MenuItem[] = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&h=150&fit=crop",
    name: "Espresso",
    category: "Hot Drinks",
    price: 3.0,
    available: true,
    description: "Strong black coffee.",
    dataAiHint: "espresso coffee",
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=150&h=150&fit=crop",
    name: "Croissant",
    category: "Pastries",
    price: 2.5,
    available: true,
    description: "Buttery and flaky.",
    dataAiHint: "croissant pastry",
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=150&h=150&fit=crop",
    name: "Iced Latte",
    category: "Cold Drinks",
    price: 4.5,
    available: false,
    description: "Chilled latte with milk.",
    dataAiHint: "iced latte",
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=150&h=150&fit=crop",
    name: "Chicken Sandwich",
    category: "Sandwiches",
    price: 7.0,
    available: true,
    description: "Grilled chicken with lettuce and tomato.",
    dataAiHint: "chicken sandwich",
  },
];
