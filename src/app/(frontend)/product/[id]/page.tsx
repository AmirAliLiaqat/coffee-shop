"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Star, Clock, Coffee, Thermometer, Droplet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { use } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
  rating?: number;
  reviews?: number;
  preparationTime?: string;
  temperature?: string;
  size?: string;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you would fetch the product from an API
    // For now, we'll simulate it with localStorage and add some mock data
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const foundProduct = products.find((p: Product) => p.id === resolvedParams.id);

    if (foundProduct) {
      // Add mock data for demonstration
      const enhancedProduct = {
        ...foundProduct,
        category: foundProduct.id.startsWith("hot") ? "Hot Coffee" : "Cold Coffee",
        rating: 4.5,
        reviews: 128,
        preparationTime: "3-5 minutes",
        temperature: foundProduct.id.startsWith("hot") ? "Hot (70°C)" : "Cold (4°C)",
        size: "Regular (12 oz)",
        ingredients: [
          "Premium Arabica Coffee Beans",
          "Filtered Water",
          foundProduct.name.toLowerCase().includes("chocolate") ? "Dark Chocolate" : "",
          foundProduct.name.toLowerCase().includes("milk") ? "Fresh Milk" : "",
        ].filter(Boolean),
        nutritionalInfo: {
          calories: 120,
          protein: 2,
          carbs: 15,
          fat: 5,
        },
      };
      setProduct(enhancedProduct);

      // Check if product is in wishlist
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setIsInWishlist(wishlist.some((item: Product) => item.id === resolvedParams.id));
    }
  }, [resolvedParams.id]);

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const toggleWishlist = () => {
    if (!product) return;

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isInWishlist) {
      const updatedWishlist = wishlist.filter((item: Product) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsInWishlist(true);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-600">Product not found</p>
        <Button
          onClick={() => router.push("/shop")}
          className="mt-4"
        >
          Back to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Product Image */}
        <div className="space-y-6">
          <div className="relative group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleWishlist}
              className={`absolute top-4 right-4 ${isInWishlist ? "text-destructive" : "text-accent-foreground"} 
                hover:scale-110 transition-transform bg-accent/20 hover:bg-accent/30`}
            >
              <Heart className="w-6 h-6" fill={isInWishlist ? "currentColor" : "none"} />
            </Button>
          </div>

          {/* Product Gallery */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-secondary/50 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105"
              />
            ))}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-secondary/50 rounded-full text-sm text-secondary-foreground">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-accent">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-foreground">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl font-headline font-bold mb-2 text-foreground">{product.name}</h1>
            <p className="text-3xl font-bold text-primary">${product.price}</p>
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Product Specifications */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg transition-colors hover:bg-secondary/40">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Prep Time</p>
                <p className="font-medium text-foreground">{product.preparationTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg transition-colors hover:bg-secondary/40">
              <Thermometer className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className="font-medium text-foreground">{product.temperature}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg transition-colors hover:bg-secondary/40">
              <Coffee className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Size</p>
                <p className="font-medium text-foreground">{product.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg transition-colors hover:bg-secondary/40">
              <Droplet className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Calories</p>
                <p className="font-medium text-foreground">{product.nutritionalInfo?.calories} kcal</p>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-lg font-headline font-semibold mb-3 text-foreground">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients?.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary/30 rounded-full text-sm text-foreground transition-colors hover:bg-secondary/40"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Nutritional Information */}
          <div>
            <h3 className="text-lg font-headline font-semibold mb-3 text-foreground">Nutritional Information</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-secondary/30 rounded-lg transition-colors hover:bg-secondary/40">
                <p className="text-sm text-muted-foreground">Calories</p>
                <p className="font-medium text-foreground">{product.nutritionalInfo?.calories}</p>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg transition-colors hover:bg-secondary/40">
                <p className="text-sm text-muted-foreground">Protein</p>
                <p className="font-medium text-foreground">{product.nutritionalInfo?.protein}g</p>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg transition-colors hover:bg-secondary/40">
                <p className="text-sm text-muted-foreground">Carbs</p>
                <p className="font-medium text-foreground">{product.nutritionalInfo?.carbs}g</p>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg transition-colors hover:bg-secondary/40">
                <p className="text-sm text-muted-foreground">Fat</p>
                <p className="font-medium text-foreground">{product.nutritionalInfo?.fat}g</p>
              </div>
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="hover:scale-110 transition-transform border-input hover:border-primary"
                >
                  -
                </Button>
                <span className="w-8 text-center text-foreground">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="hover:scale-110 transition-transform border-input hover:border-primary"
                >
                  +
                </Button>
              </div>
              <Button
                className="flex-1 hover:scale-105 transition-transform bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={addToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full hover:scale-105 transition-transform border-input hover:border-primary"
              onClick={() => router.push("/shop")}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 