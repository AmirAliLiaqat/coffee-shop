import { StaffMember } from "@/types/dashboard/staff";

export const initialStaff: StaffMember[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Manager",
    contactInfo: { email: "john.doe@example.com", phone: "555-1234" },
    status: "Active",
    shiftTiming: "9 AM - 5 PM",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Barista",
    contactInfo: { email: "jane.smith@example.com" },
    status: "Active",
    shiftTiming: "7 AM - 3 PM",
  },
  {
    id: "3",
    name: "Mike Ross",
    role: "Cashier",
    contactInfo: { email: "mike.ross@example.com", phone: "555-5678" },
    status: "Inactive",
    shiftTiming: "1 PM - 9 PM",
  },
  {
    id: "4",
    name: "Sarah Connor",
    role: "Barista",
    contactInfo: { email: "sarah.connor@example.com" },
    status: "Active",
    shiftTiming: "Flexible",
  },
];
