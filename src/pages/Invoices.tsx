import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Plus, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// Dummy data for clients and their item logs
const clientsData = [
  { 
    id: 1, 
    name: "John Doe",
    itemLogs: [
      { 
        id: 1,
        date: "2024-02-20",
        items: [
          { name: "T-Shirt", quantity: 3, rate: 5.00 },
          { name: "Pants", quantity: 2, rate: 7.50 }
        ]
      },
      { 
        id: 2,
        date: "2024-02-25",
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
        date: "2024-02-18",
        items: [
          { name: "Dress", quantity: 2, rate: 10.00 }
        ]
      }
    ]
  }
];

export default function Invoices() {
  const [selectedClient, setSelectedClient] = useState<typeof clientsData[0] | null>(null);
  const { toast } = useToast();

  const handleBackClick = () => {
    setSelectedClient(null);
  };

  const calculateTotal = (items: { quantity: number; rate: number }[]) => {
    return items.reduce((total, item) => total + (item.quantity * item.rate), 0);
  };

  const generateInvoice = (itemLogs: typeof clientsData[0]['itemLogs']) => {
    const total = itemLogs.reduce((sum, log) => sum + calculateTotal(log.items), 0);
    
    toast({
      title: "Invoice Generated",
      description: `Total amount: $${total.toFixed(2)}`,
    });
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
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">{selectedClient.name}'s Items Log</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => generateInvoice(selectedClient.itemLogs)}>
            <FileText className="w-4 h-4 mr-2" />
            Generate Invoice
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Log Entry
          </Button>
        </div>
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