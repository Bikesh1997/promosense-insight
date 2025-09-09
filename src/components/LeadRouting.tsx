import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Target, Clock, TrendingUp, Star, Phone, Mail, MessageSquare, AlertTriangle } from "lucide-react";

const LeadRouting = () => {
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Lead queue data
  const leads = [
    {
      id: 1,
      name: "Sarah Mitchell",
      email: "sarah.m@email.com",
      phone: "(555) 123-4567",
      treatment: "Botox",
      priority: "hot",
      score: 95,
      source: "Facebook Ads",
      assignedRep: null,
      status: "unassigned",
      timeReceived: "2 minutes ago",
      lastContact: null,
      notes: "Interested in forehead lines, mentioned competitor pricing"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "(555) 234-5678",
      treatment: "Juvederm",
      priority: "warm",
      score: 78,
      source: "Google Ads",
      assignedRep: "Lisa Rodriguez",
      status: "contacted",
      timeReceived: "15 minutes ago",
      lastContact: "5 minutes ago",
      notes: "Second consultation, previously interested in lip fillers"
    },
    {
      id: 3,
      name: "Emma Johnson",
      email: "emma.j@email.com",
      phone: "(555) 345-6789",
      treatment: "CoolSculpting",
      priority: "hot",
      score: 89,
      source: "Referral",
      assignedRep: "David Wilson",
      status: "consultation_booked",
      timeReceived: "1 hour ago",
      lastContact: "30 minutes ago",
      notes: "Referred by existing patient, ready to schedule"
    },
    {
      id: 4,
      name: "James Williams",
      email: "j.williams@email.com",
      phone: "(555) 456-7890",
      treatment: "SkinMedica",
      priority: "cold",
      score: 45,
      source: "Website",
      assignedRep: null,
      status: "unassigned",
      timeReceived: "3 hours ago",
      lastContact: null,
      notes: "General inquiry about skin care products"
    }
  ];

  // Rep performance data
  const reps = [
    {
      id: 1,
      name: "Lisa Rodriguez",
      avatar: "/avatars/lisa.jpg",
      specialty: "Injectables",
      activeLeads: 12,
      conversionRate: 84,
      avgResponseTime: "4 min",
      satisfaction: 4.8,
      capacity: 18,
      status: "available"
    },
    {
      id: 2,
      name: "David Wilson",
      avatar: "/avatars/david.jpg",
      specialty: "Body Contouring",
      activeLeads: 8,
      conversionRate: 76,
      avgResponseTime: "7 min",
      satisfaction: 4.6,
      capacity: 15,
      status: "busy"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      specialty: "Skin Care",
      activeLeads: 15,
      conversionRate: 82,
      avgResponseTime: "3 min",
      satisfaction: 4.7,
      capacity: 20,
      status: "available"
    },
    {
      id: 4,
      name: "Mike Chen",
      avatar: "/avatars/mike.jpg",
      specialty: "General",
      activeLeads: 6,
      conversionRate: 71,
      avgResponseTime: "12 min",
      satisfaction: 4.3,
      capacity: 12,
      status: "away"
    }
  ];

  // Routing rules
  const routingRules = [
    {
      id: 1,
      name: "High-Value Leads",
      condition: "Lead Score > 90",
      action: "Assign to top performer",
      priority: 1,
      active: true
    },
    {
      id: 2,
      name: "Treatment Specialty",
      condition: "Treatment matches rep specialty",
      action: "Auto-assign to specialist",
      priority: 2,
      active: true
    },
    {
      id: 3,
      name: "Response Time",
      condition: "Rep response time < 5 min",
      action: "Prioritize fast responders",
      priority: 3,
      active: true
    },
    {
      id: 4,
      name: "Capacity Management",
      condition: "Rep at 90% capacity",
      action: "Redirect to available rep",
      priority: 4,
      active: false
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'hot':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Hot</Badge>;
      case 'warm':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Warm</Badge>;
      case 'cold':
        return <Badge variant="outline">Cold</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unassigned':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Unassigned</Badge>;
      case 'contacted':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Contacted</Badge>;
      case 'consultation_booked':
        return <Badge className="bg-success/10 text-success border-success/20">Consultation Booked</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRepStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-success/10 text-success border-success/20">Available</Badge>;
      case 'busy':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Busy</Badge>;
      case 'away':
        return <Badge variant="outline">Away</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredLeads = leads.filter(lead => {
    const priorityMatch = selectedPriority === "all" || lead.priority === selectedPriority;
    const statusMatch = selectedStatus === "all" || lead.status === selectedStatus;
    return priorityMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Smart Lead Routing</h2>
          <p className="text-muted-foreground">AI-powered lead assignment and rep performance optimization</p>
        </div>
        <div className="flex space-x-4">
          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="hot">Hot</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="cold">Cold</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="consultation_booked">Consultation Booked</SelectItem>
            </SelectContent>
          </Select>
          <Button>Configure Routing Rules</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <div className="flex items-center text-xs text-warning">
              <AlertTriangle className="h-3 w-3 mr-1" />
              3 unassigned for &gt;1 hour
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.5 min</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              -12% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">78.4%</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.2% from AI routing
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rep Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.3 points this month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="queue" className="space-y-6">
        <TabsList>
          <TabsTrigger value="queue">Lead Queue</TabsTrigger>
          <TabsTrigger value="reps">Rep Performance</TabsTrigger>
          <TabsTrigger value="routing">Routing Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle>Active Lead Queue</CardTitle>
              <p className="text-sm text-muted-foreground">Real-time lead assignment and status tracking</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-lg">{lead.name}</h4>
                          <p className="text-muted-foreground">{lead.treatment} inquiry</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {lead.email}
                            </span>
                            <span className="flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {lead.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getPriorityBadge(lead.priority)}
                        {getStatusBadge(lead.status)}
                        <Badge variant="outline">Score: {lead.score}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Source</p>
                        <p className="font-medium">{lead.source}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Received</p>
                        <p className="font-medium">{lead.timeReceived}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Assigned Rep</p>
                        <p className="font-medium">{lead.assignedRep || 'Unassigned'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Contact</p>
                        <p className="font-medium">{lead.lastContact || 'None'}</p>
                      </div>
                    </div>

                    <div className="bg-muted p-3 rounded-lg mb-4">
                      <p className="text-sm"><strong>Notes:</strong> {lead.notes}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Progress value={lead.score} className="w-20 h-2" />
                        <span className="text-sm text-muted-foreground">Lead Score: {lead.score}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm">Reassign</Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reps">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rep Performance Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reps.map((rep) => (
                    <div key={rep.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={rep.avatar} />
                            <AvatarFallback>{rep.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{rep.name}</h4>
                            <p className="text-sm text-muted-foreground">{rep.specialty} Specialist</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getRepStatusBadge(rep.status)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Active Leads</p>
                          <p className="font-semibold">{rep.activeLeads}/{rep.capacity}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Conversion</p>
                          <p className="font-semibold text-success">{rep.conversionRate}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Response Time</p>
                          <p className="font-semibold">{rep.avgResponseTime}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Satisfaction</p>
                          <p className="font-semibold">{rep.satisfaction}/5.0</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Capacity</span>
                          <span className="text-sm">{Math.round((rep.activeLeads / rep.capacity) * 100)}%</span>
                        </div>
                        <Progress value={(rep.activeLeads / rep.capacity) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Routing Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <h4 className="font-medium text-success">Optimal Assignment</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Lisa Rodriguez best match for current Botox leads - 89% success rate predicted
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">Auto-Assign</Button>
                </div>
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="font-medium text-warning">Capacity Alert</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sarah Johnson approaching 90% capacity - redistribute 3 leads
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">Rebalance</Button>
                </div>
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-medium text-primary">Training Opportunity</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Mike Chen's response time 12min avg - coaching recommended
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">Schedule Training</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="routing">
          <Card>
            <CardHeader>
              <CardTitle>Smart Routing Rules</CardTitle>
              <p className="text-sm text-muted-foreground">Configure AI-powered lead assignment logic</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routingRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm bg-muted px-2 py-1 rounded">#{rule.priority}</span>
                        <div className={`w-3 h-3 rounded-full ${rule.active ? 'bg-success' : 'bg-muted'}`}></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{rule.name}</h4>
                        <p className="text-sm text-muted-foreground">{rule.condition} → {rule.action}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={rule.active ? "default" : "outline"}>
                        {rule.active ? "Active" : "Inactive"}
                      </Badge>
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">
                        {rule.active ? "Disable" : "Enable"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t">
                <Button>Add New Rule</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>AI vs Manual Assignment</span>
                    <Badge className="bg-success/10 text-success border-success/20">+15% better conversion</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>AI Routing</span>
                      <span>78.4%</span>
                    </div>
                    <Progress value={78.4} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Manual Assignment</span>
                      <span>63.2%</span>
                    </div>
                    <Progress value={63.2} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">-34%</div>
                  <p className="text-sm text-muted-foreground">
                    Reduction in average response time since AI routing implementation
                  </p>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>{"< 5 minutes"}</span>
                    <Badge className="bg-success/10 text-success border-success/20">67%</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>5-15 minutes</span>
                    <Badge className="bg-warning/10 text-warning border-warning/20">23%</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>{"> 15 minutes"}</span>
                    <Badge className="bg-destructive/10 text-destructive border-destructive/20">10%</Badge>
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

export default LeadRouting;