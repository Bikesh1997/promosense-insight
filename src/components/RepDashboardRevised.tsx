import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginationTable } from '@/components/ui/pagination-table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  Phone, 
  Mail, 
  Calendar, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Users,
  Target,
  Award,
  MessageCircle,
  CheckCircle,
  XCircle,
  Plus,
  PhoneCall,
  Brain
} from 'lucide-react';

const RepDashboardRevised = () => {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [selectedLead, setSelectedLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPage, setLeadsPage] = useState(1);
  const [showAddLead, setShowAddLead] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [callNotes, setCallNotes] = useState('');
  const [newLead, setNewLead] = useState({
    leadName: '',
    clinic: '',
    phone: '',
    email: '',
    treatment: '',
    value: '',
    notes: ''
  });
  const itemsPerPage = 8;

  const handleAddLead = () => {
    if (newLead.leadName && newLead.clinic && newLead.phone) {
      toast.success('Lead added successfully!');
      setShowAddLead(false);
      setNewLead({
        leadName: '',
        clinic: '',
        phone: '',
        email: '',
        treatment: '',
        value: '',
        notes: ''
      });
    } else {
      toast.error('Please fill in required fields');
    }
  };

  const handleCall = (lead) => {
    setSelectedLead(lead);
    setShowCallDialog(true);
    toast.success(`Calling ${lead.leadName}...`);
  };

  const handleCallComplete = () => {
    if (callNotes.trim()) {
      toast.success('Call completed and notes saved!');
      setShowCallDialog(false);
      setCallNotes('');
      setSelectedLead(null);
    } else {
      toast.error('Please add call notes before completing');
    }
  };

  const analyzeCallWithAI = () => {
    if (callNotes.trim()) {
      toast.success('AI analysis completed! Key insights: Patient showed high interest, recommend follow-up in 2 days.');
    } else {
      toast.error('Please add call notes to analyze');
    }
  };

  const comprehensiveLeads = [
    { 
      id: 'L001',
      leadName: "Sarah Mitchell", 
      clinic: "Radiance Med Spa Miami", 
      stage: "Promo Offered", 
      lastContact: "2025-09-12", 
      nextAction: "Follow up on Botox 20% discount",
      priority: "high",
      phone: "(305) 555-0142",
      email: "sarah.mitchell@email.com",
      treatment: "Botox + Juvederm",
      value: 1200,
      notes: "Interested in combination treatment. Concerned about downtime.",
      history: ["Initial contact 09/10", "Brochure sent 09/11", "Quote provided 09/12"]
    },
    { 
      id: 'L002',
      leadName: "Jennifer Lopez", 
      clinic: "SkinHealth NYC", 
      stage: "Treatment Scheduled", 
      lastContact: "2025-09-11", 
      nextAction: "Confirm appointment tomorrow",
      priority: "medium",
      phone: "(212) 555-0198",
      email: "j.lopez@email.com",
      treatment: "Botox Touch-up",
      value: 450,
      notes: "Returning patient. Prefers Friday appointments.",
      history: ["Promo accepted 09/08", "Appointment booked 09/11"]
    },
    { 
      id: 'L003',
      leadName: "Maria Rodriguez", 
      clinic: "ClearSkin Chicago", 
      stage: "First Treatment", 
      lastContact: "2025-09-10", 
      nextAction: "Schedule follow-up consultation",
      priority: "high",
      phone: "(312) 555-0176",
      email: "maria.r@email.com",
      treatment: "Juvederm Lips",
      value: 680,
      notes: "Very satisfied with results. Interested in additional areas.",
      history: ["Treatment completed 09/10", "Follow-up scheduled"]
    },
    { 
      id: 'L004',
      leadName: "David Chen", 
      clinic: "Glow Clinic LA", 
      stage: "Nurture", 
      lastContact: "2025-09-09", 
      nextAction: "Send educational content about Botox",
      priority: "low",
      phone: "(310) 555-0134",
      email: "david.chen@email.com",
      treatment: "Botox Consultation",
      value: 300,
      notes: "First-time patient. Needs education about treatment benefits.",
      history: ["Initial inquiry 09/05", "Educational material sent 09/09"]
    },
    { 
      id: 'L005',
      leadName: "Lisa Williams", 
      clinic: "Rejuvenate Dallas", 
      stage: "Ready to Book", 
      lastContact: "2025-09-13", 
      nextAction: "Call to finalize Juvederm appointment",
      priority: "high",
      phone: "(214) 555-0167",
      email: "lisa.w@email.com",
      treatment: "Juvederm Cheeks",
      value: 890,
      notes: "Ready to proceed. Wants to schedule for next week.",
      history: ["Consultation completed 09/12", "Quote approved 09/13"]
    },
    { 
      id: 'L006',
      leadName: "Robert Taylor", 
      clinic: "Aesthetic Center", 
      stage: "Follow-up Needed", 
      lastContact: "2025-09-08", 
      nextAction: "Check satisfaction after Botox treatment",
      priority: "medium",
      phone: "(713) 555-0189",
      email: "r.taylor@email.com",
      treatment: "Botox Forehead",
      value: 420,
      notes: "Treatment completed. Check for any concerns or questions.",
      history: ["Treatment 09/06", "Payment processed 09/06"]
    },
    { 
      id: 'L007',
      leadName: "Amanda Davis", 
      clinic: "Elite Aesthetics", 
      stage: "Objection Handling", 
      lastContact: "2025-09-11", 
      nextAction: "Address pricing concerns",
      priority: "high",
      phone: "(404) 555-0145",
      email: "amanda.d@email.com",
      treatment: "Full Face Rejuvenation",
      value: 1850,
      notes: "Interested but concerned about total cost. Needs payment plan options.",
      history: ["Consultation 09/09", "Quote provided 09/10", "Follow-up 09/11"]
    },
    { 
      id: 'L008',
      leadName: "Michael Brown", 
      clinic: "Modern Med Spa", 
      stage: "Repeat Treatment", 
      lastContact: "2025-09-12", 
      nextAction: "Offer loyalty program enrollment",
      priority: "medium",
      phone: "(503) 555-0123",
      email: "m.brown@email.com",
      treatment: "Botox Maintenance",
      value: 380,
      notes: "Regular patient. Excellent compliance. Good candidate for loyalty program.",
      history: ["Previous treatments: 06/15, 03/20", "Due for touch-up"]
    }
  ];

  const repMetrics = {
    thisMonth: {
      leadsAssigned: 156,
      conversions: 89,
      revenue: 94500,
      conversionRate: 57,
      avgDealSize: 620,
      appointmentsSet: 124
    },
    thisWeek: {
      calls: 45,
      emails: 78,
      appointments: 28,
      closedDeals: 12
    },
    goals: {
      monthlyRevenue: 120000,
      monthlyConversions: 110,
      weeklyActivities: 150
    }
  };

  const achievements = [
    { title: "Top Performer", description: "Highest conversion rate this quarter", icon: Award, color: "text-yellow-500" },
    { title: "Customer Favorite", description: "95% satisfaction rating", icon: Users, color: "text-green-500" },
    { title: "Goal Crusher", description: "150% of revenue target", icon: Target, color: "text-blue-500" }
  ];

  const upcomingTasks = [
    { task: "Call Sarah Mitchell about Botox discount", time: "10:00 AM", priority: "high" },
    { task: "Follow up with Lisa Williams booking", time: "11:30 AM", priority: "high" },
    { task: "Send Juvederm info to David Chen", time: "2:00 PM", priority: "medium" },
    { task: "Check in with Robert Taylor post-treatment", time: "3:30 PM", priority: "medium" }
  ];

  const recentActivities = [
    { activity: "Closed deal with Jennifer Lopez", time: "2 hours ago", type: "success" },
    { activity: "Scheduled consultation for Maria Rodriguez", time: "4 hours ago", type: "info" },
    { activity: "Sent pricing to Amanda Davis", time: "6 hours ago", type: "info" },
    { activity: "Completed follow-up call with Michael Brown", time: "1 day ago", type: "success" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStageColor = (stage: string) => {
    const colors = {
      'Promo Offered': 'bg-blue-100 text-blue-800',
      'Treatment Scheduled': 'bg-green-100 text-green-800',
      'First Treatment': 'bg-purple-100 text-purple-800',
      'Nurture': 'bg-gray-100 text-gray-800',
      'Ready to Book': 'bg-yellow-100 text-yellow-800',
      'Follow-up Needed': 'bg-orange-100 text-orange-800',
      'Objection Handling': 'bg-red-100 text-red-800',
      'Repeat Treatment': 'bg-indigo-100 text-indigo-800'
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Pagination
  const paginatedLeads = comprehensiveLeads.slice(
    (leadsPage - 1) * itemsPerPage,
    leadsPage * itemsPerPage
  );
  const totalPages = Math.ceil(comprehensiveLeads.length / itemsPerPage);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Rep Dashboard</h2>
          <p className="text-muted-foreground">Complete sales pipeline and performance management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="px-3 py-1">
            Alex Thompson - Dallas Region
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pipeline">Sales Pipeline</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="goals">Goals & Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          {/* Pipeline Overview Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Active Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{comprehensiveLeads.length}</div>
                <p className="text-xs text-muted-foreground">In pipeline</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{repMetrics.thisWeek.closedDeals}</div>
                <p className="text-xs text-muted-foreground">Deals closed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(repMetrics.thisMonth.revenue / 1000).toFixed(0)}K</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Conversion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{repMetrics.thisMonth.conversionRate}%</div>
                <p className="text-xs text-muted-foreground">Success rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Leads Management Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lead Pipeline Management</CardTitle>
                  <CardDescription>Complete customer journey tracking</CardDescription>
                </div>
                <Dialog open={showAddLead} onOpenChange={setShowAddLead}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Lead
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Lead</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Lead Name *</label>
                          <Input
                            value={newLead.leadName}
                            onChange={(e) => setNewLead({...newLead, leadName: e.target.value})}
                            placeholder="Enter lead name"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Clinic *</label>
                          <Input
                            value={newLead.clinic}
                            onChange={(e) => setNewLead({...newLead, clinic: e.target.value})}
                            placeholder="Enter clinic name"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Phone *</label>
                          <Input
                            value={newLead.phone}
                            onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email</label>
                          <Input
                            value={newLead.email}
                            onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                            placeholder="email@example.com"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Treatment</label>
                          <Input
                            value={newLead.treatment}
                            onChange={(e) => setNewLead({...newLead, treatment: e.target.value})}
                            placeholder="Botox, Juvederm, etc."
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Est. Value</label>
                          <Input
                            value={newLead.value}
                            onChange={(e) => setNewLead({...newLead, value: e.target.value})}
                            placeholder="800"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Notes</label>
                        <Textarea
                          value={newLead.notes}
                          onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                          placeholder="Additional notes about the lead..."
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowAddLead(false)}>Cancel</Button>
                        <Button onClick={handleAddLead}>Add Lead</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead</TableHead>
                    <TableHead>Clinic</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Next Action</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLeads.map((lead) => (
                    <TableRow key={lead.id} className={`hover:bg-muted/50 ${paginatedLeads.indexOf(lead) % 2 === 0 ? 'bg-muted/20' : 'bg-background'}`}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{lead.leadName}</div>
                          <div className="text-xs text-muted-foreground">{lead.lastContact}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{lead.clinic}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${getStageColor(lead.stage)}`}>
                          {lead.stage}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{lead.treatment}</TableCell>
                      <TableCell className="font-medium">${lead.value}</TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(lead.priority)} className="text-xs">
                          {lead.priority.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs max-w-40 truncate">{lead.nextAction}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleCall(lead)}
                          >
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                            onClick={() => toast.success(`Email sent to ${lead.leadName}`)}
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setSelectedLead(lead)}>
                                <MessageCircle className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Lead Details: {lead.leadName}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div><strong>Phone:</strong> {lead.phone}</div>
                                  <div><strong>Email:</strong> {lead.email}</div>
                                  <div><strong>Treatment:</strong> {lead.treatment}</div>
                                  <div><strong>Value:</strong> ${lead.value}</div>
                                </div>
                                <div>
                                  <strong>Notes:</strong>
                                  <p className="text-sm text-muted-foreground mt-1">{lead.notes}</p>
                                </div>
                                <div>
                                  <strong>History:</strong>
                                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                                    {lead.history.map((item, idx) => (
                                      <li key={idx}>• {item}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    className="flex-1"
                                    onClick={() => handleCall(lead)}
                                  >
                                    <Phone className="h-4 w-4 mr-2" />
                                    Call
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={() => toast.success(`Email sent to ${lead.leadName}`)}
                                  >
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <PaginationTable
                  currentPage={leadsPage}
                  totalPages={totalPages}
                  onPageChange={setLeadsPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={comprehensiveLeads.length}
                />
              </div>
            </CardContent>
          </Card>

          {/* Call Dialog */}
          <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <PhoneCall className="h-5 w-5 mr-2" />
                  Call with {selectedLead?.leadName}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Phone:</strong> {selectedLead?.phone}</div>
                  <div><strong>Treatment:</strong> {selectedLead?.treatment}</div>
                  <div><strong>Stage:</strong> {selectedLead?.stage}</div>
                  <div><strong>Value:</strong> ${selectedLead?.value}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Call Notes & Summary</label>
                  <Textarea 
                    value={callNotes}
                    onChange={(e) => setCallNotes(e.target.value)}
                    placeholder="Document call details, patient concerns, next steps..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={analyzeCallWithAI} 
                    variant="outline" 
                    className="flex-1"
                    disabled={!callNotes.trim()}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze call summary with AI
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleCallComplete} className="flex-1">Complete Call</Button>
                  <Button variant="outline" onClick={() => setShowCallDialog(false)} className="flex-1">Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Current month progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Revenue Goal</span>
                    <span>${repMetrics.thisMonth.revenue.toLocaleString()} / ${repMetrics.goals.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <Progress value={(repMetrics.thisMonth.revenue / repMetrics.goals.monthlyRevenue) * 100} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Conversions</span>
                    <span>{repMetrics.thisMonth.conversions} / {repMetrics.goals.monthlyConversions}</span>
                  </div>
                  <Progress value={(repMetrics.thisMonth.conversions / repMetrics.goals.monthlyConversions) * 100} />
                </div>
                <div className="text-center pt-4">
                  <div className="text-2xl font-bold text-success">{Math.round((repMetrics.thisMonth.revenue / repMetrics.goals.monthlyRevenue) * 100)}%</div>
                  <div className="text-sm text-muted-foreground">of monthly goal</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Recent accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <IconComponent className={`h-5 w-5 ${achievement.color}`} />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground">{achievement.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>This week's performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{repMetrics.thisWeek.calls}</div>
                    <div className="text-xs text-muted-foreground">Calls Made</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{repMetrics.thisWeek.emails}</div>
                    <div className="text-xs text-muted-foreground">Emails Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{repMetrics.thisWeek.appointments}</div>
                    <div className="text-xs text-muted-foreground">Appointments Set</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{repMetrics.thisWeek.closedDeals}</div>
                    <div className="text-xs text-muted-foreground">Deals Closed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Today's Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Priority Tasks</CardTitle>
                <CardDescription>Scheduled activities and follow-ups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{task.task}</div>
                        <div className="text-xs text-muted-foreground">{task.time}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                          {task.priority.toUpperCase()}
                        </Badge>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className={`h-2 w-2 mt-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{activity.activity}</div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          {/* Goals and Insights */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>AI-powered recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-green-800">Strong Performance</div>
                        <div className="text-sm text-green-700">You're 25% above target this month. Focus on high-value leads to maximize revenue.</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-blue-800">Opportunity Alert</div>
                        <div className="text-sm text-blue-700">3 leads in "Ready to Book" stage. Follow up today to secure appointments.</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-orange-800">Follow-up Reminder</div>
                        <div className="text-sm text-orange-700">2 post-treatment check-ins are overdue. Patient satisfaction is key to retention.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal Tracking</CardTitle>
                <CardDescription>Monthly and quarterly objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Monthly Revenue</span>
                      <span className="font-medium">${repMetrics.thisMonth.revenue.toLocaleString()}</span>
                    </div>
                    <Progress value={79} className="mb-2" />
                    <div className="text-xs text-muted-foreground">79% of ${repMetrics.goals.monthlyRevenue.toLocaleString()} goal</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Conversion Rate</span>
                      <span className="font-medium">{repMetrics.thisMonth.conversionRate}%</span>
                    </div>
                    <Progress value={repMetrics.thisMonth.conversionRate} className="mb-2" />
                    <div className="text-xs text-muted-foreground">Target: 60%</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Customer Satisfaction</span>
                      <span className="font-medium">4.8/5.0</span>
                    </div>
                    <Progress value={96} className="mb-2" />
                    <div className="text-xs text-muted-foreground">Based on 24 reviews this month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RepDashboardRevised;