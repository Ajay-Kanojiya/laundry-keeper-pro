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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// Extended dummy data for generated invoices
const invoicesData = [
  {
    id: 1,
    clientName: "John Doe",
    month: "March 2024",
    totalAmount: 45.50,
    status: "Paid",
    generatedDate: "2024-03-31",
    paidDate: "2024-04-02"
  },
  {
    id: 2,
    clientName: "John Doe",
    month: "February 2024",
    totalAmount: 38.75,
    status: "Paid",
    generatedDate: "2024-02-29",
    paidDate: "2024-03-01"
  },
  {
    id: 3,
    clientName: "John Doe",
    month: "January 2024",
    totalAmount: 42.25,
    status: "Paid",
    generatedDate: "2024-01-31",
    paidDate: "2024-02-01"
  },
  {
    id: 4,
    clientName: "Jane Smith",
    month: "March 2024",
    totalAmount: 20.00,
    status: "Pending",
    generatedDate: "2024-03-31",
    paidDate: null
  },
  {
    id: 5,
    clientName: "Jane Smith",
    month: "February 2024",
    totalAmount: 25.50,
    status: "Paid",
    generatedDate: "2024-02-29",
    paidDate: "2024-03-03"
  },
  {
    id: 6,
    clientName: "Bob Wilson",
    month: "March 2024",
    totalAmount: 52.25,
    status: "Pending",
    generatedDate: "2024-03-31",
    paidDate: null
  },
  {
    id: 7,
    clientName: "Bob Wilson",
    month: "February 2024",
    totalAmount: 48.75,
    status: "Paid",
    generatedDate: "2024-02-29",
    paidDate: "2024-03-01"
  }
];

export default function Invoices() {
  const { toast } = useToast();
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);

  const handleDownload = (invoiceId: number) => {
    toast({
      title: "Download Started",
      description: `Downloading invoice #${invoiceId}`,
    });
  };

  const handleStatusChange = (invoiceId: number, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Invoice #${invoiceId} marked as ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Generated Invoices</h1>
      </div>

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
                <TableHead className="w-[120px]">Paid Date</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoicesData.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.clientName}</TableCell>
                  <TableCell>{invoice.month}</TableCell>
                  <TableCell>${invoice.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="h-8 px-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            invoice.status === 'Paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {invoice.status === 'Paid' ? <Check className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                            {invoice.status}
                          </span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Invoice Status</DialogTitle>
                          <DialogDescription>
                            Change the status of invoice #{invoice.id}
                          </DialogDescription>
                        </DialogHeader>
                        <RadioGroup defaultValue={invoice.status} className="py-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Pending" id={`pending-${invoice.id}`} />
                            <Label htmlFor={`pending-${invoice.id}`}>Pending</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Paid" id={`paid-${invoice.id}`} />
                            <Label htmlFor={`paid-${invoice.id}`}>Paid</Label>
                          </div>
                        </RadioGroup>
                        <DialogFooter>
                          <Button onClick={() => handleStatusChange(invoice.id, 'Paid')}>
                            Update Status
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>{invoice.generatedDate}</TableCell>
                  <TableCell>{invoice.paidDate || '-'}</TableCell>
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
