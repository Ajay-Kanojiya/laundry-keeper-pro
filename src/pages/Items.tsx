import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, ArrowLeft } from "lucide-react";
import { useState } from "react";

// Dummy data for clients and their items
const clientsData = [
  { 
    id: 1, 
    name: "John Doe",
    items: [
      { 
        id: 1, 
        item: "T-Shirt", 
        quantity: 3,
        rate: 5.00,
        status: "Processing", 
        dateReceived: "2024-02-20" 
      },
      { 
        id: 2, 
        item: "Pants", 
        quantity: 2,
        rate: 7.50,
        status: "Ready", 
        dateReceived: "2024-02-19" 
      },
    ]
  },
  { 
    id: 2, 
    name: "Jane Smith",
    items: [
      { 
        id: 3, 
        item: "Dress", 
        quantity: 1,
        rate: 10.00,
        status: "Delivered", 
        dateReceived: "2024-02-18" 
      },
    ]
  },
  { 
    id: 3, 
    name: "Bob Johnson",
    items: [
      { 
        id: 4, 
        item: "Suit", 
        quantity: 1,
        rate: 15.00,
        status: "Processing", 
        dateReceived: "2024-02-21" 
      },
    ]
  },
];

export default function Items() {
  const [selectedClient, setSelectedClient] = useState<typeof clientsData[0] | null>(null);

  const handleBackClick = () => {
    setSelectedClient(null);
  };

  if (!selectedClient) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Select Client</h1>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Total Items</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientsData.map((client) => (
                <TableRow 
                  key={client.id} 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => setSelectedClient(client)}
                >
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.items.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">{selectedClient.name}'s Items</h1>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Rate ($)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Received</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedClient.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.item}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.rate.toFixed(2)}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.dateReceived}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}