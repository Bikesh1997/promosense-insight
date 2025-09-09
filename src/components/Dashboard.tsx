import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, DollarSign, Target, AlertTriangle } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const { toast } = useToast();

  const handleViewDetails = (promotionName: string) => {
    toast({
      title: "Promotion Details",
      description: `Opening detailed analytics for ${promotionName}...`,
    });
  };

  // Sample data for the dashboard
  const roiData = [
    { month: 'Jan', roi: 145, leads: 234, conversions: 89 },
    { month: 'Feb', roi: 158, leads: 267, conversions: 103 },
    { month: 'Mar', roi: 142, leads: 289, conversions: 121 },
    { month: 'Apr', roi: 167, leads: 312, conversions: 134 },
    { month: 'May', roi: 189, leads: 345, conversions: 156 },
    { month: 'Jun', roi: 201, leads: 378, conversions: 178 },
  ];

  const funnelData = [
    { stage: 'Leads', value: 1500, color: '#0ea5e9' },
    { stage: 'Qualified', value: 950, color: '#06b6d4' },
    { stage: 'Consultation', value: 620, color: '#10b981' },
    { stage: 'Treatment', value: 380, color: '#22c55e' },
    { stage: 'Repeat', value: 240, color: '#84cc16' },
  ];

  const promotionData = [
    { name: 'Botox Spring Special', roi: 234, status: 'active', leads: 156 },
    { name: 'Juvederm Bundle', roi: 189, status: 'active', leads: 134 },
    { name: 'New Patient Discount', roi: 145, status: 'paused', leads: 98 },
    { name: 'Loyalty Program', roi: 167, status: 'active', leads: 87 },
  ];

  const COLORS = ['#0ea5e9', '#06b6d4', '#10b981', '#22c55e', '#84cc16'];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total ROI</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+189%</div>
            <div className="flex items-center text-xs text-success">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,847</div>
            <div className="flex items-center text-xs text-success">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.3%</div>
            <div className="flex items-center text-xs text-destructive">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              -2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center text-xs text-warning">
              <AlertTriangle className="h-3 w-3 mr-1" />
              3 need attention
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ROI Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Promotion ROI Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="roi" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary)/0.1)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Funnel Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Acquisition Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={funnelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Active Promotions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Promotions Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {promotionData.map((promo, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-medium">{promo.name}</h4>
                    <p className="text-sm text-muted-foreground">{promo.leads} leads generated</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={promo.status === 'active' ? 'default' : 'secondary'}>
                    {promo.status}
                  </Badge>
                  <div className="text-right">
                    <div className="font-bold text-success">+{promo.roi}%</div>
                    <div className="text-sm text-muted-foreground">ROI</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(promo.name)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;