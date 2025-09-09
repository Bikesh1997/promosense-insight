import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { 
  Brain, Target, TrendingUp, DollarSign, Clock, 
  Users, AlertTriangle, CheckCircle, Calendar, MapPin 
} from "lucide-react";

interface RecommendationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recommendation: any;
}

const RecommendationDetailsModal = ({ open, onOpenChange, recommendation }: RecommendationDetailsModalProps) => {
  const { toast } = useToast();

  if (!recommendation) return null;

  const handleImplement = () => {
    toast({
      title: "Implementation Started",
      description: `${recommendation.title} is being implemented with full analytics tracking.`,
    });
    onOpenChange(false);
  };

  const handleSchedule = () => {
    toast({
      title: "Implementation Scheduled",
      description: `${recommendation.title} has been scheduled for next week with stakeholder notifications.`,
    });
    onOpenChange(false);
  };

  const mockData = {
    historicalPerformance: [
      { month: 'Jan', performance: 65, baseline: 60 },
      { month: 'Feb', performance: 68, baseline: 62 },
      { month: 'Mar', performance: 72, baseline: 64 },
      { month: 'Apr', performance: 75, baseline: 66 },
      { month: 'May', performance: 78, baseline: 68 },
      { month: 'Jun', performance: 82, baseline: 70 }
    ],
    impactBreakdown: [
      { category: 'Revenue', impact: 34500, percentage: 45 },
      { category: 'Efficiency', impact: 15200, percentage: 20 },
      { category: 'Retention', impact: 22100, percentage: 29 },
      { category: 'Acquisition', impact: 4600, percentage: 6 }
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Brain className="h-6 w-6 mr-2" />
            Recommendation Analysis: {recommendation.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-primary">{recommendation.confidence}%</p>
                <p className="text-sm text-muted-foreground">Confidence</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-success" />
                <p className="text-2xl font-bold text-success">{recommendation.impact}</p>
                <p className="text-sm text-muted-foreground">Expected Impact</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-warning" />
                <p className="text-2xl font-bold text-warning">
                  {recommendation.timeframe?.replace('_', ' ')?.charAt(0).toUpperCase() + recommendation.timeframe?.slice(1).replace('_', ' ')}
                </p>
                <p className="text-sm text-muted-foreground">Timeframe</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-info" />
                <p className="text-2xl font-bold text-info">847</p>
                <p className="text-sm text-muted-foreground">Affected Patients</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Detailed Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Current Situation</h4>
                    <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">AI Reasoning</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-success" />
                        <span>Historical data shows 23% improvement with similar adjustments</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-success" />
                        <span>Competitive analysis indicates market opportunity</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-success" />
                        <span>Seasonal trends support timing for implementation</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Risk Assessment</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Implementation Risk</span>
                        <Badge className="bg-success/10 text-success border-success/20">Low</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Financial Risk</span>
                        <Badge className="bg-warning/10 text-warning border-warning/20">Medium</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Timeline Risk</span>
                        <Badge className="bg-success/10 text-success border-success/20">Low</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  Impact Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={mockData.impactBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Impact']} />
                    <Bar dataKey="impact" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Historical Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="h-5 w-5 mr-2" />
                Historical Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockData.historicalPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="With Recommendation"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="baseline" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    name="Current Baseline"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Implementation Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium">Budget Reallocation</h4>
                    <p className="text-sm text-muted-foreground">Move $15,000 from Google Ads to Facebook Ads campaign</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium">Campaign Optimization</h4>
                    <p className="text-sm text-muted-foreground">Update targeting parameters and ad creative for better performance</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium">Performance Monitoring</h4>
                    <p className="text-sm text-muted-foreground">Track KPIs daily for first week, then weekly thereafter</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2 pt-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close Analysis
          </Button>
          <Button variant="outline" onClick={handleSchedule}>
            Schedule Implementation
          </Button>
          <Button onClick={handleImplement}>
            Implement Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationDetailsModal;