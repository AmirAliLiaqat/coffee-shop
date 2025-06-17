import { Promotion } from "@/types/dashboard/promotion";

export const activePromotions: Promotion[] = [
  {
    id: 1,
    name: "Happy Hour",
    description: "20% off all drinks from 3-5 PM",
    type: "Time-based",
    status: "Active",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    usage: 234,
  },
  {
    id: 2,
    name: "Student Discount",
    description: "15% off with valid student ID",
    type: "Customer Group",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usage: 567,
  },
  {
    id: 3,
    name: "Buy One Get One",
    description: "Buy any coffee, get one free",
    type: "Product",
    status: "Active",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    usage: 123,
  },
];
