
import { ArrowUp } from "lucide-react";

const SignupStep5 = () => {
  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 mx-auto bg-[#4DA8DA] rounded-full flex items-center justify-center">
        <ArrowUp className="w-10 h-10 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-[#002E5D] mb-2">You're All Set!</h3>
        <p className="text-gray-600">Welcome to Wrattle! Start your investment journey with friends.</p>
      </div>
      <div className="bg-[#A6E1FA]/20 rounded-lg p-4">
        <p className="text-sm text-[#002E5D]">
          🎉 <strong>Welcome bonus:</strong> Get $5 to start investing when you invite your first friend!
        </p>
      </div>
    </div>
  );
};

export default SignupStep5;
