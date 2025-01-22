import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBag, FileText } from "lucide-react";

const stats = [
  {
    title: "Total Clients",
    value: "24",
    icon: Users,
    description: "Active clients this month",
  },
  {
    title: "Items in Process",
    value: "156",
    icon: ShoppingBag,
    description: "Currently being processed",
  },
  {
    title: "Pending Invoices",
    value: "12",
    icon: FileText,
    description: "Awaiting generation",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}