import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, DollarSign, Target, Gift, UserPlus, Calendar, Award } from 'lucide-react';

const PromotionStrategies = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('alle-loyalty');

  const strategies = {
    'alle-loyalty': {
      title: 'Allē Loyalty Rewards',
      description: 'Points-based rewards program where patients earn and redeem for discounts on treatments. Drives repeat visits.',
      icon: Award,
      dataNeeded: ['# of enrolled members', '# of redemptions', 'Avg spend per redeemer', 'Cost of redeemed points', 'Marketing spend to run program'],
      roiFormula: 'ROI = (Incremental Revenue from redeemers – Cost of points – Program spend) / Program spend',
      pitfalls: ['Hard to separate "points redeemers" from patients who would have returned anyway', 'Loyalty lift often underestimated'],
      fixes: ['Use control groups (non-redeemers) to benchmark'],
      sampleData: {
        membersEnrolled: 120000,
        redemptions: 28000,
        incrementalRevenue: 12600000,
        costOfPoints: 1800000,
        programSpend: 500000,
        roi: 1740
      }
    },
    'refer-friend': {
      title: 'Refer-a-Friend Bonus',
      description: 'Patients refer friends for $50 off; referrers get $10 credit.',
      icon: UserPlus,
      dataNeeded: ['# of referrals sent', '# of referrals redeemed', 'Revenue from referred patients', 'Total referral cost (credits + promo spend)'],
      roiFormula: 'ROI = (Revenue from referred – Total referral credits) / Total referral credits',
      pitfalls: ['Double counting: referrals who would\'ve joined anyway', 'Friends may redeem once and churn'],
      fixes: ['Track LTV of referred patients vs baseline'],
      sampleData: {
        referralsSent: 5000,
        redeemed: 2200,
        revenue: 4400000,
        cost: 132000,
        roi: 3230
      }
    },
    'branded-events': {
      title: 'Branded Day Events',
      description: 'Special calendar days with gift cards, bonus points, and sweepstakes.',
      icon: Calendar,
      dataNeeded: ['Gift card sales', 'Redemption %', 'Incremental treatments booked', 'Cost of discounts + sweepstakes prizes + ads'],
      roiFormula: 'ROI = (Revenue from gift card redemptions – Gift card cost – Promo cost) / Promo cost',
      pitfalls: ['Spike in one day but cannibalizes future sales'],
      fixes: ['Compare treatment volume shift vs baseline month'],
      sampleData: {
        cardsSold: 10000,
        redeemed: 7200,
        incrementalRevenue: 7800000,
        cost: 2200000,
        roi: 255
      }
    },
    'multi-service': {
      title: 'Multi-service Bonus',
      description: 'Extra points for patients taking multiple services in a single visit.',
      icon: Target,
      dataNeeded: ['# of multi-service visits', 'Avg spend uplift per visit', 'Cost of extra points', 'Promo budget'],
      roiFormula: 'ROI = (Uplifted revenue – Extra point cost – Promo spend) / Promo spend',
      pitfalls: ['Some patients may have taken multi-service anyway'],
      fixes: ['Measure incremental lift vs single-service baseline'],
      sampleData: {
        multiServiceVisits: 4500,
        avgUplift: 450,
        revenue: 2000000,
        pointCost: 300000,
        roi: 570
      }
    },
    'gift-cards': {
      title: 'Gift Card Promotions (BOGO)',
      description: 'Buy-one-get-one gift card promos to lock in future visits.',
      icon: Gift,
      dataNeeded: ['# of gift cards sold', 'Redemption %', 'Timing of redemptions (same day vs future)', 'Cost of free cards'],
      roiFormula: 'ROI = (Revenue from redeemed cards – Free card cost – Promo spend) / Promo spend',
      pitfalls: ['Breakage (unused gift cards) inflates ROI artificially'],
      fixes: ['Report both "gross ROI" and "net ROI after breakage"'],
      sampleData: {
        sold: 3200,
        redeemed: 2800,
        revenue: 2100000,
        freeCardCost: 640000,
        roi: 228
      }
    },
    'influencer': {
      title: 'Influencer/User Campaigns',
      description: 'Consumers apply to be the "face" of a brand; generates UGC and brand buzz.',
      icon: Users,
      dataNeeded: ['# of applicants', 'Social impressions / engagement', 'Leads generated', 'Revenue from influenced leads', 'Campaign cost'],
      roiFormula: 'ROI = (Revenue from engaged leads – Campaign cost) / Campaign cost',
      pitfalls: ['Attribution messy (hard to link engagement to revenue)'],
      fixes: ['Use promo codes or tracked landing pages'],
      sampleData: {
        applicants: 2800,
        impressions: 5000000,
        leads: 1200,
        revenue: 900000,
        cost: 250000,
        roi: 260
      }
    },
    'practice-support': {
      title: 'Practice Support (BrandBox)',
      description: 'Allergan provides clinics with digital marketing templates and assets.',
      icon: TrendingUp,
      dataNeeded: ['# of clinics using assets', '# of patient leads generated via assets', 'Revenue conversion from those leads', 'Cost of asset creation/distribution'],
      roiFormula: 'ROI = (Revenue from clinic leads – Asset cost) / Asset cost',
      pitfalls: ['Clinics may not tag patients as "asset influenced"'],
      fixes: ['Require promo codes or track clicks on BrandBox URLs'],
      sampleData: {
        clinicsUsingAssets: 1200,
        leadsGenerated: 14500,
        revenue: 11200000,
        cost: 1600000,
        roi: 600
      }
    },
    'educational': {
      title: 'Educational & Charitable Events',
      description: 'Cause-driven campaigns (e.g., free treatments linked to charity events).',
      icon: DollarSign,
      dataNeeded: ['Attendees', 'Conversions to treatments', 'Incremental revenue', 'Event cost + donations'],
      roiFormula: 'ROI = (Revenue from attendees – Event cost – Donation value) / Event cost',
      pitfalls: ['Brand lift vs hard ROI is tricky'],
      fixes: ['Split "financial ROI" vs "brand equity ROI"'],
      sampleData: {
        attendees: 600,
        conversions: 320,
        revenue: 480000,
        eventCost: 200000,
        roi: 140
      }
    }
  };

  const currentStrategy = strategies[selectedStrategy];
  const IconComponent = currentStrategy.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Promotion Strategies</h2>
          <p className="text-muted-foreground">Comprehensive analysis of 8 key promotion types with ROI attribution methods</p>
        </div>
      </div>

      <Tabs value={selectedStrategy} onValueChange={setSelectedStrategy} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {Object.entries(strategies).map(([key, strategy]) => (
            <TabsTrigger key={key} value={key} className="text-xs">
              {strategy.title.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(strategies).map(([key, strategy]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            {/* Top Section - Description */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{strategy.title}</CardTitle>
                    <CardDescription className="mt-1">{strategy.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Middle Section - Data & ROI */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.dataNeeded.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ROI Formula & Pitfalls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Formula:</h4>
                    <p className="text-sm bg-muted p-2 rounded font-mono">{strategy.roiFormula}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Common Pitfalls:</h4>
                    <ul className="space-y-1">
                      {strategy.pitfalls.map((pitfall, index) => (
                        <li key={index} className="text-sm text-destructive">• {pitfall}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Fixes:</h4>
                    <ul className="space-y-1">
                      {strategy.fixes.map((fix, index) => (
                        <li key={index} className="text-sm text-success">• {fix}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Section - KPI Widgets */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">ROI Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">{strategy.sampleData.roi}%</div>
                  <p className="text-sm text-muted-foreground">Return on Investment</p>
                  <Progress value={Math.min(strategy.sampleData.roi / 20, 100)} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Revenue Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ${(() => {
                      const data = strategy.sampleData as any;
                      return (data.revenue || data.incrementalRevenue || 0).toLocaleString();
                    })()}
                  </div>
                  <p className="text-sm text-muted-foreground">Generated Revenue</p>
                  <Badge variant="secondary" className="mt-2">Q3 2025</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {key === 'alle-loyalty' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm">Members:</span>
                          <span className="font-medium">{(strategy.sampleData as any).membersEnrolled?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Redemptions:</span>
                          <span className="font-medium">{(strategy.sampleData as any).redemptions?.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    {key === 'refer-friend' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm">Sent:</span>
                          <span className="font-medium">{(strategy.sampleData as any).referralsSent?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Redeemed:</span>
                          <span className="font-medium">{(strategy.sampleData as any).redeemed?.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    {(key === 'branded-events' || key === 'gift-cards') && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm">Cards Sold:</span>
                          <span className="font-medium">{((strategy.sampleData as any).cardsSold || (strategy.sampleData as any).sold)?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Redeemed:</span>
                          <span className="font-medium">{(strategy.sampleData as any).redeemed?.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    {key === 'multi-service' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm">Multi Visits:</span>
                          <span className="font-medium">{(strategy.sampleData as any).multiServiceVisits?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Avg Uplift:</span>
                          <span className="font-medium">${(strategy.sampleData as any).avgUplift}</span>
                        </div>
                      </>
                    )}
                    {key === 'influencer' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm">Applicants:</span>
                          <span className="font-medium">{(strategy.sampleData as any).applicants?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Impressions:</span>
                          <span className="font-medium">{((strategy.sampleData as any).impressions / 1000000).toFixed(1)}M</span>
                        </div>
                      </>
                    )}
                    {key === 'practice-support' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm">Clinics:</span>
                          <span className="font-medium">{(strategy.sampleData as any).clinicsUsingAssets?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Leads:</span>
                          <span className="font-medium">{(strategy.sampleData as any).leadsGenerated?.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    {key === 'educational' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm">Attendees:</span>
                          <span className="font-medium">{(strategy.sampleData as any).attendees?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Conversions:</span>
                          <span className="font-medium">{(strategy.sampleData as any).conversions?.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PromotionStrategies;