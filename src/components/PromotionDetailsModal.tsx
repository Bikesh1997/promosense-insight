import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

interface PromotionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promotion: any;
}

const PromotionDetailsModal = ({ open, onOpenChange, promotion }: PromotionDetailsModalProps) => {
  if (!promotion) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{promotion.name} - Detailed Analytics</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">+{promotion.roi}%</div>
                  <div className="text-sm text-muted-foreground">Return on Investment</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{promotion.conversions}</div>
                  <div className="text-sm text-muted-foreground">Total Conversions</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Budget Progress</span>
                <span className="text-sm">${promotion.spent.toLocaleString()} / ${promotion.budget.toLocaleString()}</span>
              </div>
              <Progress value={(promotion.spent / promotion.budget) * 100} className="h-2" />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="font-semibold">{promotion.conversionRate}%</div>
                <div className="text-sm text-muted-foreground">Conversion Rate</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="font-semibold">${promotion.cpa.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Cost per Acquisition</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="font-semibold">${promotion.ltv.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Customer LTV</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Channel</div>
                <div className="text-muted-foreground">{promotion.channel}</div>
              </div>
              <div>
                <div className="font-medium">Region</div>
                <div className="text-muted-foreground">{promotion.region}</div>
              </div>
              <div>
                <div className="font-medium">Start Date</div>
                <div className="text-muted-foreground">{promotion.startDate}</div>
              </div>
              <div>
                <div className="font-medium">End Date</div>
                <div className="text-muted-foreground">{promotion.endDate}</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromotionDetailsModal;