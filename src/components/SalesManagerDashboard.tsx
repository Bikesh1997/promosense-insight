import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, TrendingUp, Users, Target, Phone, Mail, Settings, Search, Calendar, FileText } from 'lucide-react';
import { toast } from 'sonner';

const SalesManagerDashboard = () => {
  const [investigateModalOpen, setInvestigateModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [optimizeModalOpen, setOptimizeModalOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedRep, setSelectedRep] = useState(null);
  const [callNotes, setCallNotes] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [riskLevelFilter, setRiskLevelFilter] = useState('all');
  const [repFilter, setRepFilter] = useState('all');
  const [callStatus, setCallStatus] = useState('idle'); // idle, calling, connected, ended
  const [callDuration, setCallDuration] = useState(0);
  const [callAnalysis, setCallAnalysis] = useState({
    sentiment: 'neutral',
    keyTopics: [],
    actionItems: [],
    followUpRequired: false
  });

  const handleInvestigateClinic = (clinic) => {
    setSelectedClinic(clinic);
    setInvestigateModalOpen(true);
  };

  const handleCallRep = (repName: string, clinic: string) => {
    setSelectedRep({ name: repName, clinic });
    setCallStatus('idle');
    setCallDuration(0);
    setCallAnalysis({
      sentiment: 'neutral',
      keyTopics: [],
      actionItems: [],
      followUpRequired: false
    });
    setCallModalOpen(true);
  };

  const startCall = () => {
    setCallStatus('calling');
    // Simulate call progression
    setTimeout(() => {
      setCallStatus('connected');
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      
      // Simulate call analysis after 10 seconds
      setTimeout(() => {
        setCallAnalysis({
          sentiment: 'positive',
          keyTopics: ['campaign performance', 'client retention', 'Q4 goals'],
          actionItems: ['Schedule follow-up training', 'Review client portfolio', 'Update CRM notes'],
          followUpRequired: true
        });
      }, 10000);
      
      return () => clearInterval(interval);
    }, 3000);
  };

  const endCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      setCallModalOpen(false);
      setCallStatus('idle');
      setCallDuration(0);
      toast.success(`Call completed with ${selectedRep?.name}`);
    }, 2000);
  };

  const handleMessageRep = (repName: string, clinic: string) => {
    setSelectedRep({ name: repName, clinic });
    setMessageModalOpen(true);
  };

  const handleOptimizeRep = (repName: string, conversion: number) => {
    setSelectedRep({ name: repName, conversion });
    setOptimizeModalOpen(true);
  };

  const submitCall = () => {
    toast.success(`Call completed with ${selectedRep?.name}`);
    setCallModalOpen(false);
    setCallNotes('');
  };

  const submitMessage = () => {
    toast.success(`Message sent to ${selectedRep?.name}`);
    setMessageModalOpen(false);
    setMessageContent('');
  };

  const submitOptimization = () => {
    toast.success(`Optimization plan activated for ${selectedRep?.name}`);
    setOptimizeModalOpen(false);
  };

  // Data definitions
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

  // Filter data based on selected filters
  const filteredAtRiskClinics = atRiskClinics.filter(clinic => {
    const regionMatch = regionFilter === 'all' || clinic.region === regionFilter;
    const riskMatch = riskLevelFilter === 'all' || 
      (riskLevelFilter === 'critical' && clinic.leakage >= 70) ||
      (riskLevelFilter === 'high' && clinic.leakage >= 60 && clinic.leakage < 70) ||
      (riskLevelFilter === 'medium' && clinic.leakage < 60);
    const repMatch = repFilter === 'all' || clinic.rep === repFilter;
    return regionMatch && riskMatch && repMatch;
  });

  const filteredRepPerformance = repPerformance.filter(rep => {
    const regionMatch = regionFilter === 'all' || rep.region === regionFilter;
    const repMatch = repFilter === 'all' || rep.rep === repFilter;
    return regionMatch && repMatch;
  });

  // Get unique values for filter options
  const uniqueRegions = [...new Set(atRiskClinics.map(clinic => clinic.region))];
  const uniqueReps = [...new Set(atRiskClinics.map(clinic => clinic.rep))];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Sales Manager Dashboard</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Regional performance analysis, rep productivity, and actionable insights</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-40 bg-background">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="all">All Regions</SelectItem>
              {uniqueRegions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={riskLevelFilter} onValueChange={setRiskLevelFilter}>
            <SelectTrigger className="w-40 bg-background">
              <SelectValue placeholder="All Risk Levels" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="critical">Critical (70%+)</SelectItem>
              <SelectItem value="high">High (60-69%)</SelectItem>
              <SelectItem value="medium">Medium (&lt;60%)</SelectItem>
            </SelectContent>
          </Select>
          <Select value={repFilter} onValueChange={setRepFilter}>
            <SelectTrigger className="w-40 bg-background">
              <SelectValue placeholder="All Reps" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border z-50">
              <SelectItem value="all">All Reps</SelectItem>
              {uniqueReps.map(rep => (
                <SelectItem key={rep} value={rep}>{rep}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Results Summary */}
      {(regionFilter !== 'all' || riskLevelFilter !== 'all' || repFilter !== 'all') && (
        <Card className="bg-accent/10">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Showing {filteredAtRiskClinics.length} of {atRiskClinics.length} at-risk clinics
                {regionFilter !== 'all' && ` • Region: ${regionFilter}`}
                {riskLevelFilter !== 'all' && ` • Risk: ${riskLevelFilter}`}
                {repFilter !== 'all' && ` • Rep: ${repFilter}`}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setRegionFilter('all');
                  setRiskLevelFilter('all');
                  setRepFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Regional Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {Object.entries(regionalSummary).map(([region, data]) => (
          <Card key={region}>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm capitalize">{region.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-base sm:text-lg font-bold">${(data.revenue / 1000000).toFixed(1)}M</div>
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
          <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
            <span>At-Risk Clinics</span>
          </CardTitle>
          <CardDescription>Clinics with high leakage rates requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-3">
            {filteredAtRiskClinics.map((clinic) => (
              <div key={clinic.clinic} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{clinic.clinic}</h4>
                  <Badge variant="destructive" className="text-xs">{clinic.leakage}%</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Region: </span>
                    <span>{clinic.region}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Revenue Risk: </span>
                    <span>${clinic.revenue.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Problem: </span>
                    <span>{clinic.stage}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rep: </span>
                    <span>{clinic.rep}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleInvestigateClinic(clinic)}
                  className="w-full"
                >
                  Investigate
                </Button>
              </div>
            ))}
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
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
                {filteredAtRiskClinics.map((clinic) => (
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
                        onClick={() => handleInvestigateClinic(clinic)}
                      >
                        Investigate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Rep Performance & AI Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Rep Performance Analysis</CardTitle>
            <CardDescription>Representative effectiveness by conversion metrics</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-3">
              {filteredRepPerformance.map((rep) => (
                <div key={rep.rep} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{rep.rep}</h4>
                    <Badge variant={rep.conversion > 75 ? "default" : rep.conversion > 60 ? "secondary" : "destructive"} className="text-xs">
                      {rep.conversion}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Region: </span>
                      <span>{rep.region}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Leads: </span>
                      <span>{rep.leadsAssigned}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Follow-up: </span>
                      <span>{rep.avgFollowUp} days</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Hot Leads: </span>
                      <Badge variant="outline" className="text-xs">{rep.hotLeads}</Badge>
                    </div>
                  </div>
                  {rep.conversion < 70 && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleOptimizeRep(rep.rep, rep.conversion)}
                      className="w-full"
                    >
                      <Settings className="h-3 w-3 mr-2" />
                      Optimize Performance
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
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
                  {filteredRepPerformance.map((rep) => (
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">AI-Powered Suggestions</CardTitle>
            <CardDescription>Recommended actions prioritized by urgency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className={`p-3 sm:p-4 rounded-lg border ${
                  suggestion.priority === 'high' ? 'bg-destructive/5 border-destructive' : 'bg-secondary/5 border-secondary'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-3 sm:space-y-0">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-1">
                        <span className="font-medium text-sm">{suggestion.clinic}</span>
                        <Badge variant="destructive" className="text-xs w-fit">{suggestion.risk}% risk</Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2">{suggestion.action}</p>
                      <Badge variant={suggestion.priority === 'high' ? "destructive" : "secondary"} className="text-xs">
                        {suggestion.priority.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                    <div className="flex space-x-1 sm:ml-4">
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

      {/* Investigation Modal */}
      <Dialog open={investigateModalOpen} onOpenChange={setInvestigateModalOpen}>
        <DialogContent className="sm:max-w-lg mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Clinic Investigation: {selectedClinic?.clinic}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 border rounded">
                <div className="text-xs sm:text-sm text-muted-foreground">Leakage Rate</div>
                <div className="text-lg sm:text-xl font-bold text-destructive">{selectedClinic?.leakage}%</div>
              </div>
              <div className="p-3 border rounded">
                <div className="text-xs sm:text-sm text-muted-foreground">Revenue at Risk</div>
                <div className="text-lg sm:text-xl font-bold">${selectedClinic?.revenue?.toLocaleString()}</div>
              </div>
              <div className="p-3 border rounded">
                <div className="text-xs sm:text-sm text-muted-foreground">Problem Stage</div>
                <div className="text-sm font-medium">{selectedClinic?.stage}</div>
              </div>
              <div className="p-3 border rounded">
                <div className="text-xs sm:text-sm text-muted-foreground">Assigned Rep</div>
                <div className="text-sm font-medium">{selectedClinic?.rep}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Root Cause Analysis:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Delayed follow-up on promotional offers (avg 3.2 days)</li>
                <li>• Limited treatment availability during peak hours</li>
                <li>• Price sensitivity in local market segment</li>
                <li>• Competition offering aggressive pricing</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Recommended Actions:</h4>
              <ul className="text-sm space-y-1 text-success">
                <li>• Implement same-day follow-up protocol</li>
                <li>• Extend evening appointment slots</li>
                <li>• Deploy targeted pricing strategy</li>
                <li>• Increase rep visit frequency</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" onClick={() => setInvestigateModalOpen(false)} className="w-full sm:w-auto">Close</Button>
              <Button onClick={() => {
                toast.success('Investigation report generated and sent to stakeholders');
                setInvestigateModalOpen(false);
              }} className="w-full sm:w-auto">Generate Report</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Call Rep Modal - Enhanced with realistic calling interface */}
      <Dialog open={callModalOpen} onOpenChange={setCallModalOpen}>
        <DialogContent className="sm:max-w-lg mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Call {selectedRep?.name}</span>
            </DialogTitle>
          </DialogHeader>
          
          {callStatus === 'idle' && (
            <div className="space-y-4">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-lg">{selectedRep?.name}</div>
                  <div className="text-sm text-muted-foreground">Ready to call</div>
                  <div className="text-xs text-muted-foreground mt-1">Regarding: {selectedRep?.clinic}</div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-3">
                <Button variant="outline" onClick={() => setCallModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={startCall} className="bg-green-600 hover:bg-green-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Start Call
                </Button>
              </div>
            </div>
          )}

          {callStatus === 'calling' && (
            <div className="space-y-4">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center animate-pulse">
                  <Phone className="h-12 w-12 text-primary-foreground animate-bounce" />
                </div>
                <div>
                  <div className="font-medium text-lg">{selectedRep?.name}</div>
                  <div className="text-sm text-primary animate-pulse">Calling...</div>
                  <div className="text-xs text-muted-foreground">Please wait while we connect</div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button variant="destructive" onClick={() => {
                  setCallStatus('idle');
                  setCallModalOpen(false);
                }}>
                  Cancel Call
                </Button>
              </div>
            </div>
          )}

          {callStatus === 'connected' && (
            <div className="space-y-4">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-green-600 rounded-full flex items-center justify-center">
                  <Phone className="h-12 w-12 text-white" />
                </div>
                <div>
                  <div className="font-medium text-lg">{selectedRep?.name}</div>
                  <div className="text-sm text-green-600">Connected</div>
                  <div className="text-xs font-mono">{formatTime(callDuration)}</div>
                </div>
              </div>

              {/* Live Call Analysis */}
              {callAnalysis.sentiment !== 'neutral' && (
                <div className="bg-accent/10 p-3 rounded-lg">
                  <div className="text-xs font-medium mb-2">Live Call Analysis</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span>Sentiment:</span>
                      <Badge variant={callAnalysis.sentiment === 'positive' ? 'default' : 'secondary'}>
                        {callAnalysis.sentiment}
                      </Badge>
                    </div>
                    {callAnalysis.keyTopics.length > 0 && (
                      <div>
                        <div className="text-muted-foreground mb-1">Key Topics:</div>
                        <div className="flex flex-wrap gap-1">
                          {callAnalysis.keyTopics.map((topic, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Call Notes</label>
                <Textarea
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  placeholder="Document key discussion points, action items, and next steps..."
                  rows={3}
                  className="text-sm"
                />
              </div>
              
              <div className="flex justify-center">
                <Button variant="destructive" onClick={endCall} className="bg-red-600 hover:bg-red-700">
                  <Phone className="h-4 w-4 mr-2" />
                  End Call
                </Button>
              </div>
            </div>
          )}

          {callStatus === 'ended' && (
            <div className="space-y-4">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Phone className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium text-lg">Call Ended</div>
                  <div className="text-sm text-muted-foreground">Duration: {formatTime(callDuration)}</div>
                </div>
              </div>

              {/* Post-Call Analysis */}
              <div className="bg-accent/10 p-4 rounded-lg space-y-3">
                <div className="font-medium text-sm">Call Summary & Analysis</div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <div className="font-medium">{formatTime(callDuration)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Sentiment:</span>
                    <div className="font-medium capitalize">{callAnalysis.sentiment}</div>
                  </div>
                </div>

                {callAnalysis.actionItems.length > 0 && (
                  <div>
                    <div className="text-muted-foreground text-xs mb-2">Action Items:</div>
                    <ul className="text-xs space-y-1">
                      {callAnalysis.actionItems.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {callAnalysis.followUpRequired && (
                  <div className="flex items-center space-x-2 text-xs">
                    <Calendar className="h-3 w-3 text-warning" />
                    <span className="text-warning">Follow-up recommended within 24 hours</span>
                  </div>
                )}
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Call completed successfully. Report saved to CRM.
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Message Rep Modal */}
      <Dialog open={messageModalOpen} onOpenChange={setMessageModalOpen}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Message {selectedRep?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded">
              <div className="text-xs sm:text-sm text-muted-foreground">Subject</div>
              <div className="font-medium text-sm sm:text-base">Performance Improvement - {selectedRep?.clinic}</div>
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Hi [Rep Name], I wanted to discuss the performance metrics for [Clinic]..."
                rows={5}
                className="text-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" onClick={() => setMessageModalOpen(false)} className="w-full sm:w-auto">Cancel</Button>
              <Button onClick={submitMessage}>Send Message</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Optimize Rep Modal */}
      <Dialog open={optimizeModalOpen} onOpenChange={setOptimizeModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Performance Optimization: {selectedRep?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded">
              <div className="text-sm text-destructive">Current Conversion Rate: {selectedRep?.conversion}%</div>
              <div className="text-sm text-muted-foreground">Target: 70%+ conversion rate</div>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Performance Analysis:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Follow-up timing needs improvement</li>
                  <li>• Product knowledge assessment required</li>
                  <li>• Objection handling skills to develop</li>
                  <li>• CRM usage optimization needed</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Recommended Training:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                    <span>Advanced Objection Handling</span>
                    <Badge variant="secondary">2 hrs</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                    <span>CRM Mastery Workshop</span>
                    <Badge variant="secondary">1 hr</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                    <span>Product Deep Dive Session</span>
                    <Badge variant="secondary">3 hrs</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" onClick={() => setOptimizeModalOpen(false)}>Cancel</Button>
              <Button onClick={submitOptimization}>Activate Plan</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesManagerDashboard;