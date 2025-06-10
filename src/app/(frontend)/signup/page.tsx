"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/frontend/layout/PageHeader";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Here you would typically handle user registration
    // For now, we'll just simulate a successful registration
    localStorage.setItem("isAuthenticated", "true");
    router.push("/");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <PageHeader
        title="Sign Up"
        pathName="Sign Up"
        pathLink="/signup"
      />
      <div className="w-full relative">
        <div className="relative min-h-[calc(100vh-400px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/signin" className="font-medium text-primary hover:text-primary/80">
                  Sign in
                </Link>
              </p>
            </div>

            <Card className="p-8 animate-slide-in bg-white/90 backdrop-blur-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="hover:scale-[1.02] transition-transform"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="hover:scale-[1.02] transition-transform"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="hover:scale-[1.02] transition-transform"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="hover:scale-[1.02] transition-transform"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the{" "}
                    <Link href="/terms" className="font-medium text-primary hover:text-primary/80">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full hover:scale-105 transition-transform"
                  >
                    Create Account
                  </Button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full hover:scale-105 transition-transform"
                    onClick={() => {/* Handle Google sign up */ }}
                  >
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full hover:scale-105 transition-transform"
                    onClick={() => {/* Handle Facebook sign up */ }}
                  >
                    Facebook
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
} 