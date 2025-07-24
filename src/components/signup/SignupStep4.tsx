
import { Button } from "@/components/ui/button";

const SignupStep4 = () => {
  const securityOptions = [
    { icon: '📱', text: 'Enable Two-Factor Authentication' },
    { icon: '📄', text: 'Verify Identity (Required)' },
    { icon: '🏦', text: 'Connect Bank Account' }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-[#002E5D] mb-2">Security & Verification</h3>
        <p className="text-gray-600">Keep your investments safe and secure</p>
      </div>
      <div className="space-y-3">
        {securityOptions.map((option) => (
          <Button
            key={option.text}
            variant="outline"
            className="w-full justify-start text-left hover:bg-[#4DA8DA] hover:text-white hover:border-[#4DA8DA] transition-all duration-300"
          >
            {option.icon} {option.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SignupStep4;
