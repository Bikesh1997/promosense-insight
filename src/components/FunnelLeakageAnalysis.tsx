import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  TrendingDown, 
  TrendingUp, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  Target,
  PhoneCall,
  MessageSquare,
  CheckCircle,
  Clock,
  Eye,
  ArrowDown,
  Zap,
  Calendar,
  FileText,
  Settings
} from 'lucide-react';
import { ResponsiveContainer, FunnelChart, Funnel, LabelList, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { toast } from 'sonner';

const FunnelLeakageAnalysis = () => {
  const [activeView, setActiveView] = useState('executive');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedOffer, setSelectedOffer] = useState('all');
  const [drillDownOpen, setDrillDownOpen] = useState(false);
  const [investigateModalOpen, setInvestigateModalOpen] = useState(false);
  const [optimizeModalOpen, setOptimizeModalOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedRep, setSelectedRep] = useState(null);

  // Sample Data Model as specified
  const funnelData = {
    funnelStages: [
      { stage: "Leads Exposed", count: 10000, color: "#8884d8" },
      { stage: "Clinic Interest", count: 1400, color: "#82ca9d" },
      { stage: "Promo Accepted", count: 700, color: "#ffc658" },
      { stage: "First Treatment", count: 400, color: "#ff7300" },
      { stage: "Repeat Treatments", count: 150, color: "#00ff88" }
    ],
    regions: [
      { region: "West", exposed: 3000, interest: 400, accepted: 220, treated: 120, repeat: 50 },
      { region: "East", exposed: 4000, interest: 600, accepted: 300, treated: 180, repeat: 70 },
      { region: "South", exposed: 3000, interest: 400, accepted: 180, treated: 100, repeat: 30 }
    ],
    offers: [
      { offer: "Botox Rebate", exposed: 2000, interest: 280, accepted: 150, treated: 90, repeat: 40 },
      { offer: "Juvederm Bundle", exposed: 1500, interest: 220, accepted: 110, treated: 60, repeat: 25 },
      { offer: "CoolSculpting Promo", exposed: 2500, interest: 350, accepted: 200, treated: 130, repeat: 50 },
      { offer: "Holiday Special", exposed: 2000, interest: 290, accepted: 140, treated: 80, repeat: 35 }
    ],
    reps: [
      { rep: "Alice", patients: 120, leakageStage: "Exposed → Interest", conversion: 78, region: "West" },
      { rep: "Brian", patients: 90, leakageStage: "Promo → First Treatment", conversion: 65, region: "East" },
      { rep: "Chloe", patients: 70, leakageStage: "Repeat Retention", conversion: 52, region: "South" }
    ],
    financials: {
      avgTreatmentRevenue: 600,
      promoCostPerPatient: 100
    }
  };

  // Calculations as specified
  const calculateConversion = (current, previous) => {
    return previous > 0 ? Math.round((current / previous) * 100) : 0;
  };

  const calculateLeakage = (current, previous) => {
    return previous > 0 ? Math.round(((previous - current) / previous) * 100) : 0;
  };

  const calculateLostRevenue = (lost, avgRevenue) => {
    return lost * avgRevenue;
  };

  const calculateROI = (repeatPatients, avgRevenue, promoCost, totalAccepted) => {
    const revenue = repeatPatients * avgRevenue;
    const cost = promoCost * totalAccepted;
    return cost > 0 ? Math.round(((revenue - cost) / cost) * 100) : 0;
  };

  // Enhanced funnel data with calculations
  const enhancedFunnelData = funnelData.funnelStages.map((stage, index) => {
    const previousStage = index > 0 ? funnelData.funnelStages[index - 1] : null;
    const conversion = previousStage ? calculateConversion(stage.count, previousStage.count) : 100;
    const leakage = previousStage ? calculateLeakage(stage.count, previousStage.count) : 0;
    const lost = previousStage ? previousStage.count - stage.count : 0;
    const lostRevenue = calculateLostRevenue(lost, funnelData.financials.avgTreatmentRevenue);

    return {
      ...stage,
      conversion,
      leakage,
      lost,
      lostRevenue,
      fill: stage.color
    };
  });

  // Regional leakage heatmap data
  const regionalHeatmapData = funnelData.regions.map(region => {
    const exposedLeakage = calculateLeakage(region.interest, region.exposed);
    const interestLeakage = calculateLeakage(region.accepted, region.interest);
    const acceptedLeakage = calculateLeakage(region.treated, region.accepted);
    const treatedLeakage = calculateLeakage(region.repeat, region.treated);

    return {
      ...region,
      exposed_leakage: exposedLeakage,
      interest_leakage: interestLeakage,
      accepted_leakage: acceptedLeakage,
      treated_leakage: treatedLeakage
    };
  });

  // At-risk clinics (simulated data)
  const atRiskClinics = [
    { clinic: "Radiance Med Spa", region: "West", leakageRate: 72, stage: "Promo → Treatment", lostRevenue: 145000, riskLevel: "Critical" },
    { clinic: "Glow Aesthetics", region: "East", leakageRate: 68, stage: "Interest → Promo", lostRevenue: 98000, riskLevel: "High" },
    { clinic: "Beauty Central", region: "South", leakageRate: 65, stage: "Treatment → Repeat", lostRevenue: 87000, riskLevel: "High" },
    { clinic: "Elite Skin Care", region: "West", leakageRate: 61, stage: "Exposed → Interest", lostRevenue: 76000, riskLevel: "Medium" },
    { clinic: "Perfect Look Clinic", region: "East", leakageRate: 58, stage: "Promo → Treatment", lostRevenue: 112000, riskLevel: "Medium" }
  ];

  const handleDrillDown = (stage) => {
    setSelectedStage(stage);
    setDrillDownOpen(true);
  };

  const handleInvestigateClinic = (clinic) => {
    setSelectedClinic(clinic);
    setInvestigateModalOpen(true);
  };

  const handleOptimizeRep = (rep) => {
    setSelectedRep(rep);
    setOptimizeModalOpen(true);
  };

  const handleFollowUp = (repName) => {
    toast.success(`Follow-up initiated for ${repName}`);
  };

  const handleMarkContacted = (patient) => {
    toast.success(`${patient} marked as contacted`);
  };

  const handleEscalate = (issue) => {
    toast.success(`Issue escalated to manager: ${issue}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">PromoSense – Funnel Leakage Dashboard</h2>
            <p className="text-muted-foreground group cursor-pointer">
              <span className="group-hover:hidden">Patient journey analysis with leakage detection and revenue impact</span>
              <span className="hidden group-hover:inline">Patient Journey Analysis With Leakage Detection And Revenue Impact</span>
            </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="west">West</SelectItem>
              <SelectItem value="east">East</SelectItem>
              <SelectItem value="south">South</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedOffer} onValueChange={setSelectedOffer}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Offers</SelectItem>
              <SelectItem value="botox">Botox Rebate</SelectItem>
              <SelectItem value="juvederm">Juvederm Bundle</SelectItem>
              <SelectItem value="coolsculpting">CoolSculpting Promo</SelectItem>
              <SelectItem value="holiday">Holiday Special</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="executive">📊 Executive Dashboard</TabsTrigger>
          <TabsTrigger value="manager">📌 Manager Dashboard</TabsTrigger>
        </TabsList>

        {/* Executive Dashboard */}
        <TabsContent value="executive" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Total Leads Exposed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{funnelData.funnelStages[0].count.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Starting funnel volume</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  End-to-End Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {calculateConversion(funnelData.funnelStages[4].count, funnelData.funnelStages[0].count)}%
                </div>
                <p className="text-xs text-muted-foreground">Leads → Repeat patients</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Total Repeat Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{funnelData.funnelStages[4].count}</div>
                <p className="text-xs text-muted-foreground">Successful retention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-destructive" />
                  Lost Revenue due to Leakage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  ${(enhancedFunnelData.reduce((sum, stage) => sum + stage.lostRevenue, 0) / 1000000).toFixed(1)}M
                </div>
                <p className="text-xs text-muted-foreground">Revenue impact of leakage</p>
              </CardContent>
            </Card>
          </div>

          {/* Funnel Chart and Leakage Heatmap */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Funnel Chart</CardTitle>
                <CardDescription>Vertical funnel with stage counts, % conversion, and % leakage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enhancedFunnelData.map((stage, index) => (
                    <div 
                      key={stage.stage} 
                      className="cursor-pointer hover:bg-muted/50 p-3 rounded-lg border transition-colors"
                      onClick={() => handleDrillDown(stage)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{stage.stage}</h4>
                        <div className="flex items-center space-x-2">
                          {index > 0 && (
                            <>
                              <Badge variant={stage.leakage > 30 ? "destructive" : stage.leakage > 15 ? "secondary" : "default"}>
                                {stage.leakage}% leakage
                              </Badge>
                              <Badge variant="outline">
                                {stage.conversion}% conversion
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="text-lg font-bold" style={{ color: stage.color }}>
                            {stage.count.toLocaleString()}
                          </div>
                          {index > 0 && (
                            <div className="text-sm text-muted-foreground">
                              -{stage.lost.toLocaleString()} lost • ${(stage.lostRevenue / 1000).toFixed(0)}K revenue impact
                            </div>
                          )}
                        </div>
                        <div className="w-20">
                          <Progress 
                            value={(stage.count / funnelData.funnelStages[0].count) * 100} 
                            className="h-3"
                            style={{ backgroundColor: stage.leakage > 30 ? '#fee2e2' : undefined }}
                          />
                        </div>
                      </div>
                      {index < enhancedFunnelData.length - 1 && (
                        <div className="flex justify-center mt-2">
                          <ArrowDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leakage Heatmap (by Region)</CardTitle>
                <CardDescription>Color-coded matrix showing leakage per stage per region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-2 text-xs font-medium text-muted-foreground border-b pb-2">
                    <div>Region</div>
                    <div>Exposed → Interest</div>
                    <div>Interest → Accepted</div>
                    <div>Accepted → Treatment</div>
                    <div>Treatment → Repeat</div>
                  </div>
                  {regionalHeatmapData.map((region) => (
                    <div key={region.region} className="grid grid-cols-5 gap-2 items-center">
                      <div className="font-medium text-sm">{region.region}</div>
                      <div className={`text-center p-2 rounded text-white font-medium text-xs ${
                        region.exposed_leakage > 50 ? 'bg-red-500' : 
                        region.exposed_leakage > 30 ? 'bg-orange-400' : 'bg-green-500'
                      }`}>
                        {region.exposed_leakage}%
                      </div>
                      <div className={`text-center p-2 rounded text-white font-medium text-xs ${
                        region.interest_leakage > 50 ? 'bg-red-500' : 
                        region.interest_leakage > 30 ? 'bg-orange-400' : 'bg-green-500'
                      }`}>
                        {region.interest_leakage}%
                      </div>
                      <div className={`text-center p-2 rounded text-white font-medium text-xs ${
                        region.accepted_leakage > 50 ? 'bg-red-500' : 
                        region.accepted_leakage > 30 ? 'bg-orange-400' : 'bg-green-500'
                      }`}>
                        {region.accepted_leakage}%
                      </div>
                      <div className={`text-center p-2 rounded text-white font-medium text-xs ${
                        region.treated_leakage > 50 ? 'bg-red-500' : 
                        region.treated_leakage > 30 ? 'bg-orange-400' : 'bg-green-500'
                      }`}>
                        {region.treated_leakage}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Offer Breakdown Widget */}
          <Card>
            <CardHeader>
              <CardTitle>Offer Breakdown Widget</CardTitle>
              <CardDescription>Bar chart comparing conversion rates of different offer types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={funnelData.offers} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="offer" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="exposed" fill="#8884d8" name="Exposed" />
                  <Bar dataKey="treated" fill="#82ca9d" name="Treated" />
                  <Bar dataKey="repeat" fill="#ffc658" name="Repeat" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manager Dashboard */}
        <TabsContent value="manager" className="space-y-6">
          {/* Regional Funnel Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Regional Funnel Comparison</CardTitle>
              <CardDescription>Side-by-side funnels per region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {funnelData.regions.map((region) => (
                  <div key={region.region} className="space-y-3">
                    <h4 className="font-medium text-center">{region.region} Region</h4>
                    <div className="space-y-2">
                      {[
                        { label: 'Exposed', value: region.exposed, max: 4000 },
                        { label: 'Interest', value: region.interest, max: 600 },
                        { label: 'Accepted', value: region.accepted, max: 300 },
                        { label: 'Treated', value: region.treated, max: 180 },
                        { label: 'Repeat', value: region.repeat, max: 70 }
                      ].map((stage, index, array) => (
                        <div key={stage.label} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{stage.label}</span>
                            <span className="font-medium">{stage.value}</span>
                          </div>
                          <Progress value={(stage.value / stage.max) * 100} className="h-2" />
                          {index > 0 && (
                            <div className="text-xs text-muted-foreground">
                              {calculateConversion(stage.value, array[index - 1].value)}% conversion
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* At-Risk Clinics Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span>At-Risk Clinics Table</span>
              </CardTitle>
              <CardDescription>Top 10 clinics with highest leakage % (highlighted in red)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Clinic Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Leakage Rate</TableHead>
                    <TableHead>Problem Stage</TableHead>
                    <TableHead>Lost Revenue</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {atRiskClinics.map((clinic) => (
                    <TableRow key={clinic.clinic} className={clinic.riskLevel === 'Critical' ? 'bg-red-50' : ''}>
                      <TableCell className="font-medium">{clinic.clinic}</TableCell>
                      <TableCell>{clinic.region}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{clinic.leakageRate}%</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{clinic.stage}</TableCell>
                      <TableCell>${clinic.lostRevenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          clinic.riskLevel === 'Critical' ? 'destructive' : 
                          clinic.riskLevel === 'High' ? 'secondary' : 'outline'
                        }>
                          {clinic.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleInvestigateClinic(clinic)}
                        >
                          Investigate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Rep Contribution Chart & AI Insights Panel */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rep Contribution Chart</CardTitle>
                <CardDescription>Stacked bar → reps vs patients moved through leakage stages</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rep Name</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Patients</TableHead>
                      <TableHead>Conversion</TableHead>
                      <TableHead>Leakage Stage</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {funnelData.reps.map((rep) => (
                      <TableRow key={rep.rep}>
                        <TableCell className="font-medium">{rep.rep}</TableCell>
                        <TableCell>{rep.region}</TableCell>
                        <TableCell>{rep.patients}</TableCell>
                        <TableCell>
                          <Badge variant={rep.conversion > 70 ? "default" : rep.conversion > 60 ? "secondary" : "destructive"}>
                            {rep.conversion}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{rep.leakageStage}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleOptimizeRep(rep)}
                          >
                            <Settings className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>AI Insights Panel</span>
                </CardTitle>
                <CardDescription>Text-based suggestions for improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
                    <h4 className="font-medium text-orange-800">West region leaks 50% at Promo → First Treatment</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      Suggest stronger rep follow-up within 48 hours. Consider implementing automated reminder system.
                    </p>
                    <Button size="sm" className="mt-2" onClick={() => toast.success('Follow-up protocol activated for West region')}>
                      Implement
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <h4 className="font-medium text-blue-800">East region shows best retention rates</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      18% better repeat patient conversion. Share Alice's best practices with other regions.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2" onClick={() => toast.success('Best practices shared')}>
                      Share Practices
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                    <h4 className="font-medium text-green-800">Botox Rebate performing above average</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Consider expanding budget allocation by 25% for this high-performing offer.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2" onClick={() => toast.success('Budget reallocation recommended')}>
                      Review Budget
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

      </Tabs>

      {/* Drill-down Modal */}
      <Dialog open={drillDownOpen} onOpenChange={setDrillDownOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Stage Breakdown: {selectedStage?.stage}</DialogTitle>
          </DialogHeader>
          {selectedStage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded">
                  <div className="text-sm text-muted-foreground">Patient Count</div>
                  <div className="text-xl font-bold">{selectedStage.count.toLocaleString()}</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="text-sm text-muted-foreground">Conversion Rate</div>
                  <div className="text-xl font-bold">{selectedStage.conversion}%</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="text-sm text-muted-foreground">Patients Lost</div>
                  <div className="text-xl font-bold text-destructive">{selectedStage.lost?.toLocaleString() || 0}</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="text-sm text-muted-foreground">Revenue Impact</div>
                  <div className="text-xl font-bold text-destructive">${(selectedStage.lostRevenue / 1000).toFixed(0)}K</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Regional Breakdown:</h4>
                {funnelData.regions.map((region) => (
                  <div key={region.region} className="flex justify-between items-center p-2 border rounded">
                    <span>{region.region}</span>
                    <span className="font-medium">{region.exposed}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Offer Breakdown:</h4>
                {funnelData.offers.map((offer) => (
                  <div key={offer.offer} className="flex justify-between items-center p-2 border rounded">
                    <span>{offer.offer}</span>
                    <span className="font-medium">{offer.exposed}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => setDrillDownOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Investigate Clinic Modal */}
      <Dialog open={investigateModalOpen} onOpenChange={setInvestigateModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Investigate: {selectedClinic?.clinic}</DialogTitle>
          </DialogHeader>
          {selectedClinic && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded">
                  <div className="text-sm text-muted-foreground">Leakage Rate</div>
                  <div className="text-xl font-bold text-destructive">{selectedClinic.leakageRate}%</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="text-sm text-muted-foreground">Problem Stage</div>
                  <div className="font-medium">{selectedClinic.stage}</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="text-sm text-muted-foreground">Lost Revenue</div>
                  <div className="font-bold text-destructive">${selectedClinic.lostRevenue.toLocaleString()}</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="text-sm text-muted-foreground">Risk Level</div>
                  <div className="font-medium">{selectedClinic.riskLevel}</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Investigation Findings:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Patient follow-up rate 35% below target</li>
                  <li>• Average response time: 6.2 hours (target: 2 hours)</li>
                  <li>• Staff training on promo benefits needed</li>
                  <li>• CRM system not being utilized effectively</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Recommended Actions:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Staff training session</span>
                    <Button size="sm" variant="outline">Schedule</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">CRM optimization</span>
                    <Button size="sm" variant="outline">Initiate</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Follow-up protocol review</span>
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setInvestigateModalOpen(false)}>Close</Button>
                <Button onClick={() => {
                  toast.success(`Investigation report generated for ${selectedClinic.clinic}`);
                  setInvestigateModalOpen(false);
                }}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Optimize Rep Modal */}
      <Dialog open={optimizeModalOpen} onOpenChange={setOptimizeModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Optimize Performance: {selectedRep?.rep}</DialogTitle>
          </DialogHeader>
          {selectedRep && (
            <div className="space-y-4">
              <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                <div className="text-sm font-medium">Current Performance: {selectedRep.conversion}%</div>
                <div className="text-sm text-muted-foreground">Main leakage: {selectedRep.leakageStage}</div>
                <div className="text-sm text-muted-foreground">Patients handled: {selectedRep.patients}</div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Performance Analysis:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Follow-up timing needs improvement (avg 3.2 days vs target 1 day)</li>
                  <li>• Product knowledge assessment required</li>
                  <li>• Objection handling skills to develop</li>
                  <li>• CRM usage optimization needed</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Optimization Plan:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">1-on-1 Coaching Session</span>
                    <Button size="sm" variant="outline">Schedule</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Product Training Module</span>
                    <Button size="sm" variant="outline">Assign</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">Shadow Top Performer</span>
                    <Button size="sm" variant="outline">Arrange</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">CRM Training</span>
                    <Button size="sm" variant="outline">Enroll</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setOptimizeModalOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                  toast.success(`Optimization plan activated for ${selectedRep.rep}`);
                  setOptimizeModalOpen(false);
                }}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Activate Plan
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FunnelLeakageAnalysis;