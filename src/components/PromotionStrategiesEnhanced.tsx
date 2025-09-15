import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginationTable } from '@/components/ui/pagination-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  Eye, 
  Phone, 
  Mail,
  ChevronDown,
  Filter,
  Download
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, FunnelChart, Funnel, LabelList } from 'recharts';

const PromotionStrategiesEnhanced = () => {
  const [activeTab, setActiveTab] = useState('alle-botox');
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPage, setPatientsPage] = useState(1);
  const [campaignsPage, setCampaignsPage] = useState(1);
  const [showMoreCampaigns, setShowMoreCampaigns] = useState(false);
  const itemsPerPage = 5;

  // Enhanced mock data for Allē Loyalty Dashboard
  const alleCampaigns = {
    'alle-botox': {
      name: "Botox Allē Rewards",
      description: "Premium neurotoxin loyalty program with tiered rewards",
      active: [
        { id: 'A101', name: 'New Patient Botox Bonus', type: 'Points', startDate: '2025-09-01', endDate: '2025-12-31', cost: 15000, status: 'Active', newPatients: 245, revenue: 147000, roi: 880 },
        { id: 'A102', name: 'Botox Birthday Special', type: 'Discount', startDate: '2025-08-15', endDate: '2025-09-30', cost: 8000, status: 'Active', newPatients: 189, revenue: 113400, roi: 1318 },
        { id: 'A103', name: 'Referral Rewards Plus', type: 'Bundle', startDate: '2025-07-01', endDate: '2025-10-31', cost: 12000, status: 'Active', newPatients: 156, revenue: 93600, roi: 680 },
        { id: 'A104', name: 'Loyalty Points Multiplier', type: 'Points', startDate: '2025-09-15', endDate: '2025-11-15', cost: 6000, status: 'Active', newPatients: 98, revenue: 58800, roi: 880 },
        { id: 'A105', name: 'VIP Member Exclusive', type: 'Discount', startDate: '2025-08-01', endDate: '2025-12-31', cost: 20000, status: 'Active', newPatients: 312, revenue: 187200, roi: 836 }
      ],
      channelData: [
        { name: 'Mobile App', value: 42, color: '#8884d8' },
        { name: 'Social Media', value: 28, color: '#82ca9d' },
        { name: 'Email Campaign', value: 18, color: '#ffc658' },
        { name: 'In-Clinic', value: 12, color: '#ff7300' },
        { name: 'Rep-Driven', value: 8, color: '#00ff88' },
        { name: 'Web Portal', value: 15, color: '#ff8042' },
        { name: 'Partner Clinics', value: 22, color: '#0088fe' }
      ],
      funnelSteps: [
        { name: 'Enrolled', value: 2800, fill: '#8884d8' },
        { name: 'Points Earned', value: 2520, fill: '#82ca9d' },
        { name: 'Points Redeemed', value: 1764, fill: '#ffc658' },
        { name: 'First Treatment', value: 1411, fill: '#ff7300' },
        { name: 'Repeat Treatments', value: 846, fill: '#00ff88' }
      ],
      topPatients: [
        { name: 'Sarah Chen', pointsRedeemed: 850, treatments: 8, revenue: 9600, joinDate: '2024-11-15', tier: 'Diamond' },
        { name: 'Michael Rodriguez', pointsRedeemed: 720, treatments: 6, revenue: 7200, joinDate: '2024-12-03', tier: 'Platinum' },
        { name: 'Emily Johnson', pointsRedeemed: 650, treatments: 5, revenue: 6500, joinDate: '2025-01-20', tier: 'Gold' },
        { name: 'David Wilson', pointsRedeemed: 580, treatments: 7, revenue: 8120, joinDate: '2024-10-08', tier: 'Platinum' },
        { name: 'Lisa Thompson', pointsRedeemed: 540, treatments: 4, revenue: 5400, joinDate: '2025-02-14', tier: 'Gold' },
        { name: 'Jennifer Adams', pointsRedeemed: 480, treatments: 6, revenue: 6720, joinDate: '2024-09-25', tier: 'Gold' },
        { name: 'Robert Taylor', pointsRedeemed: 420, treatments: 3, revenue: 3780, joinDate: '2025-03-10', tier: 'Silver' },
        { name: 'Amanda Davis', pointsRedeemed: 380, treatments: 5, revenue: 5320, joinDate: '2024-12-18', tier: 'Gold' }
      ],
      patientJourneyData: [
        { month: 'Jan', enrolled: 180, active: 120, converted: 85, retained: 68 },
        { month: 'Feb', enrolled: 220, active: 165, converted: 112, retained: 89 },
        { month: 'Mar', enrolled: 280, active: 215, converted: 156, retained: 124 },
        { month: 'Apr', enrolled: 320, active: 250, converted: 180, retained: 144 },
        { month: 'May', enrolled: 360, active: 285, converted: 201, retained: 161 },
        { month: 'Jun', enrolled: 290, active: 235, converted: 168, retained: 134 }
      ]
    },
    'alle-juvederm': {
      name: "Juvederm Allē Collection",
      description: "Dermal filler rewards with volume-based incentives",
      active: [
        { id: 'B201', name: 'Juvederm Volume Rewards', type: 'Points', startDate: '2025-08-01', endDate: '2025-11-30', cost: 18000, status: 'Active', newPatients: 198, revenue: 138600, roi: 670 },
        { id: 'B202', name: 'Lip Enhancement Package', type: 'Bundle', startDate: '2025-09-01', endDate: '2025-12-15', cost: 14000, status: 'Active', newPatients: 167, revenue: 116900, roi: 735 },
        { id: 'B203', name: 'Touch-Up Guarantee', type: 'Discount', startDate: '2025-07-15', endDate: '2025-10-15', cost: 9500, status: 'Active', newPatients: 134, revenue: 93800, roi: 887 }
      ],
      channelData: [
        { name: 'Mobile App', value: 38, color: '#8884d8' },
        { name: 'Social Media', value: 35, color: '#82ca9d' },
        { name: 'In-Clinic', value: 20, color: '#ffc658' },
        { name: 'Rep-Driven', value: 15, color: '#ff7300' },
        { name: 'Email Campaign', value: 12, color: '#00ff88' }
      ],
      funnelSteps: [
        { name: 'Enrolled', value: 2100, fill: '#8884d8' },
        { name: 'Points Earned', value: 1890, fill: '#82ca9d' },
        { name: 'Points Redeemed', value: 1323, fill: '#ffc658' },
        { name: 'First Treatment', value: 1058, fill: '#ff7300' },
        { name: 'Repeat Treatments', value: 635, fill: '#00ff88' }
      ],
      topPatients: [
        { name: 'Jessica Martinez', pointsRedeemed: 920, treatments: 9, revenue: 12420, joinDate: '2024-10-12', tier: 'Diamond' },
        { name: 'Rachel Green', pointsRedeemed: 780, treatments: 7, revenue: 9360, joinDate: '2024-11-28', tier: 'Platinum' },
        { name: 'Ashley Brown', pointsRedeemed: 680, treatments: 6, revenue: 8160, joinDate: '2025-01-05', tier: 'Gold' },
        { name: 'Nicole White', pointsRedeemed: 580, treatments: 5, revenue: 6960, joinDate: '2024-12-20', tier: 'Gold' }
      ],
      patientJourneyData: [
        { month: 'Jan', enrolled: 150, active: 105, converted: 72, retained: 58 },
        { month: 'Feb', enrolled: 185, active: 138, converted: 94, retained: 75 },
        { month: 'Mar', enrolled: 220, active: 165, converted: 115, retained: 92 },
        { month: 'Apr', enrolled: 245, active: 184, converted: 129, retained: 103 },
        { month: 'May', enrolled: 280, active: 210, converted: 147, retained: 118 },
        { month: 'Jun', enrolled: 310, active: 232, converted: 163, retained: 130 }
      ]
    }
  };

  const currentCampaignData = alleCampaigns[activeTab as keyof typeof alleCampaigns];
  
  // Pagination logic
  const totalCampaigns = currentCampaignData.active.length;
  const totalPages = Math.ceil(totalCampaigns / itemsPerPage);
  const visibleCampaigns = showMoreCampaigns ? currentCampaignData.active : currentCampaignData.active.slice(0, 3);
  
  const paginatedPatients = currentCampaignData.topPatients.slice(
    (patientsPage - 1) * itemsPerPage,
    patientsPage * itemsPerPage
  );
  
  const patientTotalPages = Math.ceil(currentCampaignData.topPatients.length / itemsPerPage);

  // KPI calculations
  const totalNewPatients = currentCampaignData.active.reduce((sum, campaign) => sum + campaign.newPatients, 0);
  const totalRevenue = currentCampaignData.active.reduce((sum, campaign) => sum + campaign.revenue, 0);
  const totalCost = currentCampaignData.active.reduce((sum, campaign) => sum + campaign.cost, 0);
  const averageROI = Math.round((totalRevenue - totalCost) / totalCost * 100);
  const redemptionRate = Math.round((currentCampaignData.funnelSteps[2]?.value / currentCampaignData.funnelSteps[1]?.value) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Promotion Strategies</h2>
          <p className="text-muted-foreground">Allē Loyalty Program Analytics by Product Line</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alle-botox">Botox Allē Rewards</TabsTrigger>
          <TabsTrigger value="alle-juvederm">Juvederm Allē Collection</TabsTrigger>
          <TabsTrigger value="alle-coolsculpting">CoolSculpting Allē</TabsTrigger>
        </TabsList>

        {Object.entries(alleCampaigns).map(([key, data]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            {/* KPI Dashboard */}
            <div className="grid md:grid-cols-5 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    New Patients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalNewPatients.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</div>
                  <p className="text-xs text-muted-foreground">Program revenue</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Average ROI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{averageROI}%</div>
                  <p className="text-xs text-muted-foreground">Across all campaigns</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Redemption Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{redemptionRate}%</div>
                  <p className="text-xs text-muted-foreground">Points to treatments</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    VIP Patients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.topPatients.filter(p => p.tier === 'Diamond' || p.tier === 'Platinum').length}</div>
                  <p className="text-xs text-muted-foreground">Diamond & Platinum</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Campaigns Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Campaigns</CardTitle>
                    <CardDescription>Current {data.name} promotions and performance</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowMoreCampaigns(!showMoreCampaigns)}
                  >
                    {showMoreCampaigns ? 'Show Less' : 'Show More'}
                    <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showMoreCampaigns ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>New Patients</TableHead>
                      <TableHead>ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.id}</TableCell>
                        <TableCell>{campaign.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{campaign.type}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {campaign.startDate} - {campaign.endDate}
                        </TableCell>
                        <TableCell>${campaign.cost.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="default">{campaign.status}</Badge>
                        </TableCell>
                        <TableCell>{campaign.newPatients}</TableCell>
                        <TableCell>
                          <Badge variant={campaign.roi > 500 ? "default" : "secondary"}>
                            {campaign.roi}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Channel Attribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Channel Attribution</CardTitle>
                  <CardDescription>Patient acquisition by channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data.channelData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {data.channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Patient Journey Funnel */}
              <Card>
                <CardHeader>
                  <CardTitle>Patient Journey</CardTitle>
                  <CardDescription>Conversion funnel analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data.patientJourneyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="enrolled" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="active" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="converted" stackId="3" stroke="#ffc658" fill="#ffc658" />
                      <Area type="monotone" dataKey="retained" stackId="4" stroke="#ff7300" fill="#ff7300" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Campaign ROI Performance */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Campaign ROI Performance</CardTitle>
                    <CardDescription>Detailed performance metrics by campaign</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>New Patients</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>ROI %</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.active.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{campaign.newPatients}</TableCell>
                        <TableCell>${campaign.revenue.toLocaleString()}</TableCell>
                        <TableCell>${campaign.cost.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={campaign.roi > 500 ? "default" : campaign.roi > 300 ? "secondary" : "destructive"}>
                            {campaign.roi}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Performing Patients */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Patients</CardTitle>
                <CardDescription>VIP customers by points and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Points Redeemed</TableHead>
                      <TableHead>Treatments</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Join Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedPatients.map((patient) => (
                      <TableRow key={patient.name}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.pointsRedeemed}</TableCell>
                        <TableCell>{patient.treatments}</TableCell>
                        <TableCell>${patient.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            patient.tier === 'Diamond' ? "default" : 
                            patient.tier === 'Platinum' ? "secondary" : "outline"
                          }>
                            {patient.tier}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{patient.joinDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <PaginationTable
                    currentPage={patientsPage}
                    totalPages={patientTotalPages}
                    onPageChange={setPatientsPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={data.topPatients.length}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PromotionStrategiesEnhanced;