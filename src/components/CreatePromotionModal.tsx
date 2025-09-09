import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface CreatePromotionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPromotionCreated: (promotion: any) => void;
}

const CreatePromotionModal = ({ open, onOpenChange, onPromotionCreated }: CreatePromotionModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    channel: "",
    region: "",
    budget: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.channel || !formData.region || !formData.budget) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
      });
      return;
    }

    const newPromotion = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      status: "active",
      channel: formData.channel,
      region: formData.region,
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: parseInt(formData.budget),
      spent: 0,
      leads: 0,
      conversions: 0,
      roi: 0,
      conversionRate: 0,
      cpa: 0,
      ltv: 0
    };

    onPromotionCreated(newPromotion);
    
    toast({
      title: "Promotion Created",
      description: `${formData.name} has been created successfully!`,
    });
    
    // Reset form
    setFormData({
      name: "",
      channel: "",
      region: "",
      budget: "",
      startDate: "",
      endDate: "",
      description: ""
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Promotion</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Promotion Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., Spring Botox Special"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="channel">Channel *</Label>
              <Select value={formData.channel} onValueChange={(value) => setFormData({...formData, channel: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Facebook Ads">Facebook Ads</SelectItem>
                  <SelectItem value="Google Ads">Google Ads</SelectItem>
                  <SelectItem value="Trade Test">Trade Test</SelectItem>
                  <SelectItem value="Ally App">Ally App</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="region">Region *</Label>
              <Select value={formData.region} onValueChange={(value) => setFormData({...formData, region: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="West Coast">West Coast</SelectItem>
                  <SelectItem value="East Coast">East Coast</SelectItem>
                  <SelectItem value="Midwest">Midwest</SelectItem>
                  <SelectItem value="South">South</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="budget">Budget ($) *</Label>
            <Input
              id="budget"
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              placeholder="50000"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Promotion details and terms..."
              rows={3}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Promotion
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePromotionModal;