import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingDown, Users, MapPin, Target, AlertTriangle, Phone, Mail, Calendar } from 'lucide-react';

const FunnelLeakageAnalysis = () => {
  const [activeView, setActiveView] = useState('executive');
  const [selectedRegion, setSelectedRegion] = useState('all');
  
  const funnelData = {
    stages: [
      { stage: "Leads Exposed", count: 10000, conversion: 100, leakage: 0 },
      { stage: "Clinic Interest", count: 1400, conversion: 14, leakage: 86 },
      { stage: "Promo Accepted", count: 700, conversion: 7, leakage: 93 },
      { stage: "First Treatment", count: 400, conversion: 4, leakage: 96 },
      { stage: "Repeat Treatments", count: 150, conversion: 1.5, leakage: 98.5 }
    ],
    regions: [
      { region: "Northeast", exposed: 3000, interest: 400, accepted: 220, treated: 120, repeat: 50 },
      { region: "Southeast", exposed: 4000, interest: 600, accepted: 300, treated: 180, repeat: 70 },
      { region: "Midwest", exposed: 3000, interest: 400, accepted: 180, treated: 100, repeat: 30 },
      { region: "West Coast", exposed: 3000, interest: 420, accepted: 250, treated: 160, repeat: 65 },
      { region: "Southwest", exposed: 3000, interest: 380, accepted: 150, treated: 90, repeat: 25 }
    ],
    offers: [
      { offer: "Botox Rebate", exposed: 2000, interest: 280, accepted: 150, treated: 90, repeat: 40 },
      { offer: "Juvederm Bundle", exposed: 1500, interest: 220, accepted: 110, treated: 60, repeat: 25 },
      { offer: "Loyalty Points", exposed: 2500, interest: 350, accepted: 200, treated: 120, repeat: 50 },
      { offer: "Referral Bonus", exposed: 1800, interest: 240, accepted: 120, treated: 70, repeat: 30 },
      { offer: "BOGO Gift Cards", exposed: 2200, interest: 310, accepted: 120, treated: 60, repeat: 15 }
    ],
    reps: [
      { rep: "Alice Monroe", region: "Northeast", patients: 120, leakageStage: "Exposed → Interest", performance: 78 },
      { rep: "John Carter", region: "Southeast", patients: 90, leakageStage: "Promo → First Treatment", performance: 65 },
      { rep: "Michael Lee", region: "Midwest", patients: 70, leakageStage: "Repeat Retention", performance: 52 },
      { rep: "Laura Smith", region: "West Coast", patients: 135, leakageStage: "Interest → Promo", performance: 82 },
      { rep: "Daniel Brooks", region: "Southwest", patients: 85, leakageStage: "First → Repeat", performance: 58 }
    ],
    atRiskClinics: [
      { clinic: "ClearSkin Chicago", region: "Midwest", leakage: 72, stage: "Promo → Treatment", revenue: 145000 },
      { clinic: "Rejuvenate Dallas", region: "Southwest", leakage: 68, stage: "Interest → Promo", revenue: 98000 },
      { clinic: "Miami Glow", region: "Southeast", leakage: 65, stage: "Treatment → Repeat", revenue: 87000 },
      { clinic: "Phoenix Beauty", region: "Southwest", leakage: 61, stage: "Exposed → Interest", revenue: 76000 },
      { clinic: "Denver Aesthetics", region: "Midwest", leakage: 58, stage: "Promo → Treatment", revenue: 112000 }
    ]
  };

  const financials = {
    avgTreatmentRevenue: 600,
    promoCostPerPatient: 100,
    totalLostRevenue: (10000 - 150) * 600
  };

  const calculateConversion = (current: number, previous: number) => {
    return previous > 0 ? Math.round((current / previous) * 100) : 0;
  };

  const calculateLeakage = (current: number, previous: number) => {
    return previous > 0 ? Math.round(((previous - current) / previous) * 100) : 0;
  };

  const FunnelVisualization = ({ data }: { data: any[] }) => (
    <div className="space-y-4">
      {data.map((stage, index) => {
        const prevStage = index > 0 ? data[index - 1] : null;
        const conversionRate = prevStage ? calculateConversion(stage.count, prevStage.count) : 100;
        const leakageRate = prevStage ? calculateLeakage(stage.count, prevStage.count) : 0;
        
        return (
          <div key={stage.stage} className="relative">
            <div className="flex items-center space-x-4 p-4 bg-card border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{stage.stage}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{stage.count.toLocaleString()}</Badge>
                    {index > 0 && (
                      <>
                        <Badge variant={conversionRate > 50 ? "default" : conversionRate > 30 ? "secondary" : "destructive"}>
                          {conversionRate}% conversion
                        </Badge>
                        <Badge variant="destructive">{leakageRate}% leakage</Badge>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all" 
                    style={{ width: `${Math.max(stage.count / 10000 * 100, 5)}%` }}
                  />
                </div>
              </div>
            </div>
            {index < data.length - 1 && (
              <div className="flex justify-center mt-2 mb-2">
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Funnel Leakage Analysis</h2>
          <p className="text-muted-foreground">Patient journey analysis with leakage identification and revenue impact</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="northeast">Northeast</SelectItem>
              <SelectItem value="southeast">Southeast</SelectItem>
              <SelectItem value="midwest">Midwest</SelectItem>
              <SelectItem value="westcoast">West Coast</SelectItem>
              <SelectItem value="southwest">Southwest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="executive">Executive Dashboard</TabsTrigger>
          <TabsTrigger value="manager">Manager Dashboard</TabsTrigger>
          <TabsTrigger value="rep">Rep Mobile View</TabsTrigger>
        </TabsList>

        <TabsContent value="executive" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Leads Exposed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10,000</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">End-to-End Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">1.5%</div>
                <p className="text-xs text-muted-foreground">Leads to repeat treatments</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Repeat Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">150</div>
                <p className="text-xs text-muted-foreground">Successfully retained</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Lost Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">$5.9M</div>
                <p className="text-xs text-muted-foreground">Due to leakage</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Funnel */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Journey Funnel</CardTitle>
                <CardDescription>Click stages for detailed breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <FunnelVisualization data={funnelData.stages} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Leakage Heatmap</CardTitle>
                <CardDescription>Leakage % by stage and region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {funnelData.regions.map((region) => (
                    <div key={region.region} className="grid grid-cols-5 gap-2 text-sm">
                      <div className="font-medium">{region.region}</div>
                      <Badge variant={calculateLeakage(region.interest, region.exposed) < 20 ? "default" : "destructive"} className="text-xs">
                        {calculateLeakage(region.interest, region.exposed)}%
                      </Badge>
                      <Badge variant={calculateLeakage(region.accepted, region.interest) < 30 ? "default" : "destructive"} className="text-xs">
                        {calculateLeakage(region.accepted, region.interest)}%
                      </Badge>
                      <Badge variant={calculateLeakage(region.treated, region.accepted) < 40 ? "default" : "destructive"} className="text-xs">
                        {calculateLeakage(region.treated, region.accepted)}%
                      </Badge>
                      <Badge variant={calculateLeakage(region.repeat, region.treated) < 50 ? "default" : "destructive"} className="text-xs">
                        {calculateLeakage(region.repeat, region.treated)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manager" className="space-y-6">
          {/* At-Risk Clinics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span>At-Risk Clinics</span>
              </CardTitle>
              <CardDescription>Top clinics with highest leakage rates requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Clinic Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Leakage %</TableHead>
                    <TableHead>Problem Stage</TableHead>
                    <TableHead>Revenue Risk</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {funnelData.atRiskClinics.map((clinic) => (
                    <TableRow key={clinic.clinic}>
                      <TableCell className="font-medium">{clinic.clinic}</TableCell>
                      <TableCell>{clinic.region}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{clinic.leakage}%</Badge>
                      </TableCell>
                      <TableCell>{clinic.stage}</TableCell>
                      <TableCell>${clinic.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Investigate</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Rep Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Rep Performance Analysis</CardTitle>
              <CardDescription>Representative effectiveness by region and conversion stage</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rep Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Patients Handled</TableHead>
                    <TableHead>Main Leakage Stage</TableHead>
                    <TableHead>Performance Score</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {funnelData.reps.map((rep) => (
                    <TableRow key={rep.rep}>
                      <TableCell className="font-medium">{rep.rep}</TableCell>
                      <TableCell>{rep.region}</TableCell>
                      <TableCell>{rep.patients}</TableCell>
                      <TableCell>{rep.leakageStage}</TableCell>
                      <TableCell>
                        <Badge variant={rep.performance > 75 ? "default" : rep.performance > 60 ? "secondary" : "destructive"}>
                          {rep.performance}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          {rep.performance < 60 ? "Coach" : "Optimize"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rep" className="space-y-6">
          {/* Rep Mobile View */}
          <div className="grid gap-4 max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Pipeline Snapshot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Leads Assigned</span>
                    <Badge>45</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Promo Accepted</span>
                    <Badge variant="secondary">28</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Treatments Completed</span>
                    <Badge variant="secondary">18</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Repeat Patients</span>
                    <Badge variant="default">7</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Leakage Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg bg-destructive/5">
                    <p className="text-sm font-medium text-destructive">3 patients didn't book after accepting promo</p>
                    <p className="text-xs text-muted-foreground">Follow-up recommended within 24h</p>
                  </div>
                  <div className="p-3 border rounded-lg bg-warning/5">
                    <p className="text-sm font-medium text-warning">2 patients missed repeat appointments</p>
                    <p className="text-xs text-muted-foreground">Retention risk identified</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <Button size="sm" variant="outline" className="flex flex-col space-y-1 h-auto py-3">
                    <Phone className="h-4 w-4" />
                    <span className="text-xs">Follow Up</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex flex-col space-y-1 h-auto py-3">
                    <Mail className="h-4 w-4" />
                    <span className="text-xs">Send Email</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex flex-col space-y-1 h-auto py-3">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs">Schedule</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FunnelLeakageAnalysis;