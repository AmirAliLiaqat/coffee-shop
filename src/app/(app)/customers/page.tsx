import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, MessageSquare, Gift } from "lucide-react";

// Mock data for customers
const customers = [
  { id: "CUST001", name: "Alice Wonderland", email: "alice@example.com", phone: "555-1111", totalOrders: 15, loyaltyPoints: 150 },
  { id: "CUST002", name: "Bob The Builder", email: "bob@example.com", phone: "555-2222", totalOrders: 5, loyaltyPoints: 50 },
  { id: "CUST003", name: "Charlie Brown", email: "charlie@example.com", phone: "555-3333", totalOrders: 25, loyaltyPoints: 250, feedback: "Loves the new cold brew!" },
  { id: "CUST004", name: "Diana Prince", email: "diana@example.com", phone: "555-4444", totalOrders: 8, loyaltyPoints: 80 },
];


export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-headline">Customer Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>View and manage your customer information.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Loyalty Points</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell className="text-center">{customer.totalOrders}</TableCell>
                  <TableCell className="text-center">{customer.loyaltyPoints}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate" title={customer.feedback}>{customer.feedback || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" aria-label="Send Email (placeholder)">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" aria-label="Send Promotion (placeholder)">
                        <Gift className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
