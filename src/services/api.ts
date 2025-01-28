import { Client, Invoice, Item, ItemLog } from "@/types";

const API_BASE_URL = "https://api.example.com"; // Replace with your actual API URL

// Helper function for API calls
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Client APIs
export const clientApi = {
  getClients: () => fetchApi<Client[]>("/clients"),
  getClient: (id: number) => fetchApi<Client>(`/clients/${id}`),
  createClient: (data: Omit<Client, "id">) =>
    fetchApi<Client>("/clients", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateClient: (id: number, data: Partial<Client>) =>
    fetchApi<Client>(`/clients/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteClient: (id: number) =>
    fetchApi<void>(`/clients/${id}`, {
      method: "DELETE",
    }),
};

// Item APIs
export const itemApi = {
  getItems: (clientId: number) => fetchApi<Item[]>(`/clients/${clientId}/items`),
  createItem: (clientId: number, data: Omit<Item, "id">) =>
    fetchApi<Item>(`/clients/${clientId}/items`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateItem: (clientId: number, itemId: number, data: Partial<Item>) =>
    fetchApi<Item>(`/clients/${clientId}/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteItem: (clientId: number, itemId: number) =>
    fetchApi<void>(`/clients/${clientId}/items/${itemId}`, {
      method: "DELETE",
    }),
};

// Item Logs APIs
export const itemLogApi = {
  getLogs: () => fetchApi<ItemLog[]>("/item-logs"),
  getClientLogs: (clientId: number) =>
    fetchApi<ItemLog[]>(`/clients/${clientId}/logs`),
  createLog: (data: Omit<ItemLog, "id">) =>
    fetchApi<ItemLog>("/item-logs", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Invoice APIs
export const invoiceApi = {
  getInvoices: () => fetchApi<Invoice[]>("/invoices"),
  getInvoice: (id: number) => fetchApi<Invoice>(`/invoices/${id}`),
  updateInvoiceStatus: (id: number, status: Invoice["status"]) =>
    fetchApi<Invoice>(`/invoices/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  generateInvoice: (clientId: number, month: string) =>
    fetchApi<Invoice>("/invoices/generate", {
      method: "POST",
      body: JSON.stringify({ clientId, month }),
    }),
};

// Mock data for development
export const mockApi = {
  clients: [
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com", 
      items: 12, 
      status: "Active" as const
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@example.com", 
      items: 8, 
      status: "Active" as const
    },
    { 
      id: 3, 
      name: "Bob Johnson", 
      email: "bob@example.com", 
      items: 5, 
      status: "Inactive" as const
    },
  ],

  items: {
    1: [
      { 
        id: 1, 
        item: "T-Shirt", 
        quantity: 3,
        rate: 5.00,
        status: "Processing" as const, 
        dateReceived: "2024-02-20" 
      },
      { 
        id: 2, 
        item: "Pants", 
        quantity: 2,
        rate: 7.50,
        status: "Ready" as const, 
        dateReceived: "2024-02-19" 
      },
    ],
  },

  invoices: [
    {
      id: 1,
      clientName: "John Doe",
      month: "March 2024",
      totalAmount: 45.50,
      status: "Paid" as const,
      generatedDate: "2024-03-31",
      paidDate: "2024-04-02"
    },
    {
      id: 2,
      clientName: "Jane Smith",
      month: "March 2024",
      totalAmount: 20.00,
      status: "Pending" as const,
      generatedDate: "2024-03-31",
      paidDate: null
    },
  ],
};