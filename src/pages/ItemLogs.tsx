import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "@/services/api";
import { ClientList } from "@/components/item-logs/ClientList";
import { LogEntryDialog } from "@/components/item-logs/LogEntryDialog";
import { LogTable } from "@/components/item-logs/LogTable";
import { PaginationControls } from "@/components/item-logs/PaginationControls";
import { Client, Item, ItemLog } from "@/types";

const ITEMS_PER_PAGE = 5;

export default function ItemLogs() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

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
    : Math.ceil(clients.length / ITEMS_PER_PAGE);

  const paginatedData = selectedClient
    ? (selectedClient.itemLogs || []).slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ) as ItemLog[]
    : clients.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ) as Client[];

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!selectedClient) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">Select Client for Item Logging</h1>
        </div>

        <ClientList 
          paginatedData={paginatedData as Client[]} 
          onClientSelect={setSelectedClient} 
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
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
        <LogEntryDialog onSubmit={handleAddLog} />
      </div>

      <LogTable 
        paginatedData={paginatedData as ItemLog[]} 
        calculateTotal={calculateTotal}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}