"use client";

import PageHeader from "@/components/frontend/layout/PageHeader";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { CreditCard, Package, Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { cartService, CartItem } from "@/services/cart";
import { orderService, CreateOrderData } from "@/services/orders";
import { Loader } from "@/components/ui/loader";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date"),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<CheckoutForm>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await cartService.getCart();
        setCartItems(cart.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
        toast({
          title: "Error",
          description: "Failed to load cart items. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [toast]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validateStep = (step: number) => {
    const stepFields: Record<number, (keyof CheckoutForm)[]> = {
      1: ['fullName', 'email', 'address', 'city', 'postalCode'],
      2: ['cardNumber', 'expiryDate', 'cvv'],
    };

    try {
      const fieldsToValidate = stepFields[step];
      const partialSchema = z.object(
        Object.fromEntries(
          fieldsToValidate.map(field => [field, checkoutSchema.shape[field]])
        )
      );
      partialSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};
        error.errors.forEach(err => {
          const field = err.path[0] as keyof CheckoutForm;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof CheckoutForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      try {
        const orderData: CreateOrderData = {
          items: cartItems,
          shipping: {
            fullName: formData.fullName,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
          },
          payment: {
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
          },
          total,
        };

        const { orderId } = await orderService.createOrder(orderData);
        await cartService.clearCart();
        router.push(`/order-confirmation?orderId=${orderId}`);
      } catch (error) {
        console.error('Error creating order:', error);
        toast({
          title: "Error",
          description: "Failed to process your order. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="lg" variant="primary" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push('/shop')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Checkout"
        pathName="Checkout"
        pathLink="/checkout"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6 animate-slide-in">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-primary text-white" : "bg-gray-200"}`}>
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Shipping Information</h3>
                  <p className="text-sm text-gray-600">Enter your delivery details</p>
                </div>
              </div>

              {currentStep === 1 && (
                <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
                  <div>
                    <Input
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500 mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500 mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={errors.postalCode ? "border-red-500" : ""}
                      />
                      {errors.postalCode && (
                        <p className="text-sm text-red-500 mt-1">{errors.postalCode}</p>
                      )}
                    </div>
                  </div>
                  <Button type="submit" className="w-full hover:scale-105 transition-transform">
                    Continue to Payment
                  </Button>
                </form>
              )}
            </Card>

            <Card className="p-6 mb-6 animate-slide-in">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-primary text-white" : "bg-gray-200"}`}>
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Payment Information</h3>
                  <p className="text-sm text-gray-600">Enter your payment details</p>
                </div>
              </div>

              {currentStep === 2 && (
                <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
                  <div>
                    <Input
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={errors.cardNumber ? "border-red-500" : ""}
                    />
                    {errors.cardNumber && (
                      <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className={errors.expiryDate ? "border-red-500" : ""}
                      />
                      {errors.expiryDate && (
                        <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className={errors.cvv ? "border-red-500" : ""}
                      />
                      {errors.cvv && (
                        <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                  <Button type="submit" className="w-full hover:scale-105 transition-transform">
                    Review Order
                  </Button>
                </form>
              )}
            </Card>

            <Card className="p-6 animate-slide-in">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-primary text-white" : "bg-gray-200"}`}>
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Order Review</h3>
                  <p className="text-sm text-gray-600">Review your order details</p>
                </div>
              </div>

              {currentStep === 3 && (
                <div className="animate-fade-in">
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
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
                  </div>
                  <form onSubmit={handleSubmit}>
                    <Button type="submit" className="w-full hover:scale-105 transition-transform">
                      Place Order
                    </Button>
                  </form>
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8 animate-slide-in">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
} 