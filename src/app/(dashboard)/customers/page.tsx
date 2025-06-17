"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, Gift } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SharedDialog } from "@/components/ui/shared-dialog"
import { customers } from "@/mock/dashboard/customers";

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
    <div className="flex flex-col gap-6 animate-fadeIn">
      <h1 className="text-3xl font-bold font-headline animate-slideDown">Customer Management</h1>

      <Card className="animate-slideUp">
        <CardHeader>
          <CardTitle className="animate-fadeIn">Customer List</CardTitle>
          <CardDescription className="animate-fadeIn delay-100">View and manage your customer information.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="animate-fadeIn">Customer ID</TableHead>
                <TableHead className="animate-fadeIn delay-75">Name</TableHead>
                <TableHead className="animate-fadeIn delay-100">Email</TableHead>
                <TableHead className="animate-fadeIn delay-150">Phone</TableHead>
                <TableHead className="animate-fadeIn delay-200">Total Orders</TableHead>
                <TableHead className="animate-fadeIn delay-250">Loyalty Points</TableHead>
                <TableHead className="animate-fadeIn delay-300">Feedback</TableHead>
                <TableHead className="animate-fadeIn delay-350">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow key={customer.id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
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
                        className="hover:scale-110 transition-transform duration-200"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleSendPromotion(customer)}
                        aria-label="Send Promotion"
                        className="hover:scale-110 transition-transform duration-200"
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

      <SharedDialog
        open={isEmailDialogOpen}
        onOpenChange={setIsEmailDialogOpen}
        title={`Send Email to ${selectedCustomer?.name}`}
        description={`Write your email message below. It will be sent to ${selectedCustomer?.email}`}
        onSubmit={handleEmailSubmit}
        submitText="Send Email"
        showCloseButton={true}
        onClose={() => setIsEmailDialogOpen(false)}
        className="animate-scaleIn"
      >
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Write your email message here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="min-h-[200px] animate-fadeIn"
          />
        </div>
      </SharedDialog>

      <SharedDialog
        open={isPromotionDialogOpen}
        onOpenChange={setIsPromotionDialogOpen}
        title={`Send Promotion to ${selectedCustomer?.name}`}
        description={`Write your promotion message below. It will be sent to ${selectedCustomer?.email}`}
        onSubmit={handlePromotionSubmit}
        submitText="Send Promotion"
        showCloseButton={true}
        onClose={() => setIsPromotionDialogOpen(false)}
        className="animate-scaleIn"
      >
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Write your promotion message here..."
            value={promotionContent}
            onChange={(e) => setPromotionContent(e.target.value)}
            className="min-h-[200px] animate-fadeIn"
          />
        </div>
      </SharedDialog>
    </div>
  );
}
