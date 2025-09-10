import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, AlertTriangle } from 'lucide-react';

const ExecutiveDashboard = () => {
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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Executive Dashboard</h2>
        <p className="text-muted-foreground">Strategic overview of promotion effectiveness and business performance</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Total ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{executiveMetrics.totalROI}%</div>
            <p className="text-xs text-muted-foreground">vs 420% target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(executiveMetrics.totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">+18% vs Q2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2" />
              New Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{executiveMetrics.newPatients.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+22% growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{executiveMetrics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Industry avg: 8.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Churn Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{executiveMetrics.churnRisk}%</div>
            <p className="text-xs text-muted-foreground">Target: &lt;15%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Treatment Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${executiveMetrics.avgTreatmentValue}</div>
            <p className="text-xs text-muted-foreground">+12% uplift</p>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Performance Analysis</CardTitle>
          <CardDescription>Revenue, ROI, and risk metrics by geographic region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regionalPerformance.map((region) => (
              <div key={region.region} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{region.region}</h4>
                    <div className="flex items-center space-x-3">
                      <Badge variant={region.roi > 450 ? "default" : region.roi > 400 ? "secondary" : "destructive"}>
                        {region.roi}% ROI
                      </Badge>
                      <Badge variant={region.risk < 20 ? "default" : "destructive"}>
                        {region.risk}% Risk
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
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
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance Summary</CardTitle>
            <CardDescription>ROI and spend analysis for active campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignSummary.map((campaign) => (
                <div key={campaign.campaign} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{campaign.campaign}</span>
                    <Badge variant={campaign.roi > 600 ? "default" : campaign.roi > 450 ? "secondary" : "destructive"}>
                      {campaign.roi}% ROI
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
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
            <CardTitle>Strategic Alerts</CardTitle>
            <CardDescription>Critical issues requiring executive attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  alert.severity === 'high' ? 'bg-destructive/5 border-destructive' :
                  alert.severity === 'medium' ? 'bg-secondary/5 border-secondary' :
                  'bg-muted/5 border-muted'
                }`}>
                  <div className="flex items-start space-x-2">
                    {alert.severity === 'high' && <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />}
                    {alert.severity === 'medium' && <TrendingDown className="h-4 w-4 text-secondary-foreground mt-0.5" />}
                    {alert.severity === 'low' && <TrendingUp className="h-4 w-4 text-success mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
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