import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar, Award, Target, Clock, AlertCircle } from 'lucide-react';

const DoctorDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  const periodOptions = [
    { value: 'current-month', label: 'Current Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
  ];

  const practiceMetrics = {
    totalPatients: 342,
    newPatients: 47,
    revenue: 86400,
    avgTreatmentValue: 520,
    appointmentRate: 92,
    patientSatisfaction: 4.8
  };

  const activeCampaigns = [
    {
      name: "Allē Loyalty Rewards",
      status: "Active",
      period: "2025-09-01 to 2025-12-31",
      cost: 25000,
      newPatients: 425,
      revenue: 255000,
      roi: 920
    },
    {
      name: "Refer-a-Friend Program",
      status: "Active",
      period: "2025-08-15 to 2025-11-30",
      cost: 12000,
      newPatients: 184,
      revenue: 128000,
      roi: 967
    },
    {
      name: "Fall Rejuvenation Special",
      status: "Active",
      period: "2025-09-01 to 2025-10-31",
      cost: 8500,
      newPatients: 92,
      revenue: 67000,
      roi: 688
    }
  ];

  const upcomingAppointments = [
    { patient: "Sarah Johnson", treatment: "Botox + Juvederm", time: "10:00 AM", value: 1200 },
    { patient: "Michael Chen", treatment: "Botox Touch-up", time: "11:30 AM", value: 450 },
    { patient: "Lisa Williams", treatment: "Juvederm Lips", time: "2:00 PM", value: 680 },
    { patient: "Robert Davis", treatment: "Full Face", time: "3:30 PM", value: 1850 }
  ];

  const treatmentPerformance = [
    { treatment: "Botox", patients: 156, revenue: 62400, growth: 15 },
    { treatment: "Juvederm", patients: 89, revenue: 48920, growth: 22 },
    { treatment: "Sculptra", patients: 45, revenue: 31500, growth: 8 },
    { treatment: "Kybella", patients: 32, revenue: 19200, growth: 12 },
    { treatment: "Coolsculpting", patients: 20, revenue: 24000, growth: -5 }
  ];

  const practiceInsights = [
    { 
      type: "opportunity", 
      message: "High demand for lip fillers - consider Allē Lip Enhancement promo",
      priority: "high" 
    },
    { 
      type: "warning", 
      message: "Appointment no-show rate increased to 8% this month",
      priority: "medium" 
    },
    { 
      type: "success", 
      message: "Patient satisfaction score improved by 0.3 points",
      priority: "low" 
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">My Practice Dashboard</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Performance metrics and patient insights for your practice</p>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              {periodOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{practiceMetrics.totalPatients}</div>
            <p className="text-xs text-muted-foreground">Active patients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              New Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-success">{practiceMetrics.newPatients}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">${(practiceMetrics.revenue / 1000).toFixed(1)}K</div>
            <p className="text-xs text-muted-foreground">+18% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium">Avg Treatment Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">${practiceMetrics.avgTreatmentValue}</div>
            <p className="text-xs text-muted-foreground">Per patient</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Appointment Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-success">{practiceMetrics.appointmentRate}%</div>
            <p className="text-xs text-muted-foreground">Show-up rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center">
              <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{practiceMetrics.patientSatisfaction}/5.0</div>
            <p className="text-xs text-muted-foreground">Patient rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns & Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Active Campaigns</CardTitle>
            <CardDescription>Promotions currently running at your practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCampaigns.map((campaign, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm sm:text-base">{campaign.name}</h4>
                      <Badge variant="default" className="text-xs mt-1">{campaign.status}</Badge>
                    </div>
                    <Badge variant={campaign.roi > 800 ? "default" : "secondary"} className="text-xs">
                      {campaign.roi}% ROI
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-muted-foreground">Period:</span>
                      <p className="font-medium">{campaign.period}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost:</span>
                      <p className="font-medium">${campaign.cost.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">New Patients:</span>
                      <p className="font-medium">{campaign.newPatients}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Revenue:</span>
                      <p className="font-medium">${campaign.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Today's Appointments</CardTitle>
            <CardDescription>Scheduled treatments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((apt, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{apt.time}</span>
                    </div>
                    <p className="font-semibold mt-1">{apt.patient}</p>
                    <p className="text-sm text-muted-foreground">{apt.treatment}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${apt.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Treatment Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Treatment Performance</CardTitle>
          <CardDescription>Analysis of treatments performed at your practice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {treatmentPerformance.map((treatment) => (
              <div key={treatment.treatment} className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="font-medium text-sm sm:text-base">{treatment.treatment}</span>
                    <Badge variant={treatment.growth > 0 ? "default" : "destructive"} className="text-xs">
                      {treatment.growth > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {Math.abs(treatment.growth)}%
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-xs sm:text-sm">
                    <span className="text-muted-foreground">{treatment.patients} patients</span>
                    <span className="font-medium">${treatment.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <Progress value={Math.min((treatment.revenue / 70000) * 100, 100)} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Practice Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Practice Insights</CardTitle>
          <CardDescription>AI-powered recommendations for your practice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {practiceInsights.map((insight, index) => (
              <div 
                key={index} 
                className={`p-3 sm:p-4 rounded-lg border ${
                  insight.priority === 'high' ? 'bg-primary/5 border-primary' :
                  insight.priority === 'medium' ? 'bg-secondary/5 border-secondary' :
                  'bg-muted/5 border-muted'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {insight.type === 'opportunity' && <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />}
                  {insight.type === 'warning' && <AlertCircle className="h-4 w-4 text-secondary-foreground mt-0.5 flex-shrink-0" />}
                  {insight.type === 'success' && <Award className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium">{insight.message}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {insight.priority.toUpperCase()} PRIORITY
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;
