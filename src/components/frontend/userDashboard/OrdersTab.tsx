import { useState } from "react";
import { Download, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SharedDialog } from "@/components/ui/shared-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateAllOrdersToPDF, generateOrderToPDF } from "@/utils/pdf-export";
import { mockOrders } from "@/mock/frontend/orders";

export const OrdersTab = () => {
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { toast } = useToast();

  const handleDownloadOrder = (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      const doc = generateOrderToPDF(order);
      doc.save(`order-${orderId}.pdf`);
    }
  };

  const handleDownloadAllOrders = () => {
    const doc = generateAllOrdersToPDF(mockOrders);
    doc.save('all-orders.pdf');
  };

  const handleReviewSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the review to your backend
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });

    setIsReviewDialogOpen(false);
    setRating(0);
    setReview("");
    setSelectedOrder(null);
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-5 w-5 cursor-pointer transition-colors ${index < rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
              }`}
            onClick={() => interactive && setRating(index + 1)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order History</CardTitle>
        <Button variant="outline" size="sm" onClick={handleDownloadAllOrders}>
          <Download className="w-4 h-4 mr-2 ml-1" />
          Download All Orders
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-medium">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">Placed on {order.date}</p>
                  <Badge className="mt-2" variant="secondary">{order.status}</Badge>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                    onClick={() => handleDownloadOrder(order.id)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsReviewDialogOpen(true);
                    }}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <SharedDialog
        open={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        title={`Review Order #${selectedOrder?.id}`}
        description="Share your experience with this order."
        onSubmit={handleReviewSubmit}
        submitText="Submit Review"
        showCloseButton={true}
        onClose={() => {
          setIsReviewDialogOpen(false);
          setRating(0);
          setReview("");
          setSelectedOrder(null);
        }}
        className="animate-scaleIn"
      >
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Rating</Label>
            {renderStars(rating, true)}
          </div>
          <div className="space-y-2">
            <Label htmlFor="review">Your Review</Label>
            <Textarea
              id="review"
              placeholder="Share your experience with this order..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
      </SharedDialog>
    </Card>
  );
}; 