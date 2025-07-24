import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, query, where, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, isAuthenticated, authenticate } = useAuth();

  // Check if username is already taken
  const checkUsernameAvailable = async (username: string) => {
    const q = query(collection(db, 'users'), where('username', '==', username.toLowerCase()));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  };

  // Create user profile in Firestore
  const createUserProfile = async (userId: string, email: string, username: string, phoneNumber: string) => {
    try {
      await setDoc(doc(db, 'users', userId), {
        email: email,
        username: username.toLowerCase(),
        displayName: username,
        phoneNumber: phoneNumber,
        hasCompletedOnboarding: false,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        profile: {
          firstName: '',
          lastName: '',
          investmentExperience: '',
          riskTolerance: '',
          investmentGoals: ''
        },
        portfolio: {
          totalValue: 0,
          holdings: []
        },
        friends: [],
        friendRequests: [],
        notifications: [],
        settings: {
          notifications: true,
          privacy: 'friends',
          theme: 'light',
          biometricAuth: false,
          autoLogout: true
        }
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  };

  // Check onboarding status
  const checkOnboardingStatus = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data().hasCompletedOnboarding || false;
      }
      return false;
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  };

  // Only redirect if properly authenticated
  useEffect(() => {
    if (user && isAuthenticated) {
      checkOnboardingStatus(user.uid).then(hasCompletedOnboarding => {
        if (hasCompletedOnboarding) {
          navigate('/app');
        } else {
          navigate('/onboarding');
        }
      });
    }
  }, [user, isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
  e?.preventDefault();
  
  console.log('🔐 HANDLE SUBMIT CALLED WITH:', { 
    email, 
    password, 
    hasEmail: !!email, 
    hasPassword: !!password,
    isAuthenticated 
  });


  // Get the actual field values from the DOM (what browser really filled)
const emailField = document.getElementById('email') as HTMLInputElement;
const passwordField = document.getElementById('password') as HTMLInputElement;
const actualEmail = emailField?.value || '';
const actualPassword = passwordField?.value || '';

console.log('🔍 ACTUAL FIELD VALUES:', { 
  stateEmail: email, 
  actualEmail, 
  statePassword: password, 
  actualPassword: actualPassword ? '***filled***' : 'empty'
});

// Only allow login if user manually typed (state matches DOM)
if (email !== actualEmail || password !== actualPassword) {
  console.log('🚫 BROWSER AUTOFILL DETECTED - CLEARING FIELDS');
  setEmail('');
  setPassword('');
  emailField.value = '';
  passwordField.value = '';
  setError('Please manually enter your email and password');
  return;
}

// Also require non-empty fields
if (!email || !password) {
  console.log('🛑 EMPTY FIELDS - BLOCKING SUBMISSION');
  setError('Please fill in email and password');
  return;
}

  
  // STOP if already authenticated
  if (isAuthenticated) {
    console.log('🛑 ALREADY AUTHENTICATED - BLOCKING SUBMISSION');
    return;
  }
  
  if (!email || !password) {
    console.log('🛑 EMPTY FIELDS - BLOCKING SUBMISSION');
    setError('Please fill in email and password');
    return;
  }

  console.log('✅ PROCEEDING WITH AUTHENTICATION');

  if (password.length < 6) {
    setError('Password must be at least 6 characters long');
    return;
  }

  // Additional validation for signup
  if (isSignUp) {
    if (!username || !phoneNumber) {
      setError('Please fill in all fields');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }

    if (!/^\+?[\d\s\-\(\)]+$/.test(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }
  }

  setLoading(true);
  setError('');

  try {
    if (isSignUp) {
      // Check username availability
      const usernameAvailable = await checkUsernameAvailable(username);
      if (!usernameAvailable) {
        setError('Username is already taken. Please choose a different one.');
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile
      await createUserProfile(userCredential.user.uid, email, username, phoneNumber);
      
      // Manually authenticate
      authenticate(userCredential.user);
      console.log('🔥 SIGNUP AUTHENTICATE CALLED');
      
    } else {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login time
      try {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          lastLoginAt: new Date()
        }, { merge: true });
      } catch (updateError) {
        console.log('Could not update last login time:', updateError);
      }
      
      // Manually authenticate
      authenticate(userCredential.user);
      console.log('🔥 LOGIN AUTHENTICATE CALLED');
    }
    
    // Clear form
    setEmail('');
    setPassword('');
    setUsername('');
    setPhoneNumber('');
    
  } catch (err: any) {
    console.error('Authentication error:', err);
    
    switch (err.code) {
      case 'auth/user-not-found':
        setError('No account found with this email. Please sign up first.');
        break;
      case 'auth/wrong-password':
        setError('Incorrect password. Please try again.');
        break;
      case 'auth/email-already-in-use':
        setError('An account with this email already exists. Try signing in instead.');
        break;
      case 'auth/weak-password':
        setError('Password should be at least 6 characters long.');
        break;
      case 'auth/invalid-email':
        setError('Please enter a valid email address.');
        break;
      case 'auth/too-many-requests':
        setError('Too many failed attempts. Please try again later.');
        break;
      case 'auth/network-request-failed':
        setError('Network error. Please check your connection.');
        break;
      default:
        setError(`Authentication failed: ${err.message}`);
    }
  } finally {
    setLoading(false);
  }
};

   

  // Always show login form unless authenticated
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wrattle</h1>
          <p className="text-gray-600">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            🔒 Manual authentication required
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
  id="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  autoComplete="off"
  autoCorrect="off"
  autoCapitalize="off"
  data-lpignore="true"        // ← ADD THIS
  data-form-type="other"      // ← ADD THIS
  name="email_disabled"       // ← CHANGE name to confuse browser
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="Enter your email"
  required
/>
          </div>

          {isSignUp && (
            <>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Choose a username"
                  required={isSignUp}
                  minLength={3}
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  required={isSignUp}
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
  id="password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  autoComplete="new-password"
  data-lpignore="true"        // ← ADD THIS
  data-form-type="other"      // ← ADD THIS
  name="password_disabled"    // ← CHANGE name to confuse browser
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="Enter your password"
  required
  minLength={6}
/>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition duration-200 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Authenticating...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setUsername('');
              setPhoneNumber('');
            }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {isSignUp 
              ? 'Already have an account? Sign In' 
              : "Don't have an account? Sign Up"
            }
          </button>
        </div>

        <div className="mt-8 text-xs text-gray-500 text-center space-y-1">
          <p>🔥 <strong>Real Authentication System</strong></p>
          <p>Manual login required for security</p>
        </div>
      </div>
    </div>
  );
};

export default Login;