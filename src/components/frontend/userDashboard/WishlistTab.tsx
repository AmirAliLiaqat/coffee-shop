import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const WishlistTab = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Load wishlist items from localStorage
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Wishlist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">${item.price}</p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" onClick={() => addToCart(item)}>Add to Cart</Button>
                <Button variant="outline" size="sm" onClick={() => removeFromWishlist(item.id)}>Remove</Button>
              </div>
            </div>
          ))}
          {wishlistItems.length === 0 && (
            <div className="col-span-full py-4 text-gray-500">
              Your wishlist is empty
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 