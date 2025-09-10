import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { TrendingUp, Users, DollarSign, Award, Gift, Target } from "lucide-react";

const AlleLoyaltyDashboard = () => {
  // Mock data for offers
  const offersData = [
    { id: 101, name: "Botox Welcome Reward", type: "Discount", startDate: "09/01/2025", endDate: "09/30/2025", cost: 5000, status: "Active" },
    { id: 102, name: "Juvederm Points Boost", type: "Points", startDate: "08/15/2025", endDate: "09/15/2025", cost: 3000, status: "Ended" },
    { id: 103, name: "Latisse Referral Bonus", type: "Discount", startDate: "07/01/2025", endDate: "12/31/2025", cost: 2500, status: "Active" }
  ];

  // Mock data for ROI
  const roiData = [
    { id: 101, newPatients: 120, revenue: 18000, cost: 5000, roi: 260 },
    { id: 102, newPatients: 80, revenue: 12000, cost: 3000, roi: 300 },
    { id: 103, newPatients: 200, revenue: 30000, cost: 2500, roi: 1100 }
  ];

  // Channel attribution data
  const channelData = [
    { name: "App / Digital", value: 55, color: "#8b5cf6" },
    { name: "In-Clinic", value: 30, color: "#06b6d4" },
    { name: "Rep-Driven", value: 15, color: "#10b981" }
  ];

  // Funnel data
  const funnelData = [
    { name: "Total Enrolled", value: 1500, color: "#8b5cf6" },
    { name: "Points Earned", value: 1350, color: "#06b6d4" },
    { name: "Points Redeemed", value: 950, color: "#10b981" },
    { name: "First Treatment", value: 800, color: "#f59e0b" },
    { name: "Repeat Treatments", value: 400, color: "#ef4444" }
  ];

  // Top patients data
  const topPatientsData = [
    { name: "Emily Johnson", pointsRedeemed: 450, treatments: 5, revenue: 4500 },
    { name: "Michael Smith", pointsRedeemed: 300, treatments: 3, revenue: 3000 },
    { name: "Sophia Williams", pointsRedeemed: 500, treatments: 6, revenue: 6000 }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      "Active": "default",
      "Ended": "destructive",
      "Upcoming": "secondary"
    };
    return <Badge variant={variants[status as keyof typeof variants] as any}>{status}</Badge>;
  };

  const getROIColor = (roi: number) => {
    if (roi >= 500) return "text-green-600";
    if (roi >= 200) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Allē Loyalty Dashboard</h1>
          <p className="text-muted-foreground">Track loyalty rewards performance and patient acquisition</p>
        </div>
      </div>

      {/* KPI Widgets */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total New Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">400</div>
            <p className="text-xs text-muted-foreground">Acquired through loyalty program</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$60,000</div>
            <p className="text-xs text-muted-foreground">From loyalty program</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">520%</div>
            <p className="text-xs text-muted-foreground">Across all promotions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Redemption Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">70%</div>
            <p className="text-xs text-muted-foreground">Points redeemed rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Offer List Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Active Loyalty Offers
          </CardTitle>
          <CardDescription>View all active and inactive loyalty offers with key metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Offer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Cost ($)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offersData.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.id}</TableCell>
                  <TableCell>{offer.name}</TableCell>
                  <TableCell>{offer.type}</TableCell>
                  <TableCell>{offer.startDate}</TableCell>
                  <TableCell>{offer.endDate}</TableCell>
                  <TableCell>${offer.cost.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(offer.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Channel Attribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Attribution</CardTitle>
            <CardDescription>Which channels drive the most new patients</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Redemption Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Redemption Funnel</CardTitle>
            <CardDescription>Patient journey through loyalty program</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={funnelData}
                layout="horizontal"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ROI Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Offer Performance & ROI
          </CardTitle>
          <CardDescription>Track effectiveness and return on investment for each loyalty offer</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Offer ID</TableHead>
                <TableHead>New Patients</TableHead>
                <TableHead>Revenue ($)</TableHead>
                <TableHead>Cost ($)</TableHead>
                <TableHead>ROI (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roiData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.newPatients}</TableCell>
                  <TableCell>${item.revenue.toLocaleString()}</TableCell>
                  <TableCell>${item.cost.toLocaleString()}</TableCell>
                  <TableCell className={`font-bold ${getROIColor(item.roi)}`}>
                    {item.roi}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Patients / VIP Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Top Patients / VIP Tracker
          </CardTitle>
          <CardDescription>High-value patients based on points redeemed and treatments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Points Redeemed</TableHead>
                <TableHead>Treatments Completed</TableHead>
                <TableHead>Total Revenue ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPatientsData.map((patient, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.pointsRedeemed}</TableCell>
                  <TableCell>{patient.treatments}</TableCell>
                  <TableCell>${patient.revenue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlleLoyaltyDashboard;