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
        <Button className="bg-[#9b87f5] hover:bg-[#7E69AB]">
          <Plus className="w-4 h-4 mr-2" />
          Add Log Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Log Entry</DialogTitle>
          <DialogDescription>
            Enter the details for the new log entry.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item">Item</Label>
              <Input id="item" placeholder="Enter item name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" placeholder="Enter quantity" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Rate</Label>
              <Input id="rate" type="number" step="0.01" placeholder="Enter rate" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-[#9b87f5] hover:bg-[#7E69AB]">
              Add Log Entry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}