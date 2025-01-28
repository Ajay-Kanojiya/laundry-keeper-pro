import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, ArrowLeft, Calendar, Package2, DollarSign } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Types for our API data
interface Item {
  name: string;
  quantity: number;
  rate: number;
}

interface ItemLog {
  id: number;
  date: string;
  items: Item[];
}

interface Client {
  id: number;
  name: string;
  itemLogs: ItemLog[];
}

// Mock API function - replace with actual API call
const fetchClients = async (): Promise<Client[]> => {
  // Simulating API call
  return [
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
};

const ITEMS_PER_PAGE = 5;

export default function ItemLogs() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  // Query for fetching clients
  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
  });

  const handleBackClick = () => {
    setSelectedClient(null);
    setCurrentPage(1);
  };

  const handleAddLog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Log Entry Added",
      description: "New log entry has been successfully added.",
    });
  };

  const calculateTotal = (items: Item[]) => {
    return items.reduce((total, item) => total + (item.quantity * item.rate), 0);
  };

  // Pagination logic with safety checks
  const totalPages = selectedClient
    ? Math.ceil((selectedClient.itemLogs?.length || 0) / ITEMS_PER_PAGE)
    : Math.ceil((clients?.length || 0) / ITEMS_PER_PAGE);

  const paginatedData = selectedClient
    ? (selectedClient.itemLogs || []).slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : (clients || []).slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      );

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!selectedClient) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Select Client for Item Logging</h1>
        </div>

        <div className="rounded-md border overflow-x-auto bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Total Logs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((client) => (
                <TableRow 
                  key={client.id} 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedClient(client)}
                >
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package2 className="w-4 h-4 text-[#9b87f5]" />
                      {client.itemLogs.length}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBackClick}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-[#7E69AB]" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">{selectedClient?.name}'s Item Logs</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#9b87f5] hover:bg-[#7E69AB]">
              <Plus className="w-4 h-4 mr-2" />
              Add Log Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
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
                <Button type="submit" className="bg-[#9b87f5] hover:bg-[#7E69AB]">
                  Add Log Entry
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border overflow-x-auto bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#6E59A5]" />
                    {log.date}
                  </div>
                </TableCell>
                <TableCell>
                  <ul className="list-disc list-inside space-y-1">
                    {(log.items || []).map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Package2 className="w-4 h-4 text-[#9b87f5]" />
                        {item.name} x{item.quantity} (${item.rate.toFixed(2)} each)
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#7E69AB]" />
                    ${calculateTotal(log.items || []).toFixed(2)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}