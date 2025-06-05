"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, MessageSquare, Gift } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock data for customers
const customers = [
  { id: "CUST001", name: "Alice Wonderland", email: "alice@example.com", phone: "555-1111", totalOrders: 15, loyaltyPoints: 150 },
  { id: "CUST002", name: "Bob The Builder", email: "bob@example.com", phone: "555-2222", totalOrders: 5, loyaltyPoints: 50 },
  { id: "CUST003", name: "Charlie Brown", email: "charlie@example.com", phone: "555-3333", totalOrders: 25, loyaltyPoints: 250, feedback: "Loves the new cold brew!" },
  { id: "CUST004", name: "Diana Prince", email: "diana@example.com", phone: "555-4444", totalOrders: 8, loyaltyPoints: 80 },
];

export default function CustomersPage() {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);
  const [emailContent, setEmailContent] = useState("");
  const [promotionContent, setPromotionContent] = useState("");
  const { toast } = useToast();

  const handleSendEmail = (customer: typeof customers[0]) => {
    setSelectedCustomer(customer);
    setEmailContent("");
    setIsEmailDialogOpen(true);
  };

  const handleSendPromotion = (customer: typeof customers[0]) => {
    setSelectedCustomer(customer);
    setPromotionContent("");
    setIsPromotionDialogOpen(true);
  };

  const handleEmailSubmit = () => {
    // Here you would typically integrate with your email service
    toast({
      title: "Email Sent",
      description: `Email has been sent to ${selectedCustomer?.name}`,
    });
    setIsEmailDialogOpen(false);
  };

  const handlePromotionSubmit = () => {
    // Here you would typically integrate with your promotion service
    toast({
      title: "Promotion Sent",
      description: `Promotion has been sent to ${selectedCustomer?.name}`,
    });
    setIsPromotionDialogOpen(false);
  };

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
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleSendEmail(customer)}
                        aria-label="Send Email"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleSendPromotion(customer)}
                        aria-label="Send Promotion"
                      >
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

      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Email to {selectedCustomer?.name}</DialogTitle>
            <DialogDescription>
              Write your email message below. It will be sent to {selectedCustomer?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Write your email message here..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEmailSubmit} disabled={!emailContent.trim()}>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Promotion Dialog */}
      <Dialog open={isPromotionDialogOpen} onOpenChange={setIsPromotionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Promotion to {selectedCustomer?.name}</DialogTitle>
            <DialogDescription>
              Write your promotion message below. It will be sent to {selectedCustomer?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Write your promotion message here..."
              value={promotionContent}
              onChange={(e) => setPromotionContent(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPromotionDialogOpen(false)}>Cancel</Button>
            <Button onClick={handlePromotionSubmit} disabled={!promotionContent.trim()}>Send Promotion</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
