import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, DollarSign, Package2 } from "lucide-react";
import { ItemLog } from "@/types";

interface LogTableProps {
  paginatedData: ItemLog[];
  calculateTotal: (items: any[]) => number;
}

export function LogTable({ paginatedData, calculateTotal }: LogTableProps) {
  return (
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
  );
}