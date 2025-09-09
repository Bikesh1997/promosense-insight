import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

interface PatientDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: any;
}

const PatientDetailsModal = ({ open, onOpenChange, patient }: PatientDetailsModalProps) => {
  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{patient.name} - Patient Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">${patient.ltv?.toLocaleString() || '3,250'}</div>
                  <div className="text-sm text-muted-foreground">Lifetime Value</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{patient.visits || 8}</div>
                  <div className="text-sm text-muted-foreground">Total Visits</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Engagement Score</span>
                <span className="text-sm">{patient.engagement || 85}%</span>
              </div>
              <Progress value={patient.engagement || 85} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">First Visit</div>
                <div className="text-muted-foreground">{patient.firstVisit || 'March 2023'}</div>
              </div>
              <div>
                <div className="font-medium">Last Visit</div>
                <div className="text-muted-foreground">{patient.lastVisit || 'January 2024'}</div>
              </div>
              <div>
                <div className="font-medium">Preferred Treatments</div>
                <div className="text-muted-foreground">{patient.treatments || 'Botox, Juvederm'}</div>
              </div>
              <div>
                <div className="font-medium">Risk Level</div>
                <div className="text-muted-foreground">
                  <Badge variant={patient.risk === 'low' ? 'default' : patient.risk === 'medium' ? 'secondary' : 'destructive'}>
                    {patient.risk || 'Low'} Risk
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Recent Activity</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>• Botox treatment completed - Jan 15, 2024</div>
                <div>• Consultation for Juvederm - Dec 20, 2023</div>
                <div>• Missed appointment reminder sent - Nov 8, 2023</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsModal;