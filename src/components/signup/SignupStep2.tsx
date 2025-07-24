
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignupStep2Props {
  formData: {
    firstName: string;
    lastName: string;
    username: string;
    age: string;
  };
  onChange: (field: string, value: string) => void;
}

const SignupStep2 = ({ formData, onChange }: SignupStep2Props) => {
  const handleUsernameChange = (value: string) => {
    // Allow letters, numbers, and underscores only
    const cleanedValue = value.replace(/[^a-zA-Z0-9_]/g, '');
    onChange('username', cleanedValue);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="johndoe123"
          value={formData.username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          className="mt-1"
        />
        <p className="text-xs text-gray-500 mt-1">This will be your unique username for friends to find you (letters, numbers, and _ only)</p>
      </div>
      <div>
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          placeholder="25"
          value={formData.age}
          onChange={(e) => onChange('age', e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default SignupStep2;
