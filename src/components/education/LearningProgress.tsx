
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award } from "lucide-react";

const LearningProgress = () => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#002E5D]">Learn & Grow</h2>
        <Badge variant="secondary" className="bg-[#A6E1FA] text-[#002E5D]">
          <Award className="w-4 h-4 mr-1" />
          Level 1 Investor
        </Badge>
      </div>

      {/* Progress Overview */}
      <Card className="shadow-lg border-[#4DA8DA]/20">
        <CardHeader>
          <CardTitle className="text-[#002E5D] flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Courses Completed</h3>
              <p className="text-3xl font-bold text-green-600">3</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Hours Learned</h3>
              <p className="text-3xl font-bold text-blue-600">2.5</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Streak Days</h3>
              <p className="text-3xl font-bold text-purple-600">7</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Overall Progress</span>
              <span className="text-sm font-semibold text-[#002E5D]">25%</span>
            </div>
            <Progress value={25} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LearningProgress;
