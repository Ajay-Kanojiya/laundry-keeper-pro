import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package2 } from "lucide-react";
import { Client } from "@/types";

interface ClientListProps {
  paginatedData: Client[];
  onClientSelect: (client: Client) => void;
}

export function ClientList({ paginatedData, onClientSelect }: ClientListProps) {
  return (
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
              onClick={() => onClientSelect(client)}
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
  );
}