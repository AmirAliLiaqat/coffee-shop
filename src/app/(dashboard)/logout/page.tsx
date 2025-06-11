// This is a placeholder for logout functionality.
// In a real app, this would handle session termination and redirect.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, LayoutDashboard, Home } from "lucide-react";

export default function LogoutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">Logging Out</CardTitle>
          <CardDescription className="text-center">
            You have been logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <LogOut className="h-16 w-16 text-primary" />
          <p>Thank you for using BrewControl!</p>
          <Button asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return to Frontend
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-4">
            In a real application, you would be redirected to a login page or public homepage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
