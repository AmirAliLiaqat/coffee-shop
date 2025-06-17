import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const AddAddressForm = () => {
  const [address, setAddress] = useState({
    label: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement address submission logic
    console.log("Address submitted:", address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="label">Address Label</Label>
        <Input
          id="label"
          placeholder="Home, Work, etc."
          value={address.label}
          onChange={(e) => setAddress({ ...address, label: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="street">Street Address</Label>
        <Input
          id="street"
          placeholder="123 Main Street"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="apartment">Apartment/Suite</Label>
        <Input
          id="apartment"
          placeholder="Apt 4B"
          value={address.apartment}
          onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="New York"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            placeholder="NY"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="zipCode">ZIP Code</Label>
        <Input
          id="zipCode"
          placeholder="10001"
          value={address.zipCode}
          onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
        />
      </div>
    </form>
  );
}; 