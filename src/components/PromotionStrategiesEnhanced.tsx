import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginationTable } from '@/components/ui/pagination-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  const [activeTab, setActiveTab] = useState('alle');
  const [patientsPage, setPatientsPage] = useState(1);
  const [campaignsPage, setCampaignsPage] = useState(1);
  const [showMoreCampaigns, setShowMoreCampaigns] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaignDetailsOpen, setCampaignDetailsOpen] = useState(false);
  const itemsPerPage = 4;

  // Enhanced mock data for all promotion categories
  const alleCampaigns = {
    'alle': {
      name: "Allē Loyalty Program",
      description: "Comprehensive loyalty platform for all Allergan products",
      active: [
        { id: 'AL001', name: 'Universal Points Program', type: 'Points', startDate: '2025-09-01', endDate: '2025-12-31', cost: 25000, status: 'Active', newPatients: 425, revenue: 255000, roi: 920 },
        { id: 'AL002', name: 'Member Milestone Rewards', type: 'Discount', startDate: '2025-08-15', endDate: '2025-11-30', cost: 15000, status: 'Active', newPatients: 289, revenue: 173400, roi: 1056 },
        { id: 'AL003', name: 'VIP Access Benefits', type: 'Bundle', startDate: '2025-07-01', endDate: '2025-10-31', cost: 18000, status: 'Active', newPatients: 256, revenue: 153600, roi: 754 },
        { id: 'AL004', name: 'Birthday Month Special', type: 'Discount', startDate: '2025-09-01', endDate: '2025-12-31', cost: 10000, status: 'Active', newPatients: 198, revenue: 118800, roi: 1088 },
        { id: 'AL005', name: 'Loyalty Tier Upgrade', type: 'Points', startDate: '2025-08-01', endDate: '2025-12-31', cost: 30000, status: 'Active', newPatients: 412, revenue: 247200, roi: 724 }
      ],
      channelData: [
        { name: 'Mobile App', value: 38, color: 'hsl(220, 70%, 50%)' },
        { name: 'Social Media', value: 25, color: 'hsl(160, 60%, 45%)' },
        { name: 'Email Campaign', value: 20, color: 'hsl(35, 85%, 55%)' },
        { name: 'In-Clinic', value: 17, color: 'hsl(260, 75%, 60%)' }
      ],
      patientJourneyData: [
        { month: 'Jul', enrolled: 2400, active: 2200, converted: 1800, retained: 1600 },
        { month: 'Aug', enrolled: 2600, active: 2350, converted: 1950, retained: 1750 },
        { month: 'Sep', enrolled: 2800, active: 2500, converted: 2100, retained: 1900 }
      ],
      topPatients: [
        { name: "Sarah Johnson", pointsRedeemed: 4500, treatments: 8, revenue: 6200, tier: "Diamond", joinDate: "2024-01-15" },
        { name: "Emma Wilson", pointsRedeemed: 3200, treatments: 6, revenue: 4800, tier: "Platinum", joinDate: "2024-02-20" },
        { name: "Olivia Brown", pointsRedeemed: 2800, treatments: 5, revenue: 3900, tier: "Gold", joinDate: "2024-03-10" },
        { name: "Ava Davis", pointsRedeemed: 2200, treatments: 4, revenue: 2800, tier: "Silver", joinDate: "2024-04-05" }
      ]
    },
    'refer-friend': {
      name: "Refer-a-Friend Program",
      description: "Patient referral rewards and incentives",
      active: [
        { id: 'RF001', name: 'Friend Referral Bonus', type: 'Cash Reward', startDate: '2025-09-01', endDate: '2025-12-31', cost: 20000, status: 'Active', newPatients: 345, revenue: 207000, roi: 935 },
        { id: 'RF002', name: 'Double Rewards Weekend', type: 'Multiplier', startDate: '2025-08-15', endDate: '2025-10-15', cost: 12000, status: 'Active', newPatients: 234, revenue: 140400, roi: 1070 },
        { id: 'RF003', name: 'Family & Friends Special', type: 'Group Discount', startDate: '2025-07-01', endDate: '2025-11-30', cost: 16000, status: 'Active', newPatients: 198, revenue: 118800, roi: 643 },
        { id: 'RF004', name: 'Referrer Rewards Program', type: 'Points', startDate: '2025-09-10', endDate: '2025-12-31', cost: 8000, status: 'Active', newPatients: 156, revenue: 93600, roi: 1070 }
      ],
      channelData: [
        { name: 'Word of Mouth', value: 45, color: 'hsl(220, 70%, 50%)' },
        { name: 'Social Sharing', value: 28, color: 'hsl(160, 60%, 45%)' },
        { name: 'Text Referrals', value: 15, color: 'hsl(35, 85%, 55%)' },
        { name: 'Email Invites', value: 12, color: 'hsl(260, 75%, 60%)' }
      ],
      patientJourneyData: [
        { month: 'Jul', enrolled: 1800, active: 1600, converted: 1300, retained: 1100 },
        { month: 'Aug', enrolled: 2100, active: 1850, converted: 1500, retained: 1280 },
        { month: 'Sep', enrolled: 2300, active: 2000, converted: 1650, retained: 1400 }
      ],
      topPatients: [
        { name: "Lisa Martinez", pointsRedeemed: 2800, treatments: 5, revenue: 3400, tier: "Gold", joinDate: "2024-03-10" },
        { name: "Jennifer Lee", pointsRedeemed: 3100, treatments: 7, revenue: 4200, tier: "Platinum", joinDate: "2024-01-28" },
        { name: "Maria Garcia", pointsRedeemed: 2400, treatments: 4, revenue: 2800, tier: "Silver", joinDate: "2024-04-15" },
        { name: "Ashley Taylor", pointsRedeemed: 2900, treatments: 6, revenue: 3600, tier: "Gold", joinDate: "2024-02-18" }
      ]
    },
    'branded': {
      name: "Branded Partnerships",
      description: "Co-marketing campaigns with beauty and lifestyle brands",
      active: [
        { id: 'BR001', name: 'Beauty Brand Collab', type: 'Partnership', startDate: '2025-09-01', endDate: '2025-11-30', cost: 35000, status: 'Active', newPatients: 456, revenue: 273600, roi: 682 },
        { id: 'BR002', name: 'Fashion Week Sponsorship', type: 'Event', startDate: '2025-08-20', endDate: '2025-09-30', cost: 28000, status: 'Active', newPatients: 389, revenue: 233400, roi: 734 },
        { id: 'BR003', name: 'Lifestyle Influencer Partnership', type: 'Influencer', startDate: '2025-07-15', endDate: '2025-10-15', cost: 22000, status: 'Active', newPatients: 298, revenue: 178800, roi: 713 }
      ],
      channelData: [
        { name: 'Brand Websites', value: 32, color: 'hsl(220, 70%, 50%)' },
        { name: 'Co-Branded Content', value: 28, color: 'hsl(160, 60%, 45%)' },
        { name: 'Event Marketing', value: 25, color: 'hsl(35, 85%, 55%)' },
        { name: 'Cross-Promotion', value: 15, color: 'hsl(260, 75%, 60%)' }
      ],
      patientJourneyData: [
        { month: 'Jul', enrolled: 2200, active: 1980, converted: 1650, retained: 1420 },
        { month: 'Aug', enrolled: 2500, active: 2200, converted: 1850, retained: 1600 },
        { month: 'Sep', enrolled: 2700, active: 2350, converted: 1980, retained: 1720 }
      ],
      topPatients: [
        { name: "Grace Chen", pointsRedeemed: 3800, treatments: 9, revenue: 5400, tier: "Diamond", joinDate: "2024-02-14" },
        { name: "Sophia Rodriguez", pointsRedeemed: 2900, treatments: 6, revenue: 3800, tier: "Gold", joinDate: "2024-04-05" },
        { name: "Isabella White", pointsRedeemed: 3200, treatments: 7, revenue: 4200, tier: "Platinum", joinDate: "2024-03-22" },
        { name: "Mia Anderson", pointsRedeemed: 2600, treatments: 5, revenue: 3200, tier: "Silver", joinDate: "2024-05-08" }
      ]
    },
    'multi-service': {
      name: "Multi-Service Packages",
      description: "Bundled treatment promotions and service combinations",
      active: [
        { id: 'MS001', name: 'Total Transformation Package', type: 'Bundle', startDate: '2025-09-01', endDate: '2025-12-31', cost: 18000, status: 'Active', newPatients: 234, revenue: 140400, roi: 680 },
        { id: 'MS002', name: 'Quarterly Touch-Up Plan', type: 'Subscription', startDate: '2025-08-01', endDate: '2025-12-31', cost: 15000, status: 'Active', newPatients: 198, revenue: 118800, roi: 692 },
        { id: 'MS003', name: 'Comprehensive Care Bundle', type: 'Package', startDate: '2025-07-20', endDate: '2025-11-20', cost: 25000, status: 'Active', newPatients: 312, revenue: 187200, roi: 649 }
      ],
      channelData: [
        { name: 'Clinic Consultation', value: 40, color: 'hsl(220, 70%, 50%)' },
        { name: 'Treatment Advisor', value: 30, color: 'hsl(160, 60%, 45%)' },
        { name: 'Package Brochures', value: 20, color: 'hsl(35, 85%, 55%)' },
        { name: 'Online Booking', value: 10, color: 'hsl(260, 75%, 60%)' }
      ],
      patientJourneyData: [
        { month: 'Jul', enrolled: 1600, active: 1450, converted: 1200, retained: 1050 },
        { month: 'Aug', enrolled: 1850, active: 1650, converted: 1380, retained: 1200 },
        { month: 'Sep', enrolled: 2000, active: 1780, converted: 1500, retained: 1320 }
      ],
      topPatients: [
        { name: "Rachel Kim", pointsRedeemed: 4200, treatments: 12, revenue: 7800, tier: "Diamond", joinDate: "2024-01-08" },
        { name: "Amanda Foster", pointsRedeemed: 3500, treatments: 8, revenue: 5600, tier: "Platinum", joinDate: "2024-03-22" },
        { name: "Hannah Moore", pointsRedeemed: 3000, treatments: 7, revenue: 4900, tier: "Gold", joinDate: "2024-04-12" },
        { name: "Chloe Williams", pointsRedeemed: 2700, treatments: 6, revenue: 4200, tier: "Silver", joinDate: "2024-05-15" }
      ]
    },
    'gift': {
      name: "Gift Card Programs",
      description: "Gift card promotions and seasonal gifting campaigns",
      active: [
        { id: 'GF001', name: 'Holiday Gift Card Bonus', type: 'Bonus Value', startDate: '2025-11-01', endDate: '2025-12-31', cost: 12000, status: 'Active', newPatients: 289, revenue: 173400, roi: 1345 },
        { id: 'GF002', name: 'Mother\'s Day Special', type: 'Gift Promotion', startDate: '2025-04-15', endDate: '2025-05-15', cost: 8000, status: 'Completed', newPatients: 156, revenue: 93600, roi: 1070 },
        { id: 'GF003', name: 'BOGO Gift Card Event', type: 'Buy One Get One', startDate: '2025-09-15', endDate: '2025-10-31', cost: 15000, status: 'Active', newPatients: 234, revenue: 140400, roi: 836 }
      ],
      channelData: [
        { name: 'Online Store', value: 35, color: 'hsl(220, 70%, 50%)' },
        { name: 'Clinic Purchase', value: 30, color: 'hsl(160, 60%, 45%)' },
        { name: 'Gift Recipients', value: 25, color: 'hsl(35, 85%, 55%)' },
        { name: 'Corporate Sales', value: 10, color: 'hsl(260, 75%, 60%)' }
      ],
      patientJourneyData: [
        { month: 'Jul', enrolled: 1400, active: 1250, converted: 1050, retained: 900 },
        { month: 'Aug', enrolled: 1650, active: 1480, converted: 1250, retained: 1080 },
        { month: 'Sep', enrolled: 1800, active: 1600, converted: 1350, retained: 1180 }
      ],
      topPatients: [
        { name: "Michelle Taylor", pointsRedeemed: 2600, treatments: 4, revenue: 2800, tier: "Silver", joinDate: "2024-05-12" },
        { name: "Jessica Wong", pointsRedeemed: 3200, treatments: 6, revenue: 4200, tier: "Gold", joinDate: "2024-02-28" },
        { name: "Natalie Thompson", pointsRedeemed: 2800, treatments: 5, revenue: 3400, tier: "Silver", joinDate: "2024-06-10" },
        { name: "Samantha Lee", pointsRedeemed: 3600, treatments: 7, revenue: 4800, tier: "Platinum", joinDate: "2024-01-20" }
      ]
    },
    'influencer': {
      name: "Influencer/User Generated Content",
      description: "Influencer partnerships and user-generated content campaigns",
      active: [
        { id: 'INF001', name: 'Micro-Influencer Campaign', type: 'Influencer', startDate: '2025-09-01', endDate: '2025-11-30', cost: 22000, status: 'Active', newPatients: 378, revenue: 226800, roi: 931 },
        { id: 'INF002', name: 'UGC Challenge Contest', type: 'Contest', startDate: '2025-08-15', endDate: '2025-10-15', cost: 8000, status: 'Active', newPatients: 145, revenue: 87000, roi: 987 },
        { id: 'INF003', name: 'Beauty Blogger Partnerships', type: 'Content', startDate: '2025-07-01', endDate: '2025-12-31', cost: 30000, status: 'Active', newPatients: 445, revenue: 267000, roi: 790 }
      ],
      channelData: [
        { name: 'Instagram', value: 42, color: 'hsl(220, 70%, 50%)' },
        { name: 'TikTok', value: 28, color: 'hsl(160, 60%, 45%)' },
        { name: 'YouTube', value: 18, color: 'hsl(35, 85%, 55%)' },
        { name: 'Blog Content', value: 12, color: 'hsl(260, 75%, 60%)' }
      ],
      patientJourneyData: [
        { month: 'Jul', enrolled: 2000, active: 1800, converted: 1500, retained: 1300 },
        { month: 'Aug', enrolled: 2300, active: 2050, converted: 1720, retained: 1500 },
        { month: 'Sep', enrolled: 2550, active: 2280, converted: 1920, retained: 1680 }
      ],
      topPatients: [
        { name: "Zoe Mitchell", pointsRedeemed: 3600, treatments: 7, revenue: 4900, tier: "Platinum", joinDate: "2024-04-18" },
        { name: "Chloe Anderson", pointsRedeemed: 2800, treatments: 5, revenue: 3600, tier: "Gold", joinDate: "2024-06-03" },
        { name: "Madison Clark", pointsRedeemed: 3200, treatments: 6, revenue: 4200, tier: "Gold", joinDate: "2024-05-08" },
        { name: "Lily Robinson", pointsRedeemed: 4100, treatments: 8, revenue: 5400, tier: "Diamond", joinDate: "2024-03-15" }
      ]
    },
    'practice': {
      name: "Practice Development",
      description: "Training and development programs for medical practices",
      active: [
        { id: 'PR001', name: 'Practice Excellence Program', type: 'Training', startDate: '2025-09-01', endDate: '2025-12-31', cost: 40000, status: 'Active', newPatients: 156, revenue: 312000, roi: 680 },
        { id: 'PR002', name: 'Staff Certification Course', type: 'Education', startDate: '2025-08-15', endDate: '2025-11-15', cost: 25000, status: 'Active', newPatients: 89, revenue: 178000, roi: 612 },
        { id: 'PR003', name: 'Marketing Support Package', type: 'Support', startDate: '2025-07-01', endDate: '2025-12-31', cost: 30000, status: 'Active', newPatients: 234, revenue: 280800, roi: 836 }
      ],
      channelData: [
        { name: 'Training Sessions', value: 45, color: 'hsl(220, 70%, 50%)' },
        { name: 'Online Courses', value: 25, color: 'hsl(160, 60%, 45%)' },
        { name: 'Certification Programs', value: 20, color: 'hsl(35, 85%, 55%)' },
        { name: 'Workshops', value: 10, color: 'hsl(260, 75%, 60%)' }
      ],
      patientJourneyData: [
        { month: 'Jul', enrolled: 800, active: 720, converted: 600, retained: 520 },
        { month: 'Aug', enrolled: 950, active: 850, converted: 710, retained: 620 },
        { month: 'Sep', enrolled: 1100, active: 980, converted: 820, retained: 720 }
      ],
      topPatients: [
        { name: "Dr. Maria Santos", pointsRedeemed: 1500, treatments: 15, revenue: 12000, tier: "Partner", joinDate: "2024-01-10" },
        { name: "Dr. James Peterson", pointsRedeemed: 1200, treatments: 12, revenue: 9600, tier: "Associate", joinDate: "2024-02-15" },
        { name: "Dr. Sarah Kim", pointsRedeemed: 1350, treatments: 13, revenue: 10400, tier: "Partner", joinDate: "2024-01-25" },
        { name: "Dr. Michael Chang", pointsRedeemed: 1100, treatments: 11, revenue: 8800, tier: "Associate", joinDate: "2024-03-05" }
      ]
    },
    'educational': {
      name: "Educational Content",
      description: "Patient education and awareness campaigns",
      active: [
        { id: 'ED001', name: 'Treatment Education Series', type: 'Content', startDate: '2025-09-01', endDate: '2025-12-31', cost: 18000, status: 'Active', newPatients: 289, revenue: 173400, roi: 863 },
        { id: 'ED002', name: 'Before & After Showcase', type: 'Visual Content', startDate: '2025-08-15', endDate: '2025-11-30', cost: 12000, status: 'Active', newPatients: 198, revenue: 118800, roi: 890 },
        { id: 'ED003', name: 'FAQ Video Library', type: 'Video Content', startDate: '2025-07-20', endDate: '2025-10-31', cost: 15000, status: 'Active', newPatients: 234, revenue: 140400, roi: 836 }
      ],
      channelData: [
        { name: 'Website Blog', value: 35, color: 'hsl(220, 70%, 50%)' },
        { name: 'Video Content', value: 30, color: 'hsl(160, 60%, 45%)' },
        { name: 'Social Posts', value: 25, color: 'hsl(35, 85%, 55%)' },
        { name: 'Email Newsletters', value: 10, color: 'hsl(260, 75%, 60%)' }
      ],
      patientJourneyData: [
        { month: 'Jul', enrolled: 1200, active: 1080, converted: 900, retained: 780 },
        { month: 'Aug', enrolled: 1400, active: 1250, converted: 1050, retained: 920 },
        { month: 'Sep', enrolled: 1600, active: 1420, converted: 1200, retained: 1050 }
      ],
      topPatients: [
        { name: "Nicole Davis", pointsRedeemed: 2400, treatments: 4, revenue: 2800, tier: "Silver", joinDate: "2024-05-20" },
        { name: "Stephanie Clark", pointsRedeemed: 2900, treatments: 5, revenue: 3400, tier: "Gold", joinDate: "2024-04-08" },
        { name: "Lauren Martinez", pointsRedeemed: 2600, treatments: 4, revenue: 3000, tier: "Silver", joinDate: "2024-06-12" },
        { name: "Taylor Johnson", pointsRedeemed: 3100, treatments: 6, revenue: 3800, tier: "Gold", joinDate: "2024-03-18" }
      ]
    }
  };

  const data = alleCampaigns[activeTab as keyof typeof alleCampaigns] || alleCampaigns.alle;
  
  // Pagination logic
  const totalCampaigns = showMoreCampaigns ? data.active.length : Math.min(4, data.active.length);
  const campaignTotalPages = Math.ceil(totalCampaigns / itemsPerPage);
  const paginatedCampaigns = data.active.slice(
    (campaignsPage - 1) * itemsPerPage,
    Math.min(campaignsPage * itemsPerPage, totalCampaigns)
  );

  const patientTotalPages = Math.ceil(data.topPatients.length / itemsPerPage);
  const paginatedPatients = data.topPatients.slice(
    (patientsPage - 1) * itemsPerPage,
    patientsPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Promotion Strategies</h2>
          <p className="text-muted-foreground">Comprehensive promotion management and performance analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="alle">Allē</TabsTrigger>
          <TabsTrigger value="refer-friend">Refer-a-Friend</TabsTrigger>
          <TabsTrigger value="branded">Branded</TabsTrigger>
          <TabsTrigger value="multi-service">Multi-service</TabsTrigger>
          <TabsTrigger value="gift">Gift</TabsTrigger>
          <TabsTrigger value="influencer">Influencer/User</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="educational">Educational</TabsTrigger>
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
                  <div className="text-2xl font-bold">{data.active.reduce((sum, campaign) => sum + campaign.newPatients, 0).toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${(data.active.reduce((sum, campaign) => sum + campaign.revenue, 0) / 1000).toFixed(0)}K</div>
                  <p className="text-xs text-muted-foreground">+22% growth</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Avg ROI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{Math.round(data.active.reduce((sum, campaign) => sum + campaign.roi, 0) / data.active.length)}%</div>
                  <p className="text-xs text-muted-foreground">Above target</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Active Campaigns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.active.length}</div>
                  <p className="text-xs text-muted-foreground">Running now</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Total Spend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${(data.active.reduce((sum, campaign) => sum + campaign.cost, 0) / 1000).toFixed(0)}K</div>
                  <p className="text-xs text-muted-foreground">This period</p>
                </CardContent>
              </Card>
            </div>

            {/* Active Campaigns */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Campaigns</CardTitle>
                    <CardDescription>{data.name} - Current promotion activities</CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowMoreCampaigns(!showMoreCampaigns)}
                  >
                    {showMoreCampaigns ? 'Show Less' : 'Show More'}
                    <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showMoreCampaigns ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paginatedCampaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">{campaign.type}</Badge>
                              <Badge variant={campaign.status === 'Active' ? "default" : "secondary"}>
                                {campaign.status}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-lg">{campaign.name}</h4>
                          </div>
                           <div className="flex items-center justify-center space-x-8 text-sm">
                             <div className="text-center">
                               <div className="font-semibold text-foreground text-base">${campaign.cost.toLocaleString()}</div>
                               <div className="text-xs text-muted-foreground">Cost</div>
                             </div>
                             <div className="text-center">
                               <div className="font-semibold text-foreground text-base">{campaign.newPatients}</div>
                               <div className="text-xs text-muted-foreground">New Patients</div>
                             </div>
                             <div className="text-center">
                               <div className="font-semibold text-foreground text-base">${campaign.revenue.toLocaleString()}</div>
                               <div className="text-xs text-muted-foreground">Revenue</div>
                             </div>
                           </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Period: {campaign.startDate} to {campaign.endDate}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge variant="outline" className="text-success border-success">
                          {campaign.roi}% ROI
                        </Badge>
                        <Dialog open={campaignDetailsOpen} onOpenChange={setCampaignDetailsOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedCampaign(campaign)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Campaign Details</DialogTitle>
                              <DialogDescription>
                                Detailed information about {selectedCampaign?.name}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedCampaign && (
                              <div className="space-y-6">
                                {/* Campaign Overview */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <Card>
                                    <CardContent className="pt-4">
                                      <div className="text-2xl font-bold">${selectedCampaign.cost.toLocaleString()}</div>
                                      <p className="text-xs text-muted-foreground">Total Cost</p>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="pt-4">
                                      <div className="text-2xl font-bold">{selectedCampaign.newPatients}</div>
                                      <p className="text-xs text-muted-foreground">New Patients</p>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="pt-4">
                                      <div className="text-2xl font-bold">${selectedCampaign.revenue.toLocaleString()}</div>
                                      <p className="text-xs text-muted-foreground">Revenue Generated</p>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="pt-4">
                                      <div className="text-2xl font-bold text-success">{selectedCampaign.roi}%</div>
                                      <p className="text-xs text-muted-foreground">ROI</p>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Campaign Details */}
                                <div className="grid md:grid-cols-2 gap-6">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Campaign Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Campaign Type:</span>
                                        <Badge variant="secondary">{selectedCampaign.type}</Badge>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Status:</span>
                                        <Badge variant={selectedCampaign.status === 'Active' ? "default" : "secondary"}>
                                          {selectedCampaign.status}
                                        </Badge>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Start Date:</span>
                                        <span>{selectedCampaign.startDate}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">End Date:</span>
                                        <span>{selectedCampaign.endDate}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Campaign ID:</span>
                                        <span className="font-mono text-sm">{selectedCampaign.id}</span>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Cost Per Patient:</span>
                                        <span>${Math.round(selectedCampaign.cost / selectedCampaign.newPatients)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Revenue Per Patient:</span>
                                        <span>${Math.round(selectedCampaign.revenue / selectedCampaign.newPatients)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Profit Margin:</span>
                                        <span className="text-success">
                                          {Math.round(((selectedCampaign.revenue - selectedCampaign.cost) / selectedCampaign.revenue) * 100)}%
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Net Profit:</span>
                                        <span className="font-bold text-success">
                                          ${(selectedCampaign.revenue - selectedCampaign.cost).toLocaleString()}
                                        </span>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => setCampaignDetailsOpen(false)}>
                                    Close
                                  </Button>
                                  <Button>
                                    Edit Campaign
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
                {showMoreCampaigns && (
                  <div className="mt-4">
                    <PaginationTable
                      currentPage={campaignsPage}
                      totalPages={campaignTotalPages}
                      onPageChange={setCampaignsPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={totalCampaigns}
                    />
                  </div>
                )}
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
                  <CardTitle>
                    <span className="group cursor-default">
                      <span className="group-hover:hidden">Patient Journey</span>
                      <span className="hidden group-hover:inline">Patient Journey</span>
                    </span>
                  </CardTitle>
                  <CardDescription>Conversion funnel analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data.patientJourneyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '6px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value, name) => [
                          value,
                          String(name).charAt(0).toUpperCase() + String(name).slice(1)
                        ]}
                      />
                      <Area type="monotone" dataKey="enrolled" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.8} />
                      <Area type="monotone" dataKey="active" stackId="2" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.7} />
                      <Area type="monotone" dataKey="converted" stackId="3" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="retained" stackId="4" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4))" fillOpacity={0.5} />
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
                    <CardDescription>Return on investment analysis by campaign</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data.active} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="roi" 
                      fill="hsl(var(--chart-1))" 
                      radius={[4, 4, 0, 0]}
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={1}
                    />
                  </BarChart>
                </ResponsiveContainer>
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
                            patient.tier === 'Platinum' ? "secondary" : 
                            patient.tier === 'Gold' ? "outline" :
                            patient.tier === 'Partner' ? "default" :
                            patient.tier === 'Associate' ? "secondary" : "outline"
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