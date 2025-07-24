
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    priceAlerts: true,
    portfolioUpdates: true,
    friendActivity: true,
    marketNews: false,
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    monthlyReport: true
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#002E5D]">Investment Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="price-alerts">Price Alerts</Label>
              <p className="text-sm text-gray-500">Get notified when stocks reach target prices</p>
            </div>
            <Switch
              id="price-alerts"
              checked={settings.priceAlerts}
              onCheckedChange={(checked) => handleSettingChange('priceAlerts', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="portfolio-updates">Portfolio Updates</Label>
              <p className="text-sm text-gray-500">Daily portfolio performance summaries</p>
            </div>
            <Switch
              id="portfolio-updates"
              checked={settings.portfolioUpdates}
              onCheckedChange={(checked) => handleSettingChange('portfolioUpdates', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="market-news">Market News</Label>
              <p className="text-sm text-gray-500">Breaking market news and analysis</p>
            </div>
            <Switch
              id="market-news"
              checked={settings.marketNews}
              onCheckedChange={(checked) => handleSettingChange('marketNews', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#002E5D]">Social Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="friend-activity">Friend Activity</Label>
              <p className="text-sm text-gray-500">When friends make trades or achievements</p>
            </div>
            <Switch
              id="friend-activity"
              checked={settings.friendActivity}
              onCheckedChange={(checked) => handleSettingChange('friendActivity', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#002E5D]">Notification Delivery</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-gray-500">Receive notifications on your device</p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-digest">Weekly Digest</Label>
              <p className="text-sm text-gray-500">Weekly portfolio and market summary</p>
            </div>
            <Switch
              id="weekly-digest"
              checked={settings.weeklyDigest}
              onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="monthly-report">Monthly Report</Label>
              <p className="text-sm text-gray-500">Detailed monthly performance report</p>
            </div>
            <Switch
              id="monthly-report"
              checked={settings.monthlyReport}
              onCheckedChange={(checked) => handleSettingChange('monthlyReports', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
