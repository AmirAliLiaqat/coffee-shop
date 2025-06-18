"use client";

import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Package, Truck, Home } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { orderService, Order } from "@/services/orders";
import { Loader } from "@/components/ui/loader";

function OrderConfirmationContent() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrder = async () => {
      const orderId = searchParams.get('orderId');
      if (!orderId) {
        router.push('/');
        return;
      }

      try {
        const orderData = await orderService.getOrder(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error);
        toast({
          title: "Error",
          description: "Failed to load order details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [searchParams, router, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="lg" variant="primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <Button onClick={() => router.push('/')}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
          <p className="text-sm text-gray-500 mt-2">Order #{order.id}</p>
        </div>

        <Card className="p-6 mb-8 animate-slide-in">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
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
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-8 animate-slide-in">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {order.shippingAddress.fullName}</p>
            <p><span className="font-medium">Email:</span> {order.shippingAddress.email}</p>
            <p><span className="font-medium">Address:</span> {order.shippingAddress.address}</p>
            <p><span className="font-medium">City:</span> {order.shippingAddress.city}</p>
            <p><span className="font-medium">Postal Code:</span> {order.shippingAddress.postalCode}</p>
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

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="lg" variant="primary" />
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
} 