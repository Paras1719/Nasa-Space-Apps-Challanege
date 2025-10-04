import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface CreateAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateAlertDialog = ({ open, onOpenChange }: CreateAlertDialogProps) => {
  const [alertName, setAlertName] = useState("");
  const [pollutant, setPollutant] = useState("no2");
  const [threshold, setThreshold] = useState("100");
  const [location, setLocation] = useState("");

  const handleCreate = () => {
    if (!alertName || !location) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success(`Alert "${alertName}" created successfully!`);
    onOpenChange(false);
    
    // Reset form
    setAlertName("");
    setPollutant("no2");
    setThreshold("100");
    setLocation("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Air Quality Alert</DialogTitle>
          <DialogDescription>
            Set up custom alerts for specific pollutants and locations. You'll be notified when thresholds are exceeded.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Alert Name</Label>
            <Input
              id="name"
              placeholder="e.g., NYC High NO₂ Alert"
              value={alertName}
              onChange={(e) => setAlertName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pollutant">Pollutant</Label>
            <Select value={pollutant} onValueChange={setPollutant}>
              <SelectTrigger id="pollutant">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no2">Nitrogen Dioxide (NO₂)</SelectItem>
                <SelectItem value="o3">Ozone (O₃)</SelectItem>
                <SelectItem value="hcho">Formaldehyde (HCHO)</SelectItem>
                <SelectItem value="pm25">Particulate Matter (PM₂.₅)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="threshold">AQI Threshold</Label>
            <Input
              id="threshold"
              type="number"
              placeholder="100"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              You'll be alerted when AQI exceeds this value
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., New York, NY or coordinates"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create Alert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
