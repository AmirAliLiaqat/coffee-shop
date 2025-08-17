import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { SharedDialog } from "@/components/ui/shared-dialog";
import { Package, Truck, CheckCircle2, Clock } from "lucide-react";

// Mock tracking data - replace with actual data from your backend
const mockTrackingData = {
  orderId: "12345",
  status: "In Transit",
  estimatedDelivery: "March 18, 2024",
  trackingNumber: "TRK123456789",
  currentLocation: "Distribution Center",
  trackingHistory: [
    {
      status: "Order Placed",
      date: "March 15, 2024",
      time: "10:30 AM",
      location: "Online Store",
      icon: Package
    },
    {
      status: "Processing",
      date: "March 15, 2024",
      time: "2:45 PM",
      location: "Warehouse",
      icon: Clock
    },
    {
      status: "In Transit",
      date: "March 16, 2024",
      time: "9:15 AM",
      location: "Distribution Center",
      icon: Truck
    },
    {
      status: "Out for Delivery",
      date: "March 18, 2024",
      time: "8:00 AM",
      location: "Local Facility",
      icon: CheckCircle2
    }
  ]
};

export const TrackingTab = () => {
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-medium">Order #{mockTrackingData.orderId}</h3>
                <p className="text-sm text-gray-600">Estimated delivery: {mockTrackingData.estimatedDelivery}</p>
                <div className="mt-2">
                  <Badge variant="secondary">{mockTrackingData.status}</Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => setIsTrackingModalOpen(true)}
              >
                Track Details
              </Button>
            </div>
          </div>
        </div>

        <SharedDialog
          open={isTrackingModalOpen}
          onOpenChange={setIsTrackingModalOpen}
          title={`Tracking Details - Order #${mockTrackingData.orderId}`}
          size="lg"
        >
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tracking Number</p>
                <p className="font-medium">{mockTrackingData.trackingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Location</p>
                <p className="font-medium">{mockTrackingData.currentLocation}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Tracking History</h3>
              <div className="space-y-4">
                {mockTrackingData.trackingHistory.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      {index !== mockTrackingData.trackingHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{item.status}</p>
                      <p className="text-sm text-gray-600">{item.date} at {item.time}</p>
                      <p className="text-sm text-gray-600">{item.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SharedDialog>
      </CardContent>
    </Card>
  );
}; 