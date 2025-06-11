"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/frontend/layout/PageHeader";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Load wishlist items from localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  const removeFromWishlist = (id: string) => {
    const item = wishlistItems.find(item => item.id === id);
    const updatedItems = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedItems);
    localStorage.setItem("wishlist", JSON.stringify(updatedItems));

    if (item) {
      toast({
        title: "Removed from Wishlist",
        description: `${item.name} has been removed from your wishlist.`,
      });
    }
  };

  const addToCart = (item: WishlistItem) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((cartItem: any) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    removeFromWishlist(item.id);
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const total = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <PageHeader
        title="Your Wishlist"
        pathName="Wishlist"
        pathLink="/wishlist"
      />
      <div className="container mx-auto px-4 py-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-xl text-gray-600">Your wishlist is empty</p>
            <Button
              onClick={() => router.push("/shop")}
              className="mt-4 animate-bounce"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {wishlistItems.map((item) => (
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
                      <Button
                        className="mt-2 hover:scale-105 transition-transform"
                        onClick={() => addToCart(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-500 hover:text-red-700 hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 h-fit animate-slide-in">
              <h2 className="text-xl font-semibold mb-4">Wishlist Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>{wishlistItems.length}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Value</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button
                className="w-full mt-6 hover:scale-105 transition-transform"
                onClick={() => router.push("/shop")}
              >
                Continue Shopping
              </Button>
            </Card>
          </div>
        )}
      </div>
    </>
  );
} 