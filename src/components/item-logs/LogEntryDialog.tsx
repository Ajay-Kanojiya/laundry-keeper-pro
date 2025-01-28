import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface LogEntryDialogProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function LogEntryDialog({ onSubmit }: LogEntryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-portal-primary hover:bg-portal-primary/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Log Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-portal-secondary">Add New Log Entry</DialogTitle>
          <DialogDescription className="text-sm text-portal-neutral">
            Enter the details for the new log entry.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-portal-secondary">Date</Label>
              <Input 
                id="date" 
                type="date" 
                className="border-portal-border focus:border-portal-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item" className="text-sm font-medium text-portal-secondary">Item</Label>
              <Input 
                id="item" 
                placeholder="Enter item name"
                className="border-portal-border focus:border-portal-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-medium text-portal-secondary">Quantity</Label>
              <Input 
                id="quantity" 
                type="number" 
                placeholder="Enter quantity"
                className="border-portal-border focus:border-portal-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate" className="text-sm font-medium text-portal-secondary">Rate</Label>
              <Input 
                id="rate" 
                type="number" 
                step="0.01" 
                placeholder="Enter rate"
                className="border-portal-border focus:border-portal-primary"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-portal-primary hover:bg-portal-primary/90 text-white"
            >
              Add Log Entry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}