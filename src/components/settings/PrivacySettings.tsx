
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    hidePortfolioValue: false,
    hideHoldings: false,
    hidePerformance: false,
    allowFriendRequests: true,
    showOnlineStatus: true,
    shareInvestmentActivity: true
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
          <CardTitle className="text-[#002E5D]">Portfolio Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="hide-portfolio">Hide Portfolio Value</Label>
              <p className="text-sm text-gray-500">Friends won't see your total portfolio value</p>
            </div>
            <Switch
              id="hide-portfolio"
              checked={settings.hidePortfolioValue}
              onCheckedChange={(checked) => handleSettingChange('hidePortfolioValue', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="hide-holdings">Hide Individual Holdings</Label>
              <p className="text-sm text-gray-500">Friends won't see your specific stock holdings</p>
            </div>
            <Switch
              id="hide-holdings"
              checked={settings.hideHoldings}
              onCheckedChange={(checked) => handleSettingChange('hideHoldings', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="hide-performance">Hide Performance Data</Label>
              <p className="text-sm text-gray-500">Friends won't see your gains/losses</p>
            </div>
            <Switch
              id="hide-performance"
              checked={settings.hidePerformance}
              onCheckedChange={(checked) => handleSettingChange('hidePerformance', checked)}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-[#002E5D]">Social Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="friend-requests">Allow Friend Requests</Label>
              <p className="text-sm text-gray-500">Others can send you friend requests</p>
            </div>
            <Switch
              id="friend-requests"
              checked={settings.allowFriendRequests}
              onCheckedChange={(checked) => handleSettingChange('allowFriendRequests', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="online-status">Show Online Status</Label>
              <p className="text-sm text-gray-500">Friends can see when you're online</p>
            </div>
            <Switch
              id="online-status"
              checked={settings.showOnlineStatus}
              onCheckedChange={(checked) => handleSettingChange('showOnlineStatus', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="investment-activity">Share Investment Activity</Label>
              <p className="text-sm text-gray-500">Friends can see your recent trades in the feed</p>
            </div>
            <Switch
              id="investment-activity"
              checked={settings.shareInvestmentActivity}
              onCheckedChange={(checked) => handleSettingChange('shareInvestmentActivity', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;
