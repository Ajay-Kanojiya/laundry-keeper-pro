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

const items = [
  { 
    id: 1, 
    item: "T-Shirt", 
    client: "John Doe", 
    quantity: 3,
    rate: 5.00,
    status: "Processing", 
    dateReceived: "2024-02-20" 
  },
  { 
    id: 2, 
    item: "Pants", 
    client: "Jane Smith", 
    quantity: 2,
    rate: 7.50,
    status: "Ready", 
    dateReceived: "2024-02-19" 
  },
  { 
    id: 3, 
    item: "Dress", 
    client: "Bob Johnson", 
    quantity: 1,
    rate: 10.00,
    status: "Delivered", 
    dateReceived: "2024-02-18" 
  },
];

export default function Items() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Items</h1>
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
              <TableHead>Client</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Rate ($)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Received</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.item}</TableCell>
                <TableCell>{item.client}</TableCell>
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