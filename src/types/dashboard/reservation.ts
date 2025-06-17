export interface Reservation {
  id: number;
  customerName: string;
  partySize: number;
  time: string;
  table: string;
  status: "Confirmed" | "Pending";
}
