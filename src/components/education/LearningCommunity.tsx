
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const LearningCommunity = () => {
  return (
    <Card className="shadow-lg border-[#4DA8DA]/20">
      <CardHeader>
        <CardTitle className="text-[#002E5D] flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Learning Community
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Study Groups</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Beginner Investors Circle</p>
                  <p className="text-sm text-gray-600">124 members • Next session: Tomorrow 7 PM</p>
                </div>
                <Button size="sm" variant="outline">Join</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Options Trading Workshop</p>
                  <p className="text-sm text-gray-600">89 members • Next session: Friday 6 PM</p>
                </div>
                <Button size="sm" variant="outline">Join</Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Recent Discussions</h3>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm">Best ETFs for beginners?</p>
                <p className="text-xs text-gray-600">Started by Alex M. • 23 replies</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm">Market volatility strategies</p>
                <p className="text-xs text-gray-600">Started by Sarah K. • 17 replies</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningCommunity;
