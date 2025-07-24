import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import SignupStep1 from '../components/signup/SignupStep1';
import SignupStep2 from '../components/signup/SignupStep2';
import SignupStep3 from '../components/signup/SignupStep3';
import SignupStep4 from '../components/signup/SignupStep4';
import SignupStep5 from '../components/signup/SignupStep5';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../lib/firebase'; // ✅ Make sure this is correct
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    age: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 1, title: "Easy Account Creation", description: "Basic information to get started" },
    { id: 2, title: "Personal Details", description: "Tell us a bit about yourself" },
    { id: 3, title: "Investment Goals", description: "What do you want to achieve?" },
    { id: 4, title: "Security Setup", description: "Protect your account" },
    { id: 5, title: "Finish Account Set Up", description: "You're almost ready to start investing!" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSignUp();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SignupStep1 formData={formData} onChange={handleFormChange} />;
      case 2:
        return <SignupStep2 formData={formData} onChange={handleFormChange} />;
      case 3:
        return <SignupStep3 />;
      case 4:
        return <SignupStep4 />;
      case 5:
        return <SignupStep5 />;
      default:
        return <SignupStep1 formData={formData} onChange={handleFormChange} />;
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Optional: Set display name
      await updateProfile(user, {
        displayName: formData.username
      });

      // ✅ Write user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: formData.email,
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        createdAt: new Date().toISOString()
      });

      window.location.href = '/onboarding';

    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message || 'An error occurred during sign-up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002E5D] via-[#003366] to-[#004080] flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link to="/" className="flex items-center space-x-2 text-white">
          <div className="w-8 h-8 bg-[#4DA8DA] rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold">Wrattle</span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  currentStep >= step.id
                    ? 'bg-[#4DA8DA] text-white'
                    : 'bg-white/20 text-white/50'
                }`}
              >
                {step.id}
              </div>
            ))}
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-[#4DA8DA] h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-none shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[#002E5D] mb-2">
              {steps[currentStep - 1].title}
            </CardTitle>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {renderCurrentStep()}

            <div className="flex justify-between pt-6">
              {currentStep > 1 ? (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-[#4DA8DA] text-[#4DA8DA] hover:bg-[#4DA8DA] hover:text-white transition-all duration-300"
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              <Button
                onClick={handleNext}
                className="bg-[#002E5D] hover:bg-[#4DA8DA] text-white transition-all duration-300"
                disabled={loading}
              >
                {currentStep === steps.length ? 'Enter Wrattle' : 'Continue'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
