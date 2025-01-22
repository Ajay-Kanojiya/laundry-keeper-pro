import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Plus } from "lucide-react";

const invoices = [
  { 
    id: 1, 
    client: "John Doe", 
    items: [
      { name: "T-Shirt", quantity: 3, rate: 5.00 },
      { name: "Pants", quantity: 1, rate: 7.50 }
    ],
    status: "Paid", 
    date: "2024-02-20" 
  },
  { 
    id: 2, 
    client: "Jane Smith", 
    items: [
      { name: "Dress", quantity: 2, rate: 10.00 }
    ],
    status: "Pending", 
    date: "2024-02-19" 
  },
  { 
    id: 3, 
    client: "Bob Johnson", 
    items: [
      { name: "T-Shirt", quantity: 4, rate: 5.00 }
    ],
    status: "Overdue", 
    date: "2024-02-18" 
  },
];

export default function Invoices() {
  const calculateTotal = (items: { quantity: number; rate: number }[]) => {
    return items.reduce((total, item) => total + (item.quantity * item.rate), 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Generate Invoice
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.client}</TableCell>
                <TableCell>{invoice.items.length} items</TableCell>
                <TableCell>${calculateTotal(invoice.items).toFixed(2)}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <FileText className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}