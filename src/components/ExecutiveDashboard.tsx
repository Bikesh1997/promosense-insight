import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, AlertTriangle, Filter, Calendar } from 'lucide-react';

const ExecutiveDashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedTimeline, setSelectedTimeline] = useState('current-quarter');

  const productOptions = [
    { value: 'all', label: 'All Products' },
    { value: 'alle', label: 'Allē' },
    { value: 'refer-friend', label: 'Refer-a-Friend' },
    { value: 'branded', label: 'Branded' },
    { value: 'multi-service', label: 'Multi-service' },
    { value: 'gift', label: 'Gift' },
    { value: 'influencer', label: 'Influencer/User' },
    { value: 'practice', label: 'Practice' },
    { value: 'educational', label: 'Educational' }
  ];

  const timelineOptions = [
    { value: 'current-quarter', label: 'Current Quarter' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'custom-range', label: 'Custom Range' }
  ];

  const executiveMetrics = {
    totalROI: 468,
    totalRevenue: 47200000,
    newPatients: 8540,
    conversionRate: 12.3,
    churnRisk: 18,
    avgTreatmentValue: 720
  };

  const regionalPerformance = [
    { region: "Northeast", revenue: 12800000, roi: 520, patients: 2400, risk: 15 },
    { region: "Southeast", revenue: 9600000, roi: 445, patients: 1980, risk: 12 },
    { region: "West Coast", revenue: 14200000, roi: 485, patients: 2650, risk: 20 },
    { region: "Midwest", revenue: 6800000, roi: 380, patients: 1240, risk: 25 },
    { region: "Southwest", revenue: 8200000, roi: 425, patients: 1680, risk: 22 }
  ];

  const campaignSummary = [
    { campaign: "Allē Loyalty Rewards", spend: 2100000, revenue: 18500000, roi: 780 },
    { campaign: "Refer-a-Friend", spend: 890000, revenue: 8900000, roi: 900 },
    { campaign: "Gift Card BOGO", spend: 1200000, revenue: 6800000, roi: 467 },
    { campaign: "Multi-Service Bonus", spend: 750000, revenue: 4200000, roi: 460 },
    { campaign: "Branded Events", spend: 1800000, revenue: 8800000, roi: 389 }
  ];

  const alerts = [
    { type: "warning", message: "Midwest region ROI below target by 15%", severity: "medium" },
    { type: "error", message: "West Coast churn risk elevated to 20%", severity: "high" },
    { type: "info", message: "Allē Loyalty program exceeds Q3 targets", severity: "low" }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Executive Dashboard</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Strategic overview of promotion effectiveness and business performance</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent>
                {productOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedTimeline} onValueChange={setSelectedTimeline}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Select Timeline" />
              </SelectTrigger>
              <SelectContent>
                {timelineOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Total ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-success">{executiveMetrics.totalROI}%</div>
            <p className="text-xs text-muted-foreground">vs 420% target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">${(executiveMetrics.totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">+18% vs Q2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              New Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{executiveMetrics.newPatients.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+22% growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{executiveMetrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Industry avg: 8.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center">
              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Churn Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-destructive">{executiveMetrics.churnRisk}%</div>
            <p className="text-xs text-muted-foreground">Target: &lt;15%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium">Avg Treatment Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">${executiveMetrics.avgTreatmentValue}</div>
            <p className="text-xs text-muted-foreground">+12% uplift</p>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Regional Performance Analysis</CardTitle>
          <CardDescription>Revenue, ROI, and risk metrics by geographic region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {regionalPerformance.map((region) => (
              <div key={region.region} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 space-y-2 sm:space-y-0">
                    <h4 className="font-medium text-sm sm:text-base">{region.region}</h4>
                    <div className="flex flex-wrap items-center gap-2 sm:space-x-3">
                      <Badge variant={region.roi > 450 ? "default" : region.roi > 400 ? "secondary" : "destructive"} className="text-xs">
                        {region.roi}% ROI
                      </Badge>
                      <Badge variant={region.risk < 20 ? "default" : "destructive"} className="text-xs">
                        {region.risk}% Risk
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-muted-foreground">Revenue: </span>
                      <span className="font-medium">${(region.revenue / 1000000).toFixed(1)}M</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Patients: </span>
                      <span className="font-medium">{region.patients.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg Value: </span>
                      <span className="font-medium">${Math.round(region.revenue / region.patients)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Performance & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Campaign Performance Summary</CardTitle>
            <CardDescription>ROI and spend analysis for active campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {campaignSummary.map((campaign) => (
                <div key={campaign.campaign} className="space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="font-medium text-xs sm:text-sm">{campaign.campaign}</span>
                    <Badge variant={campaign.roi > 600 ? "default" : campaign.roi > 450 ? "secondary" : "destructive"} className="text-xs">
                      {campaign.roi}% ROI
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between text-xs text-muted-foreground gap-1 sm:gap-0">
                    <span>Spend: ${(campaign.spend / 1000000).toFixed(1)}M</span>
                    <span>Revenue: ${(campaign.revenue / 1000000).toFixed(1)}M</span>
                  </div>
                  <Progress value={Math.min(campaign.roi / 10, 100)} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Strategic Alerts</CardTitle>
            <CardDescription>Critical issues requiring executive attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  alert.severity === 'high' ? 'bg-destructive/5 border-destructive' :
                  alert.severity === 'medium' ? 'bg-secondary/5 border-secondary' :
                  'bg-muted/5 border-muted'
                }`}>
                  <div className="flex items-start space-x-2">
                    {alert.severity === 'high' && <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />}
                    {alert.severity === 'medium' && <TrendingDown className="h-4 w-4 text-secondary-foreground mt-0.5 flex-shrink-0" />}
                    {alert.severity === 'low' && <TrendingUp className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium">{alert.message}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {alert.severity.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;