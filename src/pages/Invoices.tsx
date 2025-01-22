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
  { id: 1, client: "John Doe", amount: "$120.00", status: "Paid", date: "2024-02-20" },
  { id: 2, client: "Jane Smith", amount: "$85.50", status: "Pending", date: "2024-02-19" },
  { id: 3, client: "Bob Johnson", amount: "$45.00", status: "Overdue", date: "2024-02-18" },
];

export default function Invoices() {
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
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.client}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
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