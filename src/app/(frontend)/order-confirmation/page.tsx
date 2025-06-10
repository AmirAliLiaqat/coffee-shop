"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { CheckCircle2, Package, Truck, Home } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function OrderConfirmationPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderNumber, setOrderNumber] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Generate a random order number
    setOrderNumber(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    
    // Get the last cart items before they were cleared
    const lastCart = localStorage.getItem("lastCart");
    if (lastCart) {
      setOrderItems(JSON.parse(lastCart));
    }
  }, []);

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
          <p className="text-sm text-gray-500 mt-2">Order #{orderNumber}</p>
        </div>

        <Card className="p-6 mb-8 animate-slide-in">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity} × ${item.price}
                  </p>
                </div>
                <p className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center animate-slide-in" style={{ animationDelay: "100ms" }}>
            <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Order Received</h3>
            <p className="text-sm text-gray-600">We've received your order</p>
          </Card>
          <Card className="p-6 text-center animate-slide-in" style={{ animationDelay: "200ms" }}>
            <Truck className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Preparing</h3>
            <p className="text-sm text-gray-600">Your order is being prepared</p>
          </Card>
          <Card className="p-6 text-center animate-slide-in" style={{ animationDelay: "300ms" }}>
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Ready for Pickup</h3>
            <p className="text-sm text-gray-600">Your order will be ready soon</p>
          </Card>
        </div>

        <div className="text-center animate-fade-in">
          <Button
            onClick={() => router.push("/")}
            className="hover:scale-105 transition-transform"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
} 