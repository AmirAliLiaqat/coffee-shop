import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface SupplierFormData {
  name: string;
  type: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  paymentTerms: string;
  notes: string;
}

interface AddSupplierFormProps {
  supplier: SupplierFormData;
  onChange: (data: SupplierFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function AddSupplierForm({ supplier, onChange, onSubmit, onCancel }: AddSupplierFormProps) {
  const handleChange = (field: keyof SupplierFormData, value: string) => {
    onChange({ ...supplier, [field]: value });
  };

  return (
    <div className="grid gap-4 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Supplier Name</Label>
          <Input
            id="name"
            value={supplier.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Coffee Beans Co."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={supplier.type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <option value="coffee">Coffee</option>
            <option value="equipment">Equipment</option>
            <option value="packaging">Packaging</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact Name</Label>
          <Input
            id="contactName"
            value={supplier.contactName}
            onChange={(e) => handleChange("contactName", e.target.value)}
            placeholder="John Smith"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={supplier.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={supplier.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="(555) 555-5555"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="paymentTerms">Payment Terms</Label>
          <select
            id="paymentTerms"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={supplier.paymentTerms}
            onChange={(e) => handleChange("paymentTerms", e.target.value)}
          >
            <option value="immediate">Immediate</option>
            <option value="7 days">7 days</option>
            <option value="15 days">15 days</option>
            <option value="30 days">30 days</option>
            <option value="60 days">60 days</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <textarea
          id="address"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={supplier.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="Enter supplier's address..."
          rows={2}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={supplier.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Additional notes about the supplier..."
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit}>Add Supplier</Button>
      </div>
    </div>
  );
} 