import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList } from "recharts";
import { Users, TrendingUp, TrendingDown, Heart, AlertTriangle, Clock, DollarSign, Target } from "lucide-react";
import { useState } from "react";
import PatientDetailsModal from "./PatientDetailsModal";

const PatientAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6m");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { toast } = useToast();

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Patient analytics data is being prepared for download...",
    });
  };

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    setDetailsOpen(true);
  };

  const handleTimeframeChange = (value: string) => {
    setSelectedTimeframe(value);
    toast({
      title: "Timeframe Updated", 
      description: `Analytics updated for ${value} period.`,
    });
  };

  const handleActionPlan = (indicator: string) => {
    toast({
      title: "Action Plan Created",
      description: `Initiating action plan for ${indicator} risk indicator...`,
    });
  };

  const handleAssignToRep = () => {
    toast({
      title: "Assigned to Rep",
      description: "High-risk patients have been assigned to specialist representatives.",
    });
  };

  const handleLaunchCampaign = () => {
    toast({
      title: "Campaign Launched",
      description: "Re-engagement campaign has been initiated successfully.",
    });
  };

  const handleEnrollPatients = () => {
    toast({
      title: "Patients Enrolled",
      description: "89 patients have been enrolled in the loyalty program.",
    });
  };

  const handleViewDetails = (treatment: string) => {
    toast({
      title: "Treatment Details",
      description: `Opening detailed analytics for ${treatment} treatments...`,
    });
  };

  // Patient funnel data
  const funnelData = [
    { name: 'Leads Generated', value: 5247, fill: '#0ea5e9', percentage: 100, dropOff: 0 },
    { name: 'Qualified Leads', value: 3892, fill: '#06b6d4', percentage: 74.2, dropOff: 25.8 },
    { name: 'Consultation Booked', value: 2634, fill: '#10b981', percentage: 50.2, dropOff: 24.0 },
    { name: 'Consultation Attended', value: 2156, fill: '#22c55e', percentage: 41.1, dropOff: 9.1 },
    { name: 'Treatment Scheduled', value: 1589, fill: '#84cc16', percentage: 30.3, dropOff: 10.8 },
    { name: 'Treatment Completed', value: 1347, fill: '#65a30d', percentage: 25.7, dropOff: 4.6 },
    { name: 'Repeat Customer', value: 674, fill: '#4d7c0f', percentage: 12.8, dropOff: 12.9 }
  ];

  // Patient acquisition trends
  const acquisitionData = [
    { month: 'Jan', newPatients: 234, returning: 145, churnRisk: 23, ltv: 2850 },
    { month: 'Feb', newPatients: 267, returning: 178, churnRisk: 19, ltv: 2920 },
    { month: 'Mar', newPatients: 289, returning: 198, churnRisk: 21, ltv: 3100 },
    { month: 'Apr', newPatients: 312, returning: 234, churnRisk: 18, ltv: 3280 },
    { month: 'May', newPatients: 345, returning: 267, churnRisk: 16, ltv: 3450 },
    { month: 'Jun', newPatients: 378, returning: 289, churnRisk: 14, ltv: 3650 }
  ];

  // Patient segments
  const segments = [
    { name: "First-Time Patients", count: 1247, percentage: 42.3, avgLTV: 2850, churnRate: 28, growthRate: 12 },
    { name: "Returning Patients", count: 896, percentage: 30.4, avgLTV: 4200, churnRate: 15, growthRate: 8 },
    { name: "Loyalty Members", count: 534, percentage: 18.1, avgLTV: 5800, churnRate: 8, growthRate: 22 },
    { name: "High-Value Patients", count: 267, percentage: 9.2, avgLTV: 8900, churnRate: 5, growthRate: 35 }
  ];

  // Churn analysis
  const churnIndicators = [
    { indicator: "Missed Appointments", riskLevel: "high", count: 127, percentage: 23.4 },
    { indicator: "No Contact >90 Days", riskLevel: "high", count: 89, percentage: 16.4 },
    { indicator: "Declined Upsells", riskLevel: "medium", count: 156, percentage: 28.7 },
    { indicator: "Price Complaints", riskLevel: "medium", count: 67, percentage: 12.3 },
    { indicator: "Service Dissatisfaction", riskLevel: "high", count: 34, percentage: 6.3 }
  ];

  // Treatment preferences
  const treatmentData = [
    { treatment: "Botox", patients: 1567, revenue: 1234567, growth: 12, satisfaction: 4.7 },
    { treatment: "Juvederm", patients: 1234, revenue: 987654, growth: 8, satisfaction: 4.6 },
    { treatment: "SkinMedica", patients: 892, revenue: 567890, growth: 15, satisfaction: 4.5 },
    { treatment: "CoolSculpting", patients: 567, revenue: 789012, growth: -3, satisfaction: 4.3 },
    { treatment: "Diamond Glow", patients: 445, revenue: 345678, growth: 22, satisfaction: 4.8 }
  ];

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">High Risk</Badge>;
      case 'medium':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Medium Risk</Badge>;
      case 'low':
        return <Badge className="bg-success/10 text-success border-success/20">Low Risk</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Patient Analytics</h2>
          <p className="text-muted-foreground">Patient acquisition, retention, and lifetime value insights</p>
        </div>
        <div className="flex space-x-4">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedSegment} onValueChange={setSelectedSegment}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Patients</SelectItem>
              <SelectItem value="new">New Patients</SelectItem>
              <SelectItem value="returning">Returning</SelectItem>
              <SelectItem value="loyalty">Loyalty Members</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,944</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patient LTV</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,650</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73.2%</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Patients</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">187</div>
            <div className="flex items-center text-xs text-destructive">
              <TrendingDown className="h-3 w-3 mr-1" />
              14 need immediate attention
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="funnel" className="space-y-6">
        <TabsList>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="segments">Patient Segments</TabsTrigger>
          <TabsTrigger value="churn">Churn Analysis</TabsTrigger>
          <TabsTrigger value="treatments">Treatment Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="funnel">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Patient Acquisition Funnel</CardTitle>
                <p className="text-sm text-muted-foreground">Track conversion at each stage of the patient journey</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {funnelData.map((stage, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{stage.name}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-muted-foreground">{stage.value.toLocaleString()}</span>
                          <Badge variant="outline">{stage.percentage}%</Badge>
                        </div>
                      </div>
                      <Progress value={stage.percentage} className="h-3" style={{backgroundColor: stage.fill + '20'}} />
                      {index < funnelData.length - 1 && (
                        <div className="text-xs text-destructive mt-1">
                          -{stage.dropOff}% drop-off to next stage
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <h4 className="font-medium text-success">Strong Performance</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Lead to consultation conversion up 12% this quarter
                  </p>
                </div>
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="font-medium text-warning">Attention Needed</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    25.8% drop-off from leads to qualified - review qualification criteria
                  </p>
                </div>
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <h4 className="font-medium text-destructive">Critical Issue</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    12.9% of completed treatments don't return - improve follow-up
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segments">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Segments Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {segments.map((segment, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">{segment.name}</h4>
                        <Badge variant="outline">{segment.percentage}%</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Count</p>
                          <p className="font-semibold">{segment.count.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg LTV</p>
                          <p className="font-semibold">${segment.avgLTV.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Churn Rate</p>
                          <p className="font-semibold text-warning">{segment.churnRate}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Growth Rate</p>
                          <p className="font-semibold text-success">+{segment.growthRate}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Acquisition Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={acquisitionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="newPatients" 
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary)/0.1)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="returning" 
                      stackId="1"
                      stroke="hsl(var(--success))" 
                      fill="hsl(var(--success)/0.1)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="churn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Churn Risk Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {churnIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className={`h-4 w-4 ${
                          indicator.riskLevel === 'high' ? 'text-destructive' : 
                          indicator.riskLevel === 'medium' ? 'text-warning' : 'text-success'
                        }`} />
                        <div>
                          <p className="font-medium">{indicator.indicator}</p>
                          <p className="text-sm text-muted-foreground">{indicator.count} patients ({indicator.percentage}%)</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getRiskBadge(indicator.riskLevel)}
                        <Button variant="outline" size="sm" onClick={() => handleActionPlan(indicator.indicator)}>Action Plan</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn Prevention Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <h4 className="font-medium text-destructive">Immediate Action Required</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    14 high-value patients at immediate churn risk
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleAssignToRep}>Assign to Rep</Button>
                </div>
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="font-medium text-warning">Follow-up Campaign</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    127 patients with missed appointments need re-engagement
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleLaunchCampaign}>Launch Campaign</Button>
                </div>
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-medium text-primary">Retention Program</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    89 patients eligible for loyalty program enrollment
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleEnrollPatients}>Enroll Patients</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="treatments">
          <Card>
            <CardHeader>
              <CardTitle>Treatment Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Treatment</th>
                      <th className="text-right p-4">Patients</th>
                      <th className="text-right p-4">Revenue</th>
                      <th className="text-right p-4">Growth</th>
                      <th className="text-right p-4">Satisfaction</th>
                      <th className="text-right p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatmentData.map((treatment, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-medium">{treatment.treatment}</td>
                        <td className="p-4 text-right">{treatment.patients.toLocaleString()}</td>
                        <td className="p-4 text-right">${treatment.revenue.toLocaleString()}</td>
                        <td className={`p-4 text-right ${treatment.growth > 0 ? 'text-success' : 'text-destructive'}`}>
                          {treatment.growth > 0 ? '+' : ''}{treatment.growth}%
                        </td>
                        <td className="p-4 text-right">{treatment.satisfaction}/5.0</td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" onClick={() => handleViewPatient(treatment)}>View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <PatientDetailsModal 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen} 
        patient={selectedPatient} 
      />
    </div>
  );
};

export default PatientAnalytics;