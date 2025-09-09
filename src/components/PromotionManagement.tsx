import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, Target, AlertTriangle, Eye, Edit, Pause, Play } from "lucide-react";
import PromotionDetailsModal from "./PromotionDetailsModal";

const PromotionManagement = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const { toast } = useToast();

  const promotionData = [
    {
      id: 1,
      name: "Botox Spring Special - 20% Off",
      status: "active",
      channel: "Facebook Ads",
      region: "West Coast",
      startDate: "2024-03-01",
      endDate: "2024-04-30",
      budget: 50000,
      spent: 32000,
      leads: 1247,
      conversions: 312,
      roi: 234,
      conversionRate: 25.0,
      cpa: 102.56,
      ltv: 2850
    },
    {
      id: 2,
      name: "Juvederm Bundle - Buy 2 Get 1 Free",
      status: "active",
      channel: "Google Ads",
      region: "East Coast",
      startDate: "2024-02-15",
      endDate: "2024-05-15",
      budget: 75000,
      spent: 48000,
      leads: 892,
      conversions: 234,
      roi: 189,
      conversionRate: 26.2,
      cpa: 205.13,
      ltv: 3200
    },
    {
      id: 3,
      name: "New Patient Discount - 30% First Treatment",
      status: "paused",
      channel: "Trade Test",
      region: "Midwest",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      budget: 30000,
      spent: 28500,
      leads: 567,
      conversions: 142,
      roi: 145,
      conversionRate: 25.0,
      cpa: 200.70,
      ltv: 2650
    },
    {
      id: 4,
      name: "SkinMedica Loyalty Program",
      status: "active",
      channel: "Ally App",
      region: "South",
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      budget: 100000,
      spent: 25000,
      leads: 1024,
      conversions: 287,
      roi: 167,
      conversionRate: 28.0,
      cpa: 87.11,
      ltv: 2980
    }
  ];

  const [promotions, setPromotions] = useState(promotionData);
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleCreatePromotion = () => {
    toast({
      title: "Create New Promotion",
      description: "Opening promotion creation wizard...",
    });
  };

  const handleViewPromotion = (promotion: any) => {
    setSelectedPromotion(promotion);
    setDetailsOpen(true);
  };

  const handleEditPromotion = (id: number) => {
    toast({
      title: "Edit Promotion",
      description: `Opening edit mode for promotion ${id}...`,
    });
  };

  const handleTogglePromotion = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    setPromotions(prev => prev.map(promo => 
      promo.id === id ? { ...promo, status: newStatus } : promo
    ));
    toast({
      title: `Promotion ${newStatus === 'active' ? 'Activated' : 'Paused'}`,
      description: `Promotion ${id} has been ${newStatus === 'active' ? 'activated' : 'paused'}`,
    });
  };

  const handleApplyRecommendation = () => {
    toast({
      title: "Recommendation Applied",
      description: "Budget reallocation has been implemented successfully.",
    });
  };

  const handleReviewDetails = () => {
    toast({
      title: "Review Details",
      description: "Opening detailed analysis report...",
    });
  };

  const handleScaleCampaign = () => {
    toast({
      title: "Campaign Scaling",
      description: "Initiating campaign scaling process...",
    });
  };

  const channelPerformance = [
    { channel: "Facebook Ads", spend: 145000, leads: 2341, conversions: 587, roi: 198 },
    { channel: "Google Ads", spend: 128000, leads: 1876, conversions: 445, roi: 176 },
    { channel: "Trade Test", spend: 89000, leads: 1234, conversions: 298, roi: 156 },
    { channel: "Ally App", spend: 67000, leads: 1567, conversions: 412, roi: 189 }
  ];

  const roiTrend = [
    { month: 'Jan', facebook: 145, google: 158, tradeTest: 142, ally: 167 },
    { month: 'Feb', facebook: 158, google: 172, tradeTest: 156, ally: 178 },
    { month: 'Mar', facebook: 189, google: 165, tradeTest: 134, ally: 189 },
    { month: 'Apr', facebook: 234, google: 189, tradeTest: 145, ally: 167 },
    { month: 'May', facebook: 198, google: 176, tradeTest: 156, ally: 189 },
    { month: 'Jun', facebook: 212, google: 194, tradeTest: 167, ally: 201 }
  ];

  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
      case 'paused':
        return <Badge variant="secondary">Paused</Badge>;
      case 'ended':
        return <Badge variant="outline">Ended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredPromotions = promotions.filter(promo => {
    const regionMatch = selectedRegion === "all" || promo.region === selectedRegion;
    const channelMatch = selectedChannel === "all" || promo.channel === selectedChannel;
    return regionMatch && channelMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Promotion Management</h2>
          <p className="text-muted-foreground">Track and optimize promotion effectiveness across all channels</p>
        </div>
        <div className="flex space-x-4">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="West Coast">West Coast</SelectItem>
              <SelectItem value="East Coast">East Coast</SelectItem>
              <SelectItem value="Midwest">Midwest</SelectItem>
              <SelectItem value="South">South</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedChannel} onValueChange={setSelectedChannel}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="Facebook Ads">Facebook Ads</SelectItem>
              <SelectItem value="Google Ads">Google Ads</SelectItem>
              <SelectItem value="Trade Test">Trade Test</SelectItem>
              <SelectItem value="Ally App">Ally App</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleCreatePromotion}>Create New Promotion</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          <TabsTrigger value="channels">Channel Comparison</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Promotion Spend</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$429K</div>
                <div className="flex items-center text-xs text-success">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% vs last quarter
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Generated Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,730</div>
                <div className="flex items-center text-xs text-success">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18% vs last quarter
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">+189%</div>
                <div className="flex items-center text-xs text-warning">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -3% vs last quarter
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <div className="flex items-center text-xs text-warning">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  1 needs attention
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Promotions List */}
          <Card>
            <CardHeader>
              <CardTitle>Active Promotions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredPromotions.map((promo) => (
                  <div key={promo.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{promo.name}</h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <span>{promo.channel}</span>
                          <span>•</span>
                          <span>{promo.region}</span>
                          <span>•</span>
                          <span>{promo.startDate} to {promo.endDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(promo.status)}
                        <Button variant="ghost" size="sm" onClick={() => handleViewPromotion(promo)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditPromotion(promo.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleTogglePromotion(promo.id, promo.status)}>
                          {promo.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="font-semibold">${promo.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Spent</p>
                        <p className="font-semibold">${promo.spent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Leads</p>
                        <p className="font-semibold">{promo.leads.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversions</p>
                        <p className="font-semibold">{promo.conversions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ROI</p>
                        <p className="font-semibold text-success">+{promo.roi}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conv. Rate</p>
                        <p className="font-semibold">{promo.conversionRate}%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Budget Utilization</span>
                        <span>{Math.round((promo.spent / promo.budget) * 100)}%</span>
                      </div>
                      <Progress value={(promo.spent / promo.budget) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ROI Trend by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={roiTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="facebook" stroke="#0ea5e9" name="Facebook" />
                    <Line type="monotone" dataKey="google" stroke="#10b981" name="Google" />
                    <Line type="monotone" dataKey="tradeTest" stroke="#f59e0b" name="Trade Test" />
                    <Line type="monotone" dataKey="ally" stroke="#ef4444" name="Ally App" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={channelPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="roi" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels">
          <Card>
            <CardHeader>
              <CardTitle>Channel Comparison Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Channel</th>
                      <th className="text-right p-4">Total Spend</th>
                      <th className="text-right p-4">Leads</th>
                      <th className="text-right p-4">Conversions</th>
                      <th className="text-right p-4">ROI</th>
                      <th className="text-right p-4">CPA</th>
                      <th className="text-right p-4">Conv. Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelPerformance.map((channel, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-medium">{channel.channel}</td>
                        <td className="p-4 text-right">${channel.spend.toLocaleString()}</td>
                        <td className="p-4 text-right">{channel.leads.toLocaleString()}</td>
                        <td className="p-4 text-right">{channel.conversions}</td>
                        <td className="p-4 text-right text-success">+{channel.roi}%</td>
                        <td className="p-4 text-right">${(channel.spend / channel.conversions).toFixed(2)}</td>
                        <td className="p-4 text-right">{((channel.conversions / channel.leads) * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-2 h-2 bg-warning rounded-full mr-2"></div>
                  Optimization Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="font-medium text-warning">Budget Reallocation Recommended</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Facebook Ads showing 23% higher ROI than Google Ads. Consider reallocating $15K from Google to Facebook.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleApplyRecommendation}>Apply Recommendation</Button>
                </div>
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <h4 className="font-medium text-destructive">Underperforming Promotion</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    "New Patient Discount" has 18% lower conversion rate. Consider A/B testing the offer amount.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleReviewDetails}>Review Details</Button>
                </div>
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <h4 className="font-medium text-success">Scale Successful Campaign</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    "Botox Spring Special" performing 34% above target. Increase budget by $20K for maximum impact.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleScaleCampaign}>Scale Campaign</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  Predictive Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Q2 Performance Forecast</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on current trends, expect 12% increase in lead generation with 8% improvement in ROI.
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="text-success">↗ Projected Leads: 4,200+</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Optimal Launch Window</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Historical data suggests launching new promotions on Tuesday-Wednesday yields 15% higher engagement.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Seasonal Opportunity</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Summer aesthetic treatments typically see 28% uptick. Prepare targeted campaigns for May-July.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <PromotionDetailsModal 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen} 
        promotion={selectedPromotion} 
      />
    </div>
  );
};

export default PromotionManagement;