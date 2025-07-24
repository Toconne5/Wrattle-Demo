
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Shield, Bell, CreditCard, Eye, EyeOff } from "lucide-react";

const AccountSettings = () => {
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    trades: true,
    social: true,
    challenges: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    tradesVisible: false,
    performanceVisible: true
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Profile Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="johndoe123" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>
          <Button className="bg-[#4DA8DA] hover:bg-[#002E5D]">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Bank Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Bank Account Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#4DA8DA] rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">Chase Bank - Checking</p>
                <p className="text-sm text-gray-600">
                  ****{showAccountNumber ? '1234' : '****'} 
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowAccountNumber(!showAccountNumber)}
                    className="ml-2"
                  >
                    {showAccountNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </p>
                <Badge variant="secondary" className="text-xs">Primary</Badge>
              </div>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          <Button variant="outline" className="w-full">Add Bank Account</Button>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Privacy & Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="profileVisible">Profile Visibility</Label>
              <p className="text-sm text-gray-600">Allow others to find and view your profile</p>
            </div>
            <Switch
              id="profileVisible"
              checked={privacy.profileVisible}
              onCheckedChange={(checked) => setPrivacy({...privacy, profileVisible: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="tradesVisible">Share Trading Activity</Label>
              <p className="text-sm text-gray-600">Show your trades in the social feed</p>
            </div>
            <Switch
              id="tradesVisible"
              checked={privacy.tradesVisible}
              onCheckedChange={(checked) => setPrivacy({...privacy, tradesVisible: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="performanceVisible">Portfolio Performance</Label>
              <p className="text-sm text-gray-600">Allow friends to see your portfolio performance</p>
            </div>
            <Switch
              id="performanceVisible"
              checked={privacy.performanceVisible}
              onCheckedChange={(checked) => setPrivacy({...privacy, performanceVisible: checked})}
            />
          </div>
          <div className="pt-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline" className="ml-2">Enable 2FA</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notification Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotifs">Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <Switch
              id="emailNotifs"
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="pushNotifs">Push Notifications</Label>
              <p className="text-sm text-gray-600">Receive browser push notifications</p>
            </div>
            <Switch
              id="pushNotifs"
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="smsNotifs">SMS Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications via text message</p>
            </div>
            <Switch
              id="smsNotifs"
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="tradeNotifs">Trade Confirmations</Label>
              <p className="text-sm text-gray-600">Get notified when trades execute</p>
            </div>
            <Switch
              id="tradeNotifs"
              checked={notifications.trades}
              onCheckedChange={(checked) => setNotifications({...notifications, trades: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="socialNotifs">Social Activity</Label>
              <p className="text-sm text-gray-600">Notifications for likes, comments, and mentions</p>
            </div>
            <Switch
              id="socialNotifs"
              checked={notifications.social}
              onCheckedChange={(checked) => setNotifications({...notifications, social: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="challengeNotifs">Investment Challenges</Label>
              <p className="text-sm text-gray-600">Updates on challenges and achievements</p>
            </div>
            <Switch
              id="challengeNotifs"
              checked={notifications.challenges}
              onCheckedChange={(checked) => setNotifications({...notifications, challenges: checked})}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
