"use client";

import PageHeader from "@/components/frontend/layout/PageHeader";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ShoppingCart, Trash2, LogIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cartService, Cart, CartItem } from "@/services/cart";
import { Loader } from "@/components/ui/loader";

export default function CartPage() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const cartData = await cartService.getCart();
      setCart(cartData);
      setAuthError(false);
    } catch (error: any) {
      console.error('Error fetching cart:', error);
      if (error.response?.status === 401) {
        setAuthError(true);
        toast({
          title: "Authentication Required",
          description: "Please sign in to view your cart.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to load cart. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      await cartService.updateCartItem(productId, quantity);
      await fetchCart(); // Refresh cart data
      toast({
        title: "Quantity Updated",
        description: "Cart has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating cart:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await cartService.removeFromCart(productId);
      await fetchCart(); // Refresh cart data
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      });
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="lg" variant="primary" />
      </div>
    );
  }

  const renderContent = () => {
    if (authError) {
      return (
        <div className="text-center py-12 animate-fade-in">
          <LogIn className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl text-gray-600 mb-4">Please sign in to view your cart</p>
          <Button
            onClick={() => router.push("/signin")}
            className="mt-4 animate-bounce"
          >
            Sign In
          </Button>
        </div>
      );
    }

    if (!cart.items.length) {
      return (
        <div className="text-center py-12 animate-fade-in">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <Button
            onClick={() => router.push("/shop")}
            className="mt-4 animate-bounce"
          >
            Continue Shopping
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item: CartItem) => (
            <Card key={item.id} className="p-4 animate-slide-in">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => router.push(`/product/${item.id}`)}
                />
                <div className="flex-1">
                  <h3
                    className="font-semibold cursor-pointer hover:text-primary transition-colors"
                    onClick={() => router.push(`/product/${item.id}`)}
                  >
                    {item.name}
                  </h3>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="hover:scale-110 transition-transform"
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="hover:scale-110 transition-transform"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 hover:scale-110 transition-transform"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 h-fit animate-slide-in">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Button
            className="w-full mt-6 hover:scale-105 transition-transform"
            onClick={() => router.push("/checkout")}
          >
            Proceed to Checkout
          </Button>
          <Button
            variant="outline"
            className="w-full mt-4 hover:scale-105 transition-transform"
            onClick={() => router.push("/shop")}
          >
            Continue Shopping
          </Button>
        </Card>
      </div>
    );
  };

  return (
    <>
      <PageHeader
        title="Your Cart"
        pathName="Cart"
        pathLink="/cart"
      />
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </>
  );
}