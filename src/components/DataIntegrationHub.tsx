import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Database, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  RefreshCw, 
  Download, 
  Clock,
  AlertCircle,
  Activity,
  Server
} from 'lucide-react';

const DataIntegrationHub = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const dataHealthMetrics = {
    recordsMatched: 87,
    missingFields: 12,
    lastRefresh: 'Sept 9, 2025 – 02:15 AM',
    qualityIndex: 83
  };

  const dataSources = [
    {
      name: 'CRM (Salesforce)',
      status: 'ok',
      recordsIngested: 152340,
      lastRefresh: 'Sept 9, 2025 – 01:45 AM',
      errors: 0,
      icon: Database
    },
    {
      name: 'Ally App',
      status: 'ok',
      recordsIngested: 68120,
      lastRefresh: 'Sept 8, 2025 – 11:30 PM',
      errors: 0,
      icon: Activity
    },
    {
      name: 'Facebook Ads',
      status: 'warning',
      recordsIngested: 45870,
      lastRefresh: 'Sept 7, 2025 – 05:00 PM',
      errors: 3,
      icon: Server
    },
    {
      name: 'Google Ads',
      status: 'ok',
      recordsIngested: 32560,
      lastRefresh: 'Sept 9, 2025 – 12:20 AM',
      errors: 0,
      icon: Server
    },
    {
      name: 'Trade Test / Vendor Feeds',
      status: 'error',
      recordsIngested: 0,
      lastRefresh: 'Sept 5, 2025 – 09:10 PM',
      errors: 2,
      icon: Database
    },
    {
      name: 'Rep Systems',
      status: 'ok',
      recordsIngested: 21460,
      lastRefresh: 'Sept 9, 2025 – 02:05 AM',
      errors: 1,
      icon: Database
    },
    {
      name: 'ERP / Billing',
      status: 'ok',
      recordsIngested: 11320,
      lastRefresh: 'Sept 8, 2025 – 10:50 PM',
      errors: 0,
      icon: Database
    }
  ];

  const entityMatching = [
    {
      sourceA: 'CRM',
      sourceB: 'Ally App',
      recordsLinked: 102450,
      matchConfidence: 94,
      duplicatesResolved: 4200,
      actionRequired: false
    },
    {
      sourceA: 'Ally App',
      sourceB: 'Billing',
      recordsLinked: 62300,
      matchConfidence: 88,
      duplicatesResolved: 2100,
      actionRequired: true
    },
    {
      sourceA: 'CRM',
      sourceB: 'Facebook',
      recordsLinked: 39800,
      matchConfidence: 79,
      duplicatesResolved: 1050,
      actionRequired: true
    },
    {
      sourceA: 'CRM',
      sourceB: 'Google Ads',
      recordsLinked: 27640,
      matchConfidence: 91,
      duplicatesResolved: 560,
      actionRequired: false
    },
    {
      sourceA: 'Rep Notes',
      sourceB: 'CRM',
      recordsLinked: 18200,
      matchConfidence: 84,
      duplicatesResolved: 300,
      actionRequired: false
    }
  ];

  const sourceContribution = [
    { source: 'CRM', percentage: 35 },
    { source: 'Ally App', percentage: 28 },
    { source: 'Facebook Ads', percentage: 15 },
    { source: 'Google Ads', percentage: 11 },
    { source: 'Rep Systems', percentage: 7 },
    { source: 'ERP / Billing', percentage: 4 }
  ];

  const attributionFunnel = [
    { stage: 'Leads Imported', count: 150000, percentage: 100 },
    { stage: 'Promo Redemptions Matched', count: 90000, percentage: 60 },
    { stage: 'Treatments Confirmed', count: 55000, percentage: 37 },
    { stage: 'Repeat Treatments Logged', count: 28000, percentage: 19 }
  ];

  const alerts = [
    {
      type: 'error',
      title: 'Vendor Feed Failure',
      message: 'Trade Test feed not refreshed since Sept 5, 2025.',
      icon: XCircle
    },
    {
      type: 'warning',
      title: 'Schema Change Detected',
      message: 'Facebook Ads added new field "Campaign Objective".',
      icon: AlertTriangle
    },
    {
      type: 'warning',
      title: 'Data Freshness Alert',
      message: '12% of records older than 30 days.',
      icon: Clock
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'default';
      case 'warning': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Data Integration Hub</h2>
          <p className="text-muted-foreground">Monitor data quality, pipeline health, and attribution readiness</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="north">North</SelectItem>
              <SelectItem value="south">South</SelectItem>
              <SelectItem value="east">East</SelectItem>
              <SelectItem value="west">West</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Health Scorecards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Records Matched</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="text-2xl font-bold text-secondary-foreground">{dataHealthMetrics.recordsMatched}%</div>
            <Progress value={dataHealthMetrics.recordsMatched} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Missing Fields</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataHealthMetrics.missingFields}%</div>
            <Progress value={dataHealthMetrics.missingFields} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Last Data Refresh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">{dataHealthMetrics.lastRefresh}</div>
            <Badge variant="default" className="mt-2">Active</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Data Quality Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{dataHealthMetrics.qualityIndex}/100</div>
            <Progress value={dataHealthMetrics.qualityIndex} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Monitor */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Monitor</CardTitle>
          <CardDescription>Data source sync status and ingestion metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {dataSources.map((source) => {
              const StatusIcon = getStatusIcon(source.status);
              return (
                <Card key={source.name}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <source.icon className="h-4 w-4" />
                        <span className="font-medium text-sm">{source.name}</span>
                      </div>
                      <Badge variant={getStatusColor(source.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {source.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Records:</span>
                        <span className="font-medium">{source.recordsIngested.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Refresh:</span>
                        <span className="font-medium">{source.lastRefresh.split(' – ')[1]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Errors:</span>
                      <Badge variant={source.errors > 0 ? "destructive" : "default"} className="text-xs">
                        {source.errors}
                      </Badge>
                      </div>
                    </div>
                    {source.status === 'error' && (
                      <Button size="sm" variant="outline" className="w-full mt-3">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Retry
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Entity Matching & Source Contribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Entity Matching Panel</CardTitle>
            <CardDescription>Cross-source record linking and duplicate resolution</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source A</TableHead>
                  <TableHead>Source B</TableHead>
                  <TableHead>Linked</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entityMatching.map((match, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? 'bg-muted/20' : 'bg-background'}>
                    <TableCell>{match.sourceA}</TableCell>
                    <TableCell>{match.sourceB}</TableCell>
                    <TableCell>{match.recordsLinked.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={match.matchConfidence > 90 ? "default" : match.matchConfidence > 80 ? "secondary" : "destructive"}>
                        {match.matchConfidence}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {match.actionRequired ? (
                        <Badge variant="secondary">Review</Badge>
                      ) : (
                        <Badge variant="default">OK</Badge>
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
            <CardTitle>Source Contribution</CardTitle>
            <CardDescription>Data volume distribution by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sourceContribution.map((item) => (
                <div key={item.source} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.source}</span>
                    <span className="font-medium">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attribution Readiness Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Attribution Readiness Funnel</CardTitle>
          <CardDescription>Data completeness through the attribution pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attributionFunnel.map((stage, index) => (
              <div key={stage.stage} className="flex items-center space-x-4">
                <div className="w-48 text-sm font-medium">{stage.stage}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{stage.count.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">{stage.percentage}%</span>
                  </div>
                  <Progress value={stage.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
            <p><strong>Drop-off Notes:</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>40% leads never redeemed a promo</li>
              <li>23% redeemed but never took treatment</li>
              <li>18% treatment patients didn't repeat within 6 months</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts & Notifications</CardTitle>
          <CardDescription>System alerts requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => {
              const AlertIcon = alert.icon;
              return (
                <Alert key={index} className={alert.type === 'error' ? 'border-destructive' : 'border-warning'}>
                  <AlertIcon className="h-4 w-4" />
                  <div className="ml-2">
                    <div className="font-medium">{alert.title}</div>
                    <AlertDescription className="mt-1">
                      {alert.message}
                    </AlertDescription>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto">
                    Resolve
                  </Button>
                </Alert>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataIntegrationHub;