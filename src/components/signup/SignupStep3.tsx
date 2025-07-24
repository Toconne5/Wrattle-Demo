
import { Button } from "@/components/ui/button";

const SignupStep3 = () => {
  const goals = [
    'Save for the future',
    'Learn about investing', 
    'Build wealth with friends',
    'Prepare for retirement'
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-[#002E5D] mb-2">What's your investment goal?</h3>
        <p className="text-gray-600">We'll help you get started with the right approach</p>
      </div>
      <div className="space-y-3">
        {goals.map((goal) => (
          <Button
            key={goal}
            variant="outline"
            className="w-full justify-start text-left hover:bg-[#4DA8DA] hover:text-white hover:border-[#4DA8DA] transition-all duration-300"
          >
            {goal}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SignupStep3;
