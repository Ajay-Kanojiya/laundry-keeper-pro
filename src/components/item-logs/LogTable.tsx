import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Package2, Calendar, DollarSign } from "lucide-react";
import { ItemLog } from "@/types";
import { useState } from "react";

interface LogTableProps {
  paginatedData: ItemLog[];
  calculateTotal: (items: any[]) => number;
}

export function LogTable({ paginatedData, calculateTotal }: LogTableProps) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const getStatusDisplay = (status: string | undefined) => {
    if (!status) return 'N/A';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusClass = (status: string | undefined) => {
    switch (status) {
      case 'completed':
        return 'bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]';
      case 'pending':
        return 'bg-[#FFF8F0] text-[#B93815] border border-[#FEDF89]';
      default:
        return 'bg-portal-neutral/10 text-portal-neutral border border-portal-neutral/20';
    }
  };

  const handleRowClick = (id: number) => {
    setSelectedRow(id === selectedRow ? null : id);
  };

  return (
    <div className="rounded-lg border border-portal-border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-portal-light hover:bg-portal-light">
            <TableHead className="text-sm font-semibold text-portal-secondary">Date</TableHead>
            <TableHead className="text-sm font-semibold text-portal-secondary">Items</TableHead>
            <TableHead className="text-sm font-semibold text-portal-secondary">Total Amount</TableHead>
            <TableHead className="text-sm font-semibold text-portal-secondary">Status</TableHead>
            <TableHead className="text-sm font-semibold text-portal-secondary text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((log) => (
            <TableRow 
              key={log.id} 
              className={`cursor-pointer transition-colors ${
                selectedRow === log.id 
                  ? 'bg-[#F5F8FF] border-l-4 border-l-[#1570EF]' 
                  : 'hover:bg-portal-light/50'
              }`}
              onClick={() => handleRowClick(log.id)}
            >
              <TableCell className="text-portal-secondary font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-portal-info" />
                  {log.date}
                </div>
              </TableCell>
              <TableCell>
                <ul className="space-y-1.5">
                  {(log.items || []).map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-portal-neutral">
                      <Package2 className="w-4 h-4 text-portal-primary" />
                      <span className="text-sm">
                        {item.name} x{item.quantity} (${item.rate.toFixed(2)} each)
                      </span>
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell className="text-portal-secondary font-medium">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-portal-success" />
                  <span className="text-sm">${calculateTotal(log.items || []).toFixed(2)}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(log.status)}`}>
                  {getStatusDisplay(log.status)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-portal-light text-portal-neutral">
                  <FileText className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}