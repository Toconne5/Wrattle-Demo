import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    investmentExperience: '',
    riskTolerance: '',
    investmentGoals: ''
  });
  const navigate = useNavigate();
  const { user } = useAuth();

  const completeOnboarding = async () => {
    if (!user) {
      setError('No user logged in');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Creating user document for:', user.email);
      
      // Create or overwrite user document (setDoc instead of updateDoc)
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        hasCompletedOnboarding: true,
        profile: {
          firstName: formData.firstName || 'New',
          lastName: formData.lastName || 'User',
          investmentExperience: formData.investmentExperience || 'beginner',
          riskTolerance: formData.riskTolerance || 'moderate',
          investmentGoals: formData.investmentGoals || 'wealth-building',
          completedAt: new Date()
        },
        portfolio: {
          totalValue: 1247.83,
          holdings: [
            {
              symbol: 'AAPL',
              name: 'Apple Inc.',
              shares: 3,
              currentPrice: 150.25,
              totalValue: 450.75,
              changePercent: 2.1,
              purchaseDate: new Date()
            },
            {
              symbol: 'TSLA',
              name: 'Tesla Inc.',
              shares: 2,
              currentPrice: 398.54,
              totalValue: 797.08,
              changePercent: -1.3,
              purchaseDate: new Date()
            }
          ]
        },
        friends: [],
        notifications: [],
        settings: {
          notifications: true,
          privacy: 'friends',
          theme: 'light'
        },
        createdAt: new Date(),
        lastLoginAt: new Date()
      });
      
      console.log('User document created successfully!');
      console.log('Redirecting to main app...');
      navigate('/app');
      
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setError(`Failed to complete setup: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName;
      case 2:
        return formData.investmentExperience && formData.riskTolerance;
      case 3:
        return formData.investmentGoals;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Wrattle</h1>
          <p className="text-gray-600">Let's get you set up with your investment journey</p>
          
          {/* Progress indicator */}
          <div className="flex justify-center mt-6 mb-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center mx-1 text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 text-center">Personal Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your last name"
              />
            </div>
          </div>
        )}

        {/* Step 2: Investment Profile */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 text-center">Investment Profile</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Experience
              </label>
              <select
                value={formData.investmentExperience}
                onChange={(e) => handleInputChange('investmentExperience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner (0-1 years)</option>
                <option value="intermediate">Intermediate (1-5 years)</option>
                <option value="advanced">Advanced (5+ years)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Tolerance
              </label>
              <select
                value={formData.riskTolerance}
                onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your risk tolerance</option>
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Investment Goals */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 text-center">Investment Goals</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Investment Goal
              </label>
              <select
                value={formData.investmentGoals}
                onChange={(e) => handleInputChange('investmentGoals', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your primary goal</option>
                <option value="retirement">Retirement Planning</option>
                <option value="wealth-building">Wealth Building</option>
                <option value="income">Generate Income</option>
                <option value="short-term">Short-term Gains</option>
                <option value="education">Education Funding</option>
              </select>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">🎉 Almost Done!</h3>
              <p className="text-sm text-blue-700">
                You're about to join Wrattle's social investing community where you can:
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Share investment ideas with friends</li>
                <li>• Send money for stock purchases</li>
                <li>• Track your portfolio performance</li>
                <li>• Get AI-powered investment guidance</li>
              </ul>
            </div>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Previous
          </button>

          <button
            onClick={nextStep}
            disabled={!canProceed() || loading}
            className={`px-6 py-2 rounded-lg font-medium ${
              !canProceed() || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {loading ? 'Creating Profile...' : currentStep === 3 ? 'Complete Setup' : 'Next'}
          </button>
        </div>

        {/* Skip option */}
        <div className="text-center mt-6">
          <button
            onClick={completeOnboarding}
            disabled={loading}
            className={`text-sm ${loading ? 'text-gray-400' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Skip for now →
          </button>
        </div>

        {/* User info for debugging */}
        <div className="text-center mt-4 text-xs text-gray-400">
          {user?.email && `Logged in as: ${user.email}`}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;