
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignupStep1Props {
  formData: {
    email: string;
    password: string;
  };
  onChange: (field: string, value: string) => void;
}

const SignupStep1 = ({ formData, onChange }: SignupStep1Props) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a secure password"
          value={formData.password}
          onChange={(e) => onChange('password', e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default SignupStep1;
