import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export const PaymentsTab = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Payment Methods</CardTitle>
        <Button>Add New Card</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <CreditCard className="w-6 h-6" />
                <div>
                  <h3 className="font-medium">Visa ending in 4242</h3>
                  <p className="text-sm text-gray-600">Expires 12/25</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 