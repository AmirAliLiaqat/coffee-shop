"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Edit, UserX, PlusCircle } from "lucide-react";
import { SharedDialog } from "@/components/ui/shared-dialog";
import { AddStaffForm } from "@/components/dashboard/staff/AddStaffForm";
import { useToast } from "@/hooks/use-toast";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  contactInfo: { email: string; phone?: string };
  status: "Active" | "Inactive";
  shiftTiming: string; // e.g., "9 AM - 5 PM"
}

const initialStaff: StaffMember[] = [
  { id: "1", name: "John Doe", role: "Manager", contactInfo: { email: "john.doe@example.com", phone: "555-1234" }, status: "Active", shiftTiming: "9 AM - 5 PM" },
  { id: "2", name: "Jane Smith", role: "Barista", contactInfo: { email: "jane.smith@example.com" }, status: "Active", shiftTiming: "7 AM - 3 PM" },
  { id: "3", name: "Mike Ross", role: "Cashier", contactInfo: { email: "mike.ross@example.com", phone: "555-5678" }, status: "Inactive", shiftTiming: "1 PM - 9 PM" },
  { id: "4", name: "Sarah Connor", role: "Barista", contactInfo: { email: "sarah.connor@example.com" }, status: "Active", shiftTiming: "Flexible" },
];

export default function StaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaff);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const { toast } = useToast();

  const handleSubmit = (values: any) => {
    const staffData = {
      name: values.name,
      role: values.role,
      contactInfo: { email: values.email, phone: values.phone },
      // Default status and shift for new staff, or maintain for existing
      status: editingStaff?.status || "Active",
      shiftTiming: editingStaff?.shiftTiming || "Not Set",
    };

    if (editingStaff) {
      setStaffList(staffList.map(staff => staff.id === editingStaff.id ? { ...staff, ...staffData } : staff));
      toast({ title: "Staff Updated", description: `${values.name}'s details have been updated.` });
    } else {
      const newStaff = { id: String(Date.now()), ...staffData };
      setStaffList([...staffList, newStaff]);
      toast({ title: "Staff Added", description: `${values.name} has been added to the team.` });
    }
    setIsFormOpen(false);
    setEditingStaff(null);
  };

  const handleEdit = (staff: StaffMember) => {
    const defaultFormValues = {
      name: staff.name,
      email: staff.contactInfo.email,
      phone: staff.contactInfo.phone,
      role: staff.role,
    };
    setEditingStaff({ ...staff, ...defaultFormValues }); // Pass full staff data to retain ID etc.
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingStaff(null);
    setIsFormOpen(true);
  };

  const toggleStatus = (staffId: string) => {
    setStaffList(staffList.map(staff =>
      staff.id === staffId ? { ...staff, status: staff.status === "Active" ? "Inactive" : "Active" } : staff
    ));
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline animate-slideDown">Staff Management</h1>
        <Button onClick={handleAddNew} className="hover:scale-105 transition-transform duration-200">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Staff Member
        </Button>
      </div>

      <SharedDialog
        open={isFormOpen}
        size="lg"
        onOpenChange={setIsFormOpen}
        title={editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
        description={editingStaff ? "Update the staff member's details." : "Fill in the details for the new staff member."}
        className="animate-scaleIn"
      >
        <AddStaffForm
          onSubmit={handleSubmit}
          defaultValues={editingStaff ? {
            name: editingStaff.name,
            email: editingStaff.contactInfo.email,
            phone: editingStaff.contactInfo.phone,
            role: editingStaff.role
          } : {}}
          onClose={() => setIsFormOpen(false)}
        />
      </SharedDialog>

      <Card className="animate-slideUp">
        <CardHeader>
          <CardTitle className="animate-fadeIn">Staff List</CardTitle>
          <CardDescription className="animate-fadeIn delay-100">Manage your team members.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="animate-fadeIn">Name</TableHead>
                <TableHead className="animate-fadeIn delay-75">Role</TableHead>
                <TableHead className="animate-fadeIn delay-100">Contact Info</TableHead>
                <TableHead className="animate-fadeIn delay-150">Shift Timing</TableHead>
                <TableHead className="animate-fadeIn delay-200">Status</TableHead>
                <TableHead className="animate-fadeIn delay-250">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffList.map((staff, index) => (
                <TableRow key={staff.id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                  <TableCell className="font-medium">{staff.name}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>
                    <div>{staff.contactInfo.email}</div>
                    {staff.contactInfo.phone && <div className="text-xs text-muted-foreground">{staff.contactInfo.phone}</div>}
                  </TableCell>
                  <TableCell>{staff.shiftTiming}</TableCell>
                  <TableCell>
                    <Switch
                      checked={staff.status === "Active"}
                      onCheckedChange={() => toggleStatus(staff.id)}
                      aria-label={`Toggle status for ${staff.name}`}
                    />
                    <span className="ml-2 text-sm">{staff.status}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(staff)} aria-label="Edit Staff" className="hover:scale-110 transition-transform duration-200">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => toggleStatus(staff.id)} aria-label={staff.status === "Active" ? "Deactivate Staff" : "Activate Staff"} className="hover:scale-110 transition-transform duration-200">
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
