export interface Client {
  id: number;
  name: string;
  email: string;
  items: number;
  status: "Active" | "Inactive";
  itemLogs?: ItemLog[];
}

export interface Item {
  id: number;
  name: string;
  quantity: number;
  rate: number;
  status: "Processing" | "Ready" | "Delivered";
  dateReceived: string;
}

export interface ItemLog {
  id: number;
  date: string;
  items: Item[];
  status: "completed" | "pending" | "cancelled";
}

export interface Invoice {
  id: number;
  clientName: string;
  month: string;
  totalAmount: number;
  status: "Paid" | "Pending";
  generatedDate: string;
  paidDate: string | null;
}