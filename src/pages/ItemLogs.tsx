import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const clientsData = [
  { 
    id: 1, 
    name: "John Doe",
    itemLogs: [
      { 
        id: 1,
        date: "2024-03-20",
        items: [
          { name: "T-Shirt", quantity: 3, rate: 5.00 },
          { name: "Pants", quantity: 2, rate: 7.50 }
        ]
      },
      { 
        id: 2,
        date: "2024-03-25",
        items: [
          { name: "Dress Shirt", quantity: 1, rate: 6.00 }
        ]
      }
    ]
  },
  { 
    id: 2, 
    name: "Jane Smith",
    itemLogs: [
      { 
        id: 3,
        date: "2024-03-18",
        items: [
          { name: "Dress", quantity: 2, rate: 10.00 }
        ]
      }
    ]
  }
];

export default function ItemLogs() {
  const [selectedClient, setSelectedClient] = useState<typeof clientsData[0] | null>(null);
  const { toast } = useToast();

  const handleBackClick = () => {
    setSelectedClient(null);
  };

  const handleAddLog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Log Entry Added",
      description: "New log entry has been successfully added.",
    });
  };

  const calculateTotal = (items: { quantity: number; rate: number }[]) => {
    return items.reduce((total, item) => total + (item.quantity * item.rate), 0);
  };

  if (!selectedClient) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Select Client for Item Logging</h1>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Total Logs</TableHead>
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
                  <TableCell>{client.itemLogs.length}</TableCell>
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
            <span className="sr-only">Back</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <h1 className="text-3xl font-bold">{selectedClient.name}'s Item Logs</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Log Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Log Entry</DialogTitle>
              <DialogDescription>
                Enter the details for the new log entry.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddLog}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item">Item</Label>
                  <Input id="item" placeholder="Enter item name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="Enter quantity" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Rate</Label>
                  <Input id="rate" type="number" step="0.01" placeholder="Enter rate" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Log Entry</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedClient.itemLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.date}</TableCell>
                <TableCell>
                  <ul className="list-disc list-inside">
                    {log.items.map((item, index) => (
                      <li key={index}>
                        {item.name} x{item.quantity} (${item.rate.toFixed(2)} each)
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>${calculateTotal(log.items).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}