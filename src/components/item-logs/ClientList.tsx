import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package2, User } from "lucide-react";
import { Client } from "@/types";

interface ClientListProps {
  paginatedData: Client[];
  onClientSelect: (client: Client) => void;
}

export function ClientList({ paginatedData, onClientSelect }: ClientListProps) {
  return (
    <div className="rounded-md border border-portal-border overflow-x-auto bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-portal-light">
          <TableRow>
            <TableHead className="text-portal-neutral font-medium">Client Name</TableHead>
            <TableHead className="text-portal-neutral font-medium">Total Logs</TableHead>
            <TableHead className="text-portal-neutral font-medium">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((client) => (
            <TableRow 
              key={client.id} 
              className="cursor-pointer hover:bg-portal-light/50"
              onClick={() => onClientSelect(client)}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-portal-primary" />
                  <span className="font-medium text-portal-secondary">{client.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-portal-neutral">
                  <Package2 className="w-4 h-4 text-portal-info" />
                  {client.itemLogs?.length || 0}
                </div>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${client.status === 'Active' ? 'bg-portal-success/10 text-portal-success' :
                    'bg-portal-neutral/10 text-portal-neutral'
                  }`}>
                  {client.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}