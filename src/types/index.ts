export interface Client {
  id: number;
  name: string;
  email: string;
  items: number;
  status: "Active" | "Inactive";
}

export interface Item {
  id: number;
  item: string;
  quantity: number;
  rate: number;
  status: "Processing" | "Ready" | "Delivered";
  dateReceived: string;
}

export interface ItemLog {
  id: number;
  date: string;
  items: Item[];
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