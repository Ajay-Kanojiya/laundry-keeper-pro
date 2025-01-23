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

// Extended dummy data for generated invoices
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
  },
  {
    id: 3,
    clientName: "Alice Johnson",
    month: "February 2024",
    totalAmount: 35.75,
    status: "Paid",
    generatedDate: "2024-02-29"
  },
  {
    id: 4,
    clientName: "Bob Wilson",
    month: "January 2024",
    totalAmount: 52.25,
    status: "Paid",
    generatedDate: "2024-01-31"
  },
  {
    id: 5,
    clientName: "Carol Brown",
    month: "December 2023",
    totalAmount: 28.50,
    status: "Paid",
    generatedDate: "2023-12-31"
  },
  {
    id: 6,
    clientName: "David Lee",
    month: "November 2023",
    totalAmount: 42.00,
    status: "Paid",
    generatedDate: "2023-11-30"
  },
  {
    id: 7,
    clientName: "Emma Davis",
    month: "October 2023",
    totalAmount: 33.75,
    status: "Paid",
    generatedDate: "2023-10-31"
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Generated Invoices</h1>
      </div>

      {/* Responsive table container */}
      <div className="overflow-hidden rounded-md border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Client</TableHead>
                <TableHead className="w-[120px]">Month</TableHead>
                <TableHead className="w-[100px]">Amount</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[120px]">Generated Date</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoicesData.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.clientName}</TableCell>
                  <TableCell>{invoice.month}</TableCell>
                  <TableCell>${invoice.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      invoice.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell>{invoice.generatedDate}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDownload(invoice.id)}
                      className="hover:bg-slate-100"
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
    </div>
  );
}