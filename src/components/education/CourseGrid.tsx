
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Clock } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  progress: number;
  videoId: string;
  thumbnail: string;
}

interface CourseGridProps {
  courses: Course[];
  onWatchVideo: (videoId: string) => void;
}

const CourseGrid = ({ courses, onWatchVideo }: CourseGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="shadow-lg border-[#4DA8DA]/20 hover:shadow-xl transition-shadow">
          <div className="relative">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-black/70 text-white">
                <Clock className="w-3 h-3 mr-1" />
                {course.duration}
              </Badge>
            </div>
            <Button
              onClick={() => onWatchVideo(course.videoId)}
              className="absolute inset-0 bg-black/40 hover:bg-black/60 text-white border-0 rounded-t-lg"
              variant="ghost"
            >
              <Play className="w-12 h-12" />
            </Button>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-[#002E5D] mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{course.description}</p>
            
            {course.progress > 0 && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-xs text-[#002E5D] font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-1" />
              </div>
            )}
            
            <Button 
              onClick={() => onWatchVideo(course.videoId)}
              className="w-full bg-[#4DA8DA] hover:bg-[#002E5D]"
            >
              {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseGrid;
