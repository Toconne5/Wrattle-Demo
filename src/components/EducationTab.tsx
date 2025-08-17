import { BadgeCheck, BookOpen, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NotificationDropdown from './NotificationDropdown';
import SettingsDropdown from './SettingsDropdown';

interface EducationTabProps {
  onLogout: () => void;
}

const Metric = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <Card className="border-[#4DA8DA]/20">
    <CardContent className="py-6">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-4xl font-extrabold text-[#002E5D] mt-1">{value}</div>
      {sub && <div className="text-sm text-gray-500 mt-1">{sub}</div>}
    </CardContent>
  </Card>
);

const LessonCard = ({
  title,
  minutes,
  level,
}: {
  title: string;
  minutes: number;
  level: "Beginner" | "Intermediate" | "Advanced";
}) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-3">
      <CardTitle className="text-[#002E5D] text-base">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex items-center justify-between">
      <div className="text-sm text-gray-600">
        {minutes} min • {level}
      </div>
      <Button size="sm" className="bg-[#4DA8DA] hover:bg-[#002E5D]">
        Start
      </Button>
    </CardContent>
  </Card>
);

const EducationTab = ({ onLogout }: EducationTabProps) => {
  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#002E5D]">Learn &amp; Grow</h1>
          <p className="text-gray-600">Bite-sized lessons to level up your investing chops</p>
        </div>
        <div className="flex items-center space-x-2">
          <NotificationDropdown />
          <SettingsDropdown onLogout={onLogout} />
        </div>
      </div>

      {/* Badge / level */}
      <div className="flex items-center space-x-3">
        <div className="px-3 py-1 rounded-full bg-[#E6F4FB] text-[#002E5D] text-sm font-medium inline-flex items-center">
          <BadgeCheck className="w-4 h-4 mr-1" />
          Level 1 Investor
        </div>
        <div className="px-3 py-1 rounded-full bg-[#FFF3E6] text-[#9A5B00] text-sm font-medium inline-flex items-center">
          <Flame className="w-4 h-4 mr-1" />
          Streak: 7 days
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Metric label="Courses Completed" value="3" />
        <Metric label="Hours Learned" value="2.5" />
        <Metric label="Badges Earned" value="4" />
      </div>

      {/* Journey section */}
      <Card className="shadow-lg border-[#4DA8DA]/20">
        <CardHeader>
          <CardTitle className="text-[#002E5D] flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <LessonCard title="Investing 101: Stocks vs ETFs" minutes={8} level="Beginner" />
          <LessonCard title="Dollar-Cost Averaging — Why it Works" minutes={6} level="Beginner" />
          <LessonCard title="Understanding Risk & Time Horizon" minutes={7} level="Beginner" />
        </CardContent>
      </Card>

      {/* Callout */}
      <div className="rounded-xl p-4 bg-gradient-to-r from-[#002E5D] to-[#4DA8DA] text-white">
        <div className="font-semibold">Tip of the day</div>
        <div className="text-sm opacity-90">
          Tiny, consistent contributions beat rare, huge deposits. Start with $1 and build the habit.
        </div>
      </div>
    </div>
  );
};

export default EducationTab;
