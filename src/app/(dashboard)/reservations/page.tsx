"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Users, Table } from "lucide-react";
import { SharedDialog } from "@/components/ui/shared-dialog"

export default function ReservationsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReservation, setNewReservation] = useState({
    customerName: "",
    email: "",
    phone: "",
    partySize: "2",
    date: "",
    time: "",
    table: "",
    notes: "",
  });

  const todayReservations = [
    {
      id: 1,
      customerName: "John Smith",
      partySize: 4,
      time: "12:30 PM",
      table: "Table 5",
      status: "Confirmed",
    },
    {
      id: 2,
      customerName: "Sarah Johnson",
      partySize: 2,
      time: "1:00 PM",
      table: "Table 3",
      status: "Confirmed",
    },
    {
      id: 3,
      customerName: "Michael Brown",
      partySize: 6,
      time: "2:00 PM",
      table: "Table 8",
      status: "Pending",
    },
  ];

  const handleCancel = () => {
    setIsDialogOpen(false);
    // Reset form
    setNewReservation({
      customerName: "",
      email: "",
      phone: "",
      partySize: "2",
      date: "",
      time: "",
      table: "",
      notes: "",
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-slideDown">Reservations</h1>
          <p className="text-muted-foreground animate-fadeIn delay-100">
            Manage table reservations and seating arrangements.
          </p>
        </div>
        <SharedDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title="Create New Reservation"
          description="Add a new table reservation for your customers."
          onSubmit={() => setIsDialogOpen(false)}
          submitText="Create Reservation"
          onClose={handleCancel}
          className="animate-scaleIn"
        >
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={newReservation.customerName}
                onChange={(e) =>
                  setNewReservation({ ...newReservation, customerName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={newReservation.phone}
                onChange={(e) =>
                  setNewReservation({ ...newReservation, phone: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newReservation.date}
                  onChange={(e) =>
                    setNewReservation({ ...newReservation, date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newReservation.time}
                  onChange={(e) =>
                    setNewReservation({ ...newReservation, time: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                value={newReservation.partySize}
                onChange={(e) =>
                  setNewReservation({ ...newReservation, partySize: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Special Requests</Label>
              <textarea
                id="notes"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newReservation.notes}
                onChange={(e) =>
                  setNewReservation({ ...newReservation, notes: e.target.value })
                }
                placeholder="Any special requests or notes..."
                rows={3}
              />
            </div>
          </div>
        </SharedDialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-slideUp">
        <Card className="animate-fadeIn">
          <CardHeader>
            <CardTitle>Today's Overview</CardTitle>
            <CardDescription>
              Reservation statistics for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Reservations</span>
                </div>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Guests</span>
                </div>
                <span className="font-medium">48</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Table className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Available Tables</span>
                </div>
                <span className="font-medium">8</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 animate-fadeIn delay-75">
          <CardHeader>
            <CardTitle>Today's Reservations</CardTitle>
            <CardDescription>
              Upcoming reservations for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayReservations.map((reservation, index) => (
                <div
                  key={reservation.id}
                  className="flex items-center justify-between p-4 border rounded-lg animate-fadeIn"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="space-y-1">
                    <p className="font-medium">{reservation.customerName}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{reservation.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{reservation.partySize} people</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Table className="h-4 w-4" />
                        <span>{reservation.table}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${reservation.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {reservation.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fadeIn delay-150">
        <CardHeader>
          <CardTitle>Floor Plan</CardTitle>
          <CardDescription>
            Current table layout and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center border rounded-lg">
            <p className="text-muted-foreground">Interactive floor plan will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 