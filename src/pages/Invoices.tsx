import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Dummy data for generated invoices
const invoicesData = [
  {
    id: 1,
    clientName: "John Doe",
    month: "March 2024",
    totalAmount: 45.50,
    status: "Paid",
    generatedDate: "2024-03-31"
  },
  {
    id: 2,
    clientName: "Jane Smith",
    month: "March 2024",
    totalAmount: 20.00,
    status: "Pending",
    generatedDate: "2024-03-31"
  }
];

export default function Invoices() {
  const { toast } = useToast();

  const handleDownload = (invoiceId: number) => {
    toast({
      title: "Download Started",
      description: `Downloading invoice #${invoiceId}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Generated Invoices</h1>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Generated Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoicesData.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.clientName}</TableCell>
                <TableCell>{invoice.month}</TableCell>
                <TableCell>${invoice.totalAmount.toFixed(2)}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.generatedDate}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDownload(invoice.id)}
                  >
                    <Download className="h-4 w-4" />
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