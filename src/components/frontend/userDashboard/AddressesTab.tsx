import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SharedDialog } from "@/components/ui/shared-dialog";
import { AddAddressForm } from "./AddAddressForm";

export const AddressesTab = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = () => {
    // Handle form submission
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Saved Addresses</CardTitle>
        <SharedDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title="Add New Address"
          trigger={<Button>Add New Address</Button>}
          onSubmit={handleSubmit}
          submitText="Add New Address"
          size="lg"
          showCloseButton={true}
          onClose={() => setIsDialogOpen(false)}
        >
          <AddAddressForm />
        </SharedDialog>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Home</h3>
                <p className="text-sm text-gray-600">123 Main Street</p>
                <p className="text-sm text-gray-600">Apt 4B, New York, NY 10001</p>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 