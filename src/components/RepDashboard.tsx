import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Phone, Mail, Calendar, AlertTriangle, Clock, TrendingUp, Users } from 'lucide-react';

const RepDashboard = () => {
  const dailyTasks = [
    { 
      leadName: "John Doe", 
      clinic: "SkinHealth NYC", 
      stage: "Promo Accepted", 
      lastContact: "09/08/2025", 
      action: "Call today, offer rebate",
      priority: "high"
    },
    { 
      leadName: "Mary Johnson", 
      clinic: "Radiance Med Spa", 
      stage: "First Treatment", 
      lastContact: "09/07/2025", 
      action: "Schedule follow-up",
      priority: "medium"
    },
    { 
      leadName: "Robert Brown", 
      clinic: "ClearSkin Chicago", 
      stage: "Lead", 
      lastContact: "09/06/2025", 
      action: "Send bundle info email",
      priority: "medium"
    },
    { 
      leadName: "Lisa White", 
      clinic: "Glow Clinic LA", 
      stage: "Repeat Treatment", 
      lastContact: "09/05/2025", 
      action: "Offer loyalty discount",
      priority: "low"
    },
    { 
      leadName: "David Wilson", 
      clinic: "Rejuvenate Dallas", 
      stage: "Promo Accepted", 
      lastContact: "09/08/2025", 
      action: "Call to confirm booking",
      priority: "high"
    }
  ];

  const promotionImpact = {
    socialMedia: 1320,
    rebates: 950,
    bundles: 780,
    repDriven: 620
  };

  const funnelProgress = {
    leadsAssigned: 200,
    promoAcceptance: 120,
    firstTreatments: 80,
    repeatTreatments: 35
  };

  const hotLeads = [
    { clinic: "SkinHealth NYC", message: "High-value lead, call within 24h", type: "urgent" },
    { clinic: "ClearSkin Chicago", message: "At-risk patient, offer bundle promotion", type: "warning" },
    { clinic: "Glow Clinic LA", message: "Hot lead, send rebate info", type: "urgent" }
  ];

  const repKPIs = {
    totalLeads: 45,
    conversion: 62,
    avgFollowUp: 1.5,
    revenueGenerated: 78500
  };

  const accountDetail = {
    clinic: "Radiance Med Spa",
    location: "Miami, FL",
    history: [
      { date: "08/15/2025", event: "Promo Offered: 10% discount", status: "Accepted" },
      { date: "08/25/2025", event: "First Treatment Completed", status: "Completed" }
    ],
    notes: "Patient prefers email reminders",
    nextAction: "Schedule follow-up in 3 days"
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getLeadTypeIcon = (type: string) => {
    return type === 'urgent' ? AlertTriangle : Clock;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold">Rep Dashboard</h2>
        <p className="text-muted-foreground">Mobile-first view for field sales representatives</p>
      </div>

      {/* Daily Tasks / Lead List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Today's Priority Tasks</CardTitle>
          <CardDescription>Leads prioritized by AI urgency score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dailyTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/20 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">{task.leadName}</span>
                    <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                      {task.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div><strong>Clinic:</strong> {task.clinic}</div>
                    <div><strong>Stage:</strong> {task.stage}</div>
                    <div><strong>Last Contact:</strong> {task.lastContact}</div>
                    <div><strong>Action:</strong> {task.action}</div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Phone className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Mail className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Calendar className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mobile Grid Layout */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Promotion Impact Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Promotion Impact</CardTitle>
            <CardDescription>Conversions by campaign type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Social Media</span>
                <Badge variant="default">{promotionImpact.socialMedia}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rebates Program</span>
                <Badge variant="secondary">{promotionImpact.rebates}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Bundles & Packages</span>
                <Badge variant="secondary">{promotionImpact.bundles}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rep-Driven Offers</span>
                <Badge variant="outline">{promotionImpact.repDriven}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Funnel Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">My Funnel Progress</CardTitle>
            <CardDescription>Pipeline conversion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Leads Assigned</span>
                  <span className="font-medium">{funnelProgress.leadsAssigned}</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Promo Acceptance</span>
                  <span className="font-medium">{funnelProgress.promoAcceptance} (60%)</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>First Treatments</span>
                  <span className="font-medium">{funnelProgress.firstTreatments} (40%)</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Repeat Treatments</span>
                  <span className="font-medium">{funnelProgress.repeatTreatments} (18%)</span>
                </div>
                <Progress value={18} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hot Leads / Churn Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hot Leads & Alerts</CardTitle>
          <CardDescription>AI-powered lead prioritization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hotLeads.map((lead, index) => {
              const IconComponent = getLeadTypeIcon(lead.type);
              return (
                <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg border ${
                  lead.type === 'urgent' ? 'bg-destructive/5 border-destructive' : 'bg-secondary/5 border-secondary'
                }`}>
                  <IconComponent className={`h-4 w-4 mt-0.5 ${
                    lead.type === 'urgent' ? 'text-destructive' : 'text-secondary-foreground'
                  }`} />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{lead.clinic}</div>
                    <div className="text-sm text-muted-foreground">{lead.message}</div>
                  </div>
                  <Button size="sm" variant="outline">Act</Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Account Detail Sample */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Detail: {accountDetail.clinic}</CardTitle>
          <CardDescription>{accountDetail.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Recent Activity</h4>
              <div className="space-y-2">
                {accountDetail.history.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm border-b pb-2">
                    <div>
                      <div className="font-medium">{item.event}</div>
                      <div className="text-xs text-muted-foreground">{item.date}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">{item.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">Notes</h4>
              <p className="text-sm text-muted-foreground">{accountDetail.notes}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">Next Action</h4>
              <p className="text-sm font-medium text-primary">{accountDetail.nextAction}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rep KPI Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Performance</CardTitle>
          <CardDescription>Your key metrics summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{repKPIs.totalLeads}</div>
              <div className="text-xs text-muted-foreground">Total Leads Handled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{repKPIs.conversion}%</div>
              <div className="text-xs text-muted-foreground">Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{repKPIs.avgFollowUp}</div>
              <div className="text-xs text-muted-foreground">Avg Follow-Up (days)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">${(repKPIs.revenueGenerated / 1000).toFixed(0)}K</div>
              <div className="text-xs text-muted-foreground">Revenue Generated</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RepDashboard;