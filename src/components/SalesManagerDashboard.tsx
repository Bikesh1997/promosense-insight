import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingUp, Users, Target, Phone, Mail, Settings } from 'lucide-react';
import { toast } from 'sonner';

const SalesManagerDashboard = () => {
  const handleInvestigateClinic = (clinicName: string, leakage: number, stage: string) => {
    toast.success(`Investigation initiated for ${clinicName}`, {
      description: `Analyzing ${leakage}% leakage at stage: ${stage}. Detailed report will be generated with recommended actions.`
    });
  };

  const handleCallRep = (repName: string, clinic: string) => {
    toast.success(`Calling ${repName}`, {
      description: `Initiating call to discuss ${clinic} performance improvement strategies.`
    });
  };

  const handleMessageRep = (repName: string, clinic: string) => {
    toast.success(`Message sent to ${repName}`, {
      description: `Urgent performance improvement message sent regarding ${clinic}.`
    });
  };

  const handleOptimizeRep = (repName: string, conversion: number) => {
    toast.success(`Optimization plan activated for ${repName}`, {
      description: `Performance improvement plan created to boost ${conversion}% conversion rate with targeted training and support.`
    });
  };
  const regionalSummary = {
    northeast: { revenue: 4800000, patients: 1800, roi: 168, churnRisk: 22 },
    southeast: { revenue: 3200000, patients: 1200, roi: 152, churnRisk: 18 },
    midwest: { revenue: 2600000, patients: 900, roi: 129, churnRisk: 25 },
    westCoast: { revenue: 5600000, patients: 2100, roi: 190, churnRisk: 12 },
    southwest: { revenue: 3400000, patients: 1250, roi: 144, churnRisk: 20 }
  };

  const atRiskClinics = [
    { clinic: "ClearSkin Chicago", region: "Midwest", leakage: 72, stage: "Promo → Treatment", revenue: 145000, rep: "Michael Lee" },
    { clinic: "Rejuvenate Dallas", region: "Southwest", leakage: 68, stage: "Interest → Promo", revenue: 98000, rep: "Daniel Brooks" },
    { clinic: "Miami Glow", region: "Southeast", leakage: 65, stage: "Treatment → Repeat", revenue: 87000, rep: "John Carter" },
    { clinic: "Phoenix Beauty", region: "Southwest", leakage: 61, stage: "Exposed → Interest", revenue: 76000, rep: "Daniel Brooks" },
    { clinic: "Denver Aesthetics", region: "Midwest", leakage: 58, stage: "Promo → Treatment", revenue: 112000, rep: "Michael Lee" }
  ];

  const repPerformance = [
    { rep: "Alice Monroe", region: "Northeast", leadsAssigned: 120, conversion: 78, avgFollowUp: 1.2, hotLeads: 8 },
    { rep: "John Carter", region: "Southeast", leadsAssigned: 95, conversion: 65, avgFollowUp: 1.8, hotLeads: 5 },
    { rep: "Michael Lee", region: "Midwest", leadsAssigned: 88, conversion: 52, avgFollowUp: 2.1, hotLeads: 3 },
    { rep: "Laura Smith", region: "West Coast", leadsAssigned: 130, conversion: 82, avgFollowUp: 1.1, hotLeads: 10 },
    { rep: "Daniel Brooks", region: "Southwest", leadsAssigned: 97, conversion: 58, avgFollowUp: 2.0, hotLeads: 4 }
  ];

  const aiSuggestions = [
    { clinic: "ClearSkin Chicago", risk: 72, action: "Offer bundle promotion", priority: "high" },
    { clinic: "Rejuvenate Dallas", risk: 78, action: "Assign top-performing rep", priority: "high" },
    { clinic: "Miami Glow", risk: 65, action: "Recommend rebate campaign", priority: "medium" },
    { clinic: "Phoenix Beauty", risk: 61, action: "Increase follow-up frequency", priority: "medium" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Sales Manager Dashboard</h2>
        <p className="text-muted-foreground">Regional performance analysis, rep productivity, and actionable insights</p>
      </div>

      {/* Regional Summary Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        {Object.entries(regionalSummary).map(([region, data]) => (
          <Card key={region}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm capitalize">{region.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-lg font-bold">${(data.revenue / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-muted-foreground">{data.patients} patients</div>
              <Badge variant={data.roi > 160 ? "default" : data.roi > 140 ? "secondary" : "destructive"} className="text-xs">
                {data.roi}% ROI
              </Badge>
              <div className="text-xs">
                <span className={data.churnRisk > 20 ? "text-destructive" : "text-muted-foreground"}>
                  {data.churnRisk}% churn risk
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* At-Risk Clinics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span>At-Risk Clinics</span>
          </CardTitle>
          <CardDescription>Clinics with high leakage rates requiring immediate attention</CardDescription>
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
                <TableHead>Assigned Rep</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atRiskClinics.map((clinic) => (
                <TableRow key={clinic.clinic}>
                  <TableCell className="font-medium">{clinic.clinic}</TableCell>
                  <TableCell>{clinic.region}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{clinic.leakage}%</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{clinic.stage}</TableCell>
                  <TableCell>${clinic.revenue.toLocaleString()}</TableCell>
                  <TableCell>{clinic.rep}</TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleInvestigateClinic(clinic.clinic, clinic.leakage, clinic.stage)}
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

      {/* Rep Performance & AI Suggestions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rep Performance Analysis</CardTitle>
            <CardDescription>Representative effectiveness by conversion metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rep Name</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Leads</TableHead>
                  <TableHead>Conversion %</TableHead>
                  <TableHead>Avg Follow-Up</TableHead>
                  <TableHead>Hot Leads</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repPerformance.map((rep) => (
                  <TableRow key={rep.rep}>
                    <TableCell className="font-medium">{rep.rep}</TableCell>
                    <TableCell>{rep.region}</TableCell>
                    <TableCell>{rep.leadsAssigned}</TableCell>
                    <TableCell>
                      <Badge variant={rep.conversion > 75 ? "default" : rep.conversion > 60 ? "secondary" : "destructive"}>
                        {rep.conversion}%
                      </Badge>
                    </TableCell>
                    <TableCell>{rep.avgFollowUp} days</TableCell>
                    <TableCell>
                      <Badge variant="outline">{rep.hotLeads}</Badge>
                    </TableCell>
                    <TableCell>
                      {rep.conversion < 70 && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleOptimizeRep(rep.rep, rep.conversion)}
                          title="Optimize Performance"
                        >
                          <Settings className="h-3 w-3" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Suggestions</CardTitle>
            <CardDescription>Recommended actions prioritized by urgency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  suggestion.priority === 'high' ? 'bg-destructive/5 border-destructive' : 'bg-secondary/5 border-secondary'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{suggestion.clinic}</span>
                        <Badge variant="destructive">{suggestion.risk}% risk</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{suggestion.action}</p>
                      <Badge variant={suggestion.priority === 'high' ? "destructive" : "secondary"} className="text-xs">
                        {suggestion.priority.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                    <div className="flex space-x-1 ml-4">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleCallRep(
                          suggestion.clinic === 'ClearSkin Chicago' ? 'Michael Lee' :
                          suggestion.clinic === 'Rejuvenate Dallas' ? 'Daniel Brooks' :
                          suggestion.clinic === 'Miami Glow' ? 'John Carter' : 'Daniel Brooks',
                          suggestion.clinic
                        )}
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleMessageRep(
                          suggestion.clinic === 'ClearSkin Chicago' ? 'Michael Lee' :
                          suggestion.clinic === 'Rejuvenate Dallas' ? 'Daniel Brooks' :
                          suggestion.clinic === 'Miami Glow' ? 'John Carter' : 'Daniel Brooks',
                          suggestion.clinic
                        )}
                      >
                        <Mail className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Drop-Off Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Funnel Drop-Offs (Last Month)</CardTitle>
          <CardDescription>Stage-wise conversion analysis by region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { region: "Northeast", stages: [5200, 3300, 2100, 1050] },
              { region: "Southeast", stages: [3400, 2000, 1200, 600] },
              { region: "Midwest", stages: [2600, 1500, 900, 450] },
              { region: "West Coast", stages: [6000, 3800, 2400, 1200] },
              { region: "Southwest", stages: [3200, 1900, 1100, 550] }
            ].map((region) => (
              <div key={region.region} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{region.region}</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((region.stages[3] / region.stages[0]) * 100)}% end-to-end conversion
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {region.stages.map((count, index) => (
                    <div key={index} className="text-center">
                      <div className="text-sm font-medium">{count.toLocaleString()}</div>
                      <div className="h-2 bg-muted rounded">
                        <div 
                          className="h-2 bg-primary rounded transition-all"
                          style={{ width: `${Math.max((count / region.stages[0]) * 100, 10)}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {['Leads', 'Promo', 'Treatment', 'Repeat'][index]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesManagerDashboard;