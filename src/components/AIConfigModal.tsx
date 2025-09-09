import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Brain, Settings, Target, TrendingUp, AlertTriangle, 
  CheckCircle, Clock, Zap, Database, Shield, BarChart3 
} from "lucide-react";

interface AIConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AIConfigModal = ({ open, onOpenChange }: AIConfigModalProps) => {
  const { toast } = useToast();
  const [confidence, setConfidence] = useState([75]);
  const [analysisDepth, setAnalysisDepth] = useState([3]);
  const [settings, setSettings] = useState({
    autoImplement: false,
    realTimeAnalysis: true,
    predictiveModeling: true,
    sentimentTracking: true,
    anomalyDetection: false,
    marketAnalysis: true
  });

  const handleSaveSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting Updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleSaveAll = () => {
    toast({
      title: "AI Configuration Saved",
      description: "All AI engine settings have been successfully updated.",
    });
    onOpenChange(false);
  };

  const handleReset = () => {
    setSettings({
      autoImplement: false,
      realTimeAnalysis: true,
      predictiveModeling: true,
      sentimentTracking: true,
      anomalyDetection: false,
      marketAnalysis: true
    });
    setConfidence([75]);
    setAnalysisDepth([3]);
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to defaults.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Brain className="h-6 w-6 mr-2" />
            AI Engine Configuration
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Core AI Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Real-time Analysis</h4>
                    <p className="text-sm text-muted-foreground">Continuous monitoring and instant insights</p>
                  </div>
                  <Switch 
                    checked={settings.realTimeAnalysis}
                    onCheckedChange={(value) => handleSaveSetting('realTimeAnalysis', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Predictive Modeling</h4>
                    <p className="text-sm text-muted-foreground">Future trend predictions and forecasting</p>
                  </div>
                  <Switch 
                    checked={settings.predictiveModeling}
                    onCheckedChange={(value) => handleSaveSetting('predictiveModeling', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sentiment Tracking</h4>
                    <p className="text-sm text-muted-foreground">Patient interaction sentiment analysis</p>
                  </div>
                  <Switch 
                    checked={settings.sentimentTracking}
                    onCheckedChange={(value) => handleSaveSetting('sentimentTracking', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Market Analysis</h4>
                    <p className="text-sm text-muted-foreground">Competitive intelligence and market trends</p>
                  </div>
                  <Switch 
                    checked={settings.marketAnalysis}
                    onCheckedChange={(value) => handleSaveSetting('marketAnalysis', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Anomaly Detection</h4>
                    <p className="text-sm text-muted-foreground">Automatic identification of unusual patterns</p>
                  </div>
                  <Switch 
                    checked={settings.anomalyDetection}
                    onCheckedChange={(value) => handleSaveSetting('anomalyDetection', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-Implementation</h4>
                    <p className="text-sm text-muted-foreground">Automatically execute low-risk recommendations</p>
                  </div>
                  <Switch 
                    checked={settings.autoImplement}
                    onCheckedChange={(value) => handleSaveSetting('autoImplement', value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  AI Model Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Recommendation Engine</h4>
                  <Select defaultValue="advanced">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Model</SelectItem>
                      <SelectItem value="advanced">Advanced Model</SelectItem>
                      <SelectItem value="expert">Expert Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Sentiment Analysis Model</h4>
                  <Select defaultValue="healthcare">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Purpose</SelectItem>
                      <SelectItem value="healthcare">Healthcare Specialized</SelectItem>
                      <SelectItem value="custom">Custom Trained</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Prediction Model</h4>
                  <Select defaultValue="ensemble">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linear">Linear Regression</SelectItem>
                      <SelectItem value="ensemble">Ensemble Methods</SelectItem>
                      <SelectItem value="neural">Neural Networks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="thresholds" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  AI Sensitivity & Thresholds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Minimum Confidence Level: {confidence[0]}%</h4>
                  <Slider
                    value={confidence}
                    onValueChange={setConfidence}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Only show recommendations above this confidence threshold
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Analysis Depth: Level {analysisDepth[0]}</h4>
                  <Slider
                    value={analysisDepth}
                    onValueChange={setAnalysisDepth}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Higher levels provide more detailed analysis but may be slower
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium text-sm">Critical Alert Threshold</h5>
                    <p className="text-2xl font-bold text-destructive">$10K+</p>
                    <p className="text-xs text-muted-foreground">Revenue at risk</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium text-sm">Opportunity Threshold</h5>
                    <p className="text-2xl font-bold text-success">$5K+</p>
                    <p className="text-xs text-muted-foreground">Potential gain</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  AI Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                    <p className="text-2xl font-bold text-success">87.3%</p>
                    <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-primary">2.4s</p>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-warning" />
                    <p className="text-2xl font-bold text-warning">47</p>
                    <p className="text-sm text-muted-foreground">Actions/Day</p>
                  </div>
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <Zap className="h-8 w-8 mx-auto mb-2 text-success" />
                    <p className="text-2xl font-bold text-success">99.2%</p>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Model Training Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Recommendation Engine</span>
                      <Badge className="bg-success/10 text-success border-success/20">Optimized</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sentiment Analysis</span>
                      <Badge className="bg-success/10 text-success border-success/20">Optimized</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Market Prediction</span>
                      <Badge className="bg-warning/10 text-warning border-warning/20">Training</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAll}>
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIConfigModal;