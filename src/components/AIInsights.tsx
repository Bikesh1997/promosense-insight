import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Brain, TrendingUp, Target, Users, DollarSign, AlertTriangle, CheckCircle, Clock, Lightbulb, Zap } from "lucide-react";

const AIInsights = () => {
  const { toast } = useToast();

  const handleConfigureAI = () => {
    toast({
      title: "AI Configuration",
      description: "Opening AI engine configuration panel...",
    });
  };

  const handleViewDetails = (recommendationId: number) => {
    toast({
      title: "Recommendation Details",
      description: `Opening detailed analysis for recommendation ${recommendationId}...`,
    });
  };

  const handleSchedule = (recommendationId: number) => {
    toast({
      title: "Scheduled",
      description: `Recommendation ${recommendationId} has been scheduled for implementation.`,
    });
  };

  const handleImplementNow = (recommendationId: number, title: string) => {
    toast({
      title: "Implementation Started",
      description: `${title} is being implemented immediately.`,
    });
  };

  const handleShareBestPractices = () => {
    toast({
      title: "Best Practices Shared",
      description: "Performance insights have been shared with the team.",
    });
  };

  const handleScheduleCoaching = () => {
    toast({
      title: "Coaching Scheduled",
      description: "Training session has been scheduled for the team member.",
    });
  };

  const handleLearnMore = (opportunityTitle: string) => {
    toast({
      title: "Learn More",
      description: `Opening detailed analysis for ${opportunityTitle}...`,
    });
  };

  const handleCreateCampaign = (opportunityTitle: string) => {
    toast({
      title: "Campaign Created",
      description: `New campaign for ${opportunityTitle} has been initiated.`,
    });
  };
  // AI Recommendations
  const recommendations = [
    {
      id: 1,
      type: "promotion",
      priority: "high",
      title: "Optimize Botox Spring Campaign Budget",
      description: "Increase Facebook Ads budget by $15,000 and reduce Google Ads by same amount for 23% better ROI",
      impact: "Expected +$34,500 additional revenue",
      confidence: 89,
      action: "reallocate_budget",
      timeframe: "immediate"
    },
    {
      id: 2,
      type: "churn",
      priority: "critical",
      title: "Prevent High-Value Patient Churn",
      description: "14 patients with LTV >$8K showing churn signals. Immediate personalized outreach recommended",
      impact: "Retain up to $112,000 in LTV",
      confidence: 92,
      action: "assign_rep",
      timeframe: "24_hours"
    },
    {
      id: 3,
      type: "lead_routing",
      priority: "medium",
      title: "Improve Lead Assignment Efficiency",
      description: "Route Juvederm inquiries to specialists for 18% higher conversion rates",
      impact: "Expected +67 additional conversions/month",
      confidence: 76,
      action: "update_routing",
      timeframe: "this_week"
    },
    {
      id: 4,
      type: "pricing",
      priority: "high",
      title: "Dynamic Promotion Pricing",
      description: "Adjust SkinMedica bundle pricing based on regional demand patterns",
      impact: "Expected +12% conversion improvement",
      confidence: 83,
      action: "update_pricing",
      timeframe: "next_week"
    }
  ];

  // Predictive analytics data
  const predictions = [
    {
      metric: "Lead Generation",
      current: 1247,
      predicted: 1456,
      change: 16.8,
      confidence: 87,
      timeframe: "next_month"
    },
    {
      metric: "Conversion Rate",
      current: 24.3,
      predicted: 26.7,
      change: 9.9,
      confidence: 82,
      timeframe: "next_month"
    },
    {
      metric: "Patient LTV",
      current: 3650,
      predicted: 3890,
      change: 6.6,
      confidence: 79,
      timeframe: "next_quarter"
    },
    {
      metric: "Churn Rate",
      current: 18.5,
      predicted: 15.2,
      change: -17.8,
      confidence: 84,
      timeframe: "next_quarter"
    }
  ];

  // Sentiment analysis data
  const sentimentData = [
    { rep: "Sarah Johnson", totalInteractions: 156, positive: 78, neutral: 15, negative: 7, sentiment: 4.2 },
    { rep: "Mike Chen", totalInteractions: 189, positive: 82, neutral: 12, negative: 6, sentiment: 4.4 },
    { rep: "Emily Davis", totalInteractions: 134, positive: 68, neutral: 22, negative: 10, sentiment: 3.8 },
    { rep: "David Wilson", totalInteractions: 167, positive: 71, neutral: 18, negative: 11, sentiment: 3.9 },
    { rep: "Lisa Rodriguez", totalInteractions: 198, positive: 85, neutral: 11, negative: 4, sentiment: 4.6 }
  ];

  // Market opportunities
  const opportunities = [
    {
      title: "Seasonal Trend Alert",
      description: "Summer aesthetic treatments trending 28% higher than last year",
      potential: "$180K additional revenue",
      action: "Launch summer campaign",
      confidence: 91
    },
    {
      title: "Competitor Gap Analysis",
      description: "CoolSculpting demand up 15% but competitor capacity limited",
      potential: "Market share gain opportunity",
      action: "Increase CoolSculpting promotions",
      confidence: 78
    },
    {
      title: "Cross-Sell Opportunity",
      description: "Botox patients show 34% higher Juvederm interest after 3 months",
      potential: "+156 conversions/month",
      action: "Implement follow-up campaign",
      confidence: 86
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Critical</Badge>;
      case 'high':
        return <Badge className="bg-warning/10 text-warning border-warning/20">High</Badge>;
      case 'medium':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'promotion':
        return <Target className="h-4 w-4" />;
      case 'churn':
        return <AlertTriangle className="h-4 w-4" />;
      case 'lead_routing':
        return <Users className="h-4 w-4" />;
      case 'pricing':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">AI-Powered Insights</h2>
          <p className="text-muted-foreground">Intelligent recommendations and predictive analytics for optimal performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-success/10 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-success">AI Engine Active</span>
          </div>
          <Button>Configure AI Settings</Button>
        </div>
      </div>

      {/* AI Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Recommendations</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center text-xs text-warning">
              <AlertTriangle className="h-3 w-3 mr-1" />
              3 critical actions needed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">87.3%</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actions Implemented</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% implementation rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+$234K</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              From AI recommendations
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
          <TabsTrigger value="predictions">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="opportunities">Market Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  AI-Generated Recommendations
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Prioritized actions based on real-time data analysis and machine learning insights
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {getTypeIcon(rec.type)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{rec.title}</h4>
                            <p className="text-muted-foreground mt-1">{rec.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPriorityBadge(rec.priority)}
                          <Badge variant="outline">
                            {rec.confidence}% confidence
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="p-3 bg-success/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Expected Impact</p>
                          <p className="font-semibold text-success">{rec.impact}</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">Timeframe</p>
                          <p className="font-semibold text-primary">
                            {rec.timeframe.replace('_', ' ').charAt(0).toUpperCase() + rec.timeframe.slice(1).replace('_', ' ')}
                          </p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Confidence Level</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={rec.confidence} className="flex-1 h-2" />
                            <span className="text-sm font-semibold">{rec.confidence}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => handleViewDetails(rec.id)}>View Details</Button>
                        <Button variant="outline" onClick={() => handleSchedule(rec.id)}>Schedule</Button>
                        <Button onClick={() => handleImplementNow(rec.id, rec.title)}>Implement Now</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Predictions</CardTitle>
                <p className="text-sm text-muted-foreground">AI-forecasted metrics based on current trends</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {predictions.map((pred, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">{pred.metric}</h4>
                        <Badge variant="outline">{pred.confidence}% confidence</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Current</p>
                          <p className="font-semibold">
                            {pred.metric.includes('Rate') || pred.metric.includes('LTV') ? 
                              (pred.metric === 'Patient LTV' ? `$${pred.current}` : `${pred.current}%`) : 
                              pred.current.toLocaleString()
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Predicted</p>
                          <p className="font-semibold">
                            {pred.metric.includes('Rate') || pred.metric.includes('LTV') ? 
                              (pred.metric === 'Patient LTV' ? `$${pred.predicted}` : `${pred.predicted}%`) : 
                              pred.predicted.toLocaleString()
                            }
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Change</p>
                          <p className={`font-semibold ${pred.change > 0 ? 'text-success' : 'text-destructive'}`}>
                            {pred.change > 0 ? '+' : ''}{pred.change}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prediction Accuracy Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { month: 'Jan', accuracy: 82 },
                    { month: 'Feb', accuracy: 84 },
                    { month: 'Mar', accuracy: 81 },
                    { month: 'Apr', accuracy: 86 },
                    { month: 'May', accuracy: 88 },
                    { month: 'Jun', accuracy: 87 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 95]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sentiment">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rep-Patient Sentiment Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">AI analysis of interaction sentiment scores</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sentimentData.map((rep, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">{rep.rep}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{rep.totalInteractions} interactions</Badge>
                          <Badge className={`${rep.sentiment >= 4.0 ? 'bg-success/10 text-success border-success/20' : 
                            rep.sentiment >= 3.5 ? 'bg-warning/10 text-warning border-warning/20' : 
                            'bg-destructive/10 text-destructive border-destructive/20'}`}>
                            {rep.sentiment}/5.0
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center p-2 bg-success/10 rounded">
                          <p className="font-semibold text-success">{rep.positive}%</p>
                          <p className="text-xs text-muted-foreground">Positive</p>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <p className="font-semibold">{rep.neutral}%</p>
                          <p className="text-xs text-muted-foreground">Neutral</p>
                        </div>
                        <div className="text-center p-2 bg-destructive/10 rounded">
                          <p className="font-semibold text-destructive">{rep.negative}%</p>
                          <p className="text-xs text-muted-foreground">Negative</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <h4 className="font-medium text-success">Top Performer</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Lisa Rodriguez maintains 4.6/5.0 sentiment with 85% positive interactions
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleShareBestPractices}>Share Best Practices</Button>
                </div>
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="font-medium text-warning">Coaching Opportunity</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Emily Davis showing 3.8/5.0 sentiment - recommend communication training
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleScheduleCoaching}>Schedule Coaching</Button>
                </div>
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h4 className="font-medium text-primary">Trending Keywords</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">professional</Badge>
                    <Badge variant="outline">results</Badge>
                    <Badge variant="outline">comfortable</Badge>
                    <Badge variant="outline">experienced</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Market Opportunities
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                AI-identified opportunities based on market trends and competitive analysis
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {opportunities.map((opp, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{opp.title}</h4>
                        <p className="text-muted-foreground mt-1">{opp.description}</p>
                      </div>
                      <Badge variant="outline">{opp.confidence}% confidence</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-success/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">Potential Impact</p>
                        <p className="font-semibold text-success">{opp.potential}</p>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">Recommended Action</p>
                        <p className="font-semibold text-primary">{opp.action}</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => handleLearnMore(opp.title)}>Learn More</Button>
                      <Button onClick={() => handleCreateCampaign(opp.title)}>Create Campaign</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIInsights;