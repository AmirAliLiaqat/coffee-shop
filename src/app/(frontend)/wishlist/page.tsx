"use client";

import PageHeader from "@/components/frontend/layout/PageHeader";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Trash2, LogIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { wishlistService, WishlistItem } from "@/services/wishlist";
import { cartService } from "@/services/cart";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/context/AuthContext";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const items = await wishlistService.getWishlist();
        setWishlistItems(items);
        setAuthError(false);
      } catch (error: any) {
        console.error('Error fetching wishlist:', error);
        if (error.response?.status === 401) {
          setAuthError(true);
          toast({
            title: "Authentication Required",
            description: "Please sign in to view your wishlist.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to load wishlist items. Please try again.",
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [toast]);

  const removeFromWishlist = async (id: string) => {
    try {
      await wishlistService.removeFromWishlist(id);
      const item = wishlistItems.find(item => item.id === id);
      setWishlistItems(prev => prev.filter(item => item.id !== id));

      if (item) {
        toast({
          title: "Removed from Wishlist",
          description: `${item.name} has been removed from your wishlist.`,
        });
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addToCart = async (item: WishlistItem) => {
    try {
      await cartService.addToCart(item.id, 1);
      await removeFromWishlist(item.id);
      toast({
        title: "Added to Cart",
        description: `${item.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
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

  const total = Array.isArray(wishlistItems)
    ? wishlistItems.reduce((sum, item) => sum + item.price, 0)
    : 0;

  const renderContent = () => {
    if (!isAuthenticated || user?.role !== 'user') {
      return (
        <div className="text-center py-12 animate-fade-in">
          <LogIn className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl text-gray-600 mb-4">Please sign in as a user to view your wishlist</p>
          <Button
            onClick={() => router.push("/signin")}
            className="mt-4 animate-bounce"
          >
            Sign In
          </Button>
        </div>
      );
    }

    if (authError) {
      return (
        <div className="text-center py-12 animate-fade-in">
          <LogIn className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl text-gray-600 mb-4">Please sign in to view your wishlist</p>
          <Button
            onClick={() => router.push("/signin")}
            className="mt-4 animate-bounce"
          >
            Sign In
          </Button>
        </div>
      );
    }

    if (!Array.isArray(wishlistItems) || wishlistItems.length === 0) {
      return (
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
      );
    }

    return (
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
    );
  };

  return (
    <>
      <PageHeader
        title="Your Wishlist"
        pathName="Wishlist"
        pathLink="/wishlist"
      />
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </>
  );
} 