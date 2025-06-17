export interface StaffMember {
  id: string;
  name: string;
  role: string;
  contactInfo: { email: string; phone?: string };
  status: "Active" | "Inactive";
  shiftTiming: string;
}
