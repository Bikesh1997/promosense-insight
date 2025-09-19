import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Server,
  Shield,
  Eye
} from 'lucide-react';

const SystemAdminDashboard = () => {
  const systemHealth = {
    uptime: "99.97%",
    apiResponseTime: "245ms",
    activeUsers: 1247,
    dataProcessingRate: "12.4K/min"
  };

  const dataSources = [
    {
      name: 'CRM (Salesforce)',
      status: 'healthy',
      lastSync: '2 min ago',
      recordsProcessed: 152340,
      errorRate: 0.02,
      syncFrequency: 'Real-time'
    },
    {
      name: 'Ally App API',
      status: 'healthy',
      lastSync: '5 min ago',
      recordsProcessed: 68120,
      errorRate: 0.01,
      syncFrequency: '5 min'
    },
    {
      name: 'Facebook Marketing API',
      status: 'degraded',
      lastSync: '2 hours ago',
      recordsProcessed: 45870,
      errorRate: 2.3,
      syncFrequency: '1 hour'
    },
    {
      name: 'Google Ads API',
      status: 'healthy',
      lastSync: '1 min ago',
      recordsProcessed: 32560,
      errorRate: 0.05,
      syncFrequency: '15 min'
    },
    {
      name: 'Trade Test Vendor',
      status: 'failed',
      lastSync: '4 days ago',
      recordsProcessed: 0,
      errorRate: 100,
      syncFrequency: '1 hour'
    }
  ];

  const dataQualityMetrics = [
    { metric: "Patient Records", completeness: 98.2, accuracy: 96.5, duplicates: 1.1 },
    { metric: "Clinic Information", completeness: 99.1, accuracy: 97.8, duplicates: 0.3 },
    { metric: "Promotion Data", completeness: 94.7, accuracy: 93.2, duplicates: 2.4 },
    { metric: "Treatment Records", completeness: 97.5, accuracy: 95.9, duplicates: 0.8 },
    { metric: "Revenue Data", completeness: 99.8, accuracy: 98.9, duplicates: 0.1 }
  ];

  const securityAlerts = [
    {
      severity: "high",
      type: "Authentication",
      message: "Multiple failed login attempts detected from IP 192.168.1.100",
      timestamp: "2 hours ago",
      status: "investigating"
    },
    {
      severity: "medium",
      type: "Data Access",
      message: "Unusual data export volume detected for user john.admin@allergan.com",
      timestamp: "6 hours ago",
      status: "resolved"
    },
    {
      severity: "low",
      type: "System",
      message: "API rate limit approached for Facebook Marketing integration",
      timestamp: "1 day ago",
      status: "monitoring"
    }
  ];

  const auditLogs = [
    {
      timestamp: "Sept 9, 2025 14:32",
      user: "admin.sarah@allergan.com",
      action: "Updated data retention policy",
      resource: "System Configuration",
      status: "success"
    },
    {
      timestamp: "Sept 9, 2025 14:15",
      user: "tech.mike@allergan.com", 
      action: "Restarted Facebook API connector",
      resource: "Data Integration",
      status: "success"
    },
    {
      timestamp: "Sept 9, 2025 13:45",
      user: "admin.sarah@allergan.com",
      action: "Exported user access report",
      resource: "Security Audit",
      status: "success"
    },
    {
      timestamp: "Sept 9, 2025 13:20",
      user: "system.auto@allergan.com",
      action: "Automated backup completed",
      resource: "Database Backup",
      status: "success"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'degraded': return AlertTriangle;
      case 'failed': return XCircle;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-success';
      case 'degraded': return 'text-warning';
      case 'failed': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">System Admin / Data Quality Monitor</h2>
        <p className="text-muted-foreground">Comprehensive system health, data quality, and security monitoring</p>
      </div>

      {/* System Health Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              System Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{systemHealth.uptime}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              API Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.apiResponseTime}</div>
            <p className="text-xs text-muted-foreground">Average response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Processing Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.dataProcessingRate}</div>
            <p className="text-xs text-muted-foreground">Records per minute</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Source Status */}
      <Card>
        <CardHeader>
          <CardTitle>Data Source Health Monitoring</CardTitle>
          <CardDescription>Real-time status of all data integration points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataSources.map((source) => {
              const StatusIcon = getStatusIcon(source.status);
              return (
                <div key={source.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex items-center space-x-2">
                      <StatusIcon className={`h-5 w-5 ${getStatusColor(source.status)}`} />
                      <span className="font-medium">{source.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last sync: {source.lastSync}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">{source.recordsProcessed.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Records</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-medium ${source.errorRate > 1 ? 'text-destructive' : 'text-success'}`}>
                        {source.errorRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">Error Rate</div>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs">
                        {source.syncFrequency}
                      </Badge>
                    </div>
                    {source.status === 'failed' && (
                      <Button size="sm" variant="outline">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Data Quality Metrics & Security Alerts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Quality Metrics</CardTitle>
            <CardDescription>Completeness, accuracy, and duplicate analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data Type</TableHead>
                  <TableHead>Completeness</TableHead>
                  <TableHead>Accuracy</TableHead>
                  <TableHead>Duplicates</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataQualityMetrics.map((metric) => (
                  <TableRow key={metric.metric} className={dataQualityMetrics.indexOf(metric) % 2 === 0 ? 'bg-muted/20' : 'bg-background'}>
                    <TableCell className="font-medium">{metric.metric}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={metric.completeness} className="w-16 h-2" />
                        <span className="text-sm">{metric.completeness}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={metric.accuracy} className="w-16 h-2" />
                        <span className="text-sm">{metric.accuracy}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={metric.duplicates > 2 ? "destructive" : "default"} className="text-xs">
                        {metric.duplicates}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
            <CardDescription>Critical security events and anomalies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityAlerts.map((alert, index) => (
                <Alert key={index} className={
                  alert.severity === 'high' ? 'border-destructive bg-destructive/5' :
                  alert.severity === 'medium' ? 'border-secondary bg-secondary/5' :
                  'border-muted bg-muted/5'
                }>
                  <Shield className="h-4 w-4" />
                  <div className="ml-2 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{alert.type}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                    <AlertDescription className="text-sm">
                      {alert.message}
                    </AlertDescription>
                    <div className="text-xs text-muted-foreground mt-1">
                      {alert.timestamp}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Eye className="h-3 w-3" />
                  </Button>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Audit Logs</CardTitle>
              <CardDescription>Recent system actions and user activities</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="text-sm">{log.timestamp}</TableCell>
                  <TableCell className="text-sm font-medium">{log.user}</TableCell>
                  <TableCell className="text-sm">{log.action}</TableCell>
                  <TableCell className="text-sm">{log.resource}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === 'success' ? 'default' : 'destructive'} className="text-xs">
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemAdminDashboard;