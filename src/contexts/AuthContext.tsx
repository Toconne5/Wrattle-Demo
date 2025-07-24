import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  sessionTimeRemaining: number;
  authenticate: (user: User) => void;
  logout: () => Promise<void>;
  extendSession: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  sessionTimeRemaining: 0,
  authenticate: () => {},
  logout: async () => {},
  extendSession: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const SESSION_DURATION = 15 * 60 * 1000; // 15 minutes
const WARNING_TIME = 2 * 60 * 1000; // 2 minutes before expiry

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(0);
  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout | null>(null);
  const [warningShown, setWarningShown] = useState(false);

  // Check if this is a fresh browser session
  const isFreshSession = () => {
    // Check if browser was restarted (no session storage from previous session)
    const hadSession = sessionStorage.getItem('wrattle_browser_session');
    if (!hadSession) {
      // Fresh browser session - mark it
      sessionStorage.setItem('wrattle_browser_session', 'active');
      return true;
    }
    return false;
  };

  // Start session timer
  const startSessionTimer = () => {
    const startTime = Date.now();
    setSessionTimeRemaining(SESSION_DURATION);
    
    // Clear any existing timer
    if (sessionTimer) {
      clearInterval(sessionTimer);
    }

    // Update countdown every second
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = SESSION_DURATION - elapsed;
      
      setSessionTimeRemaining(remaining);
      
      // Show warning at 2 minutes remaining
      if (remaining <= WARNING_TIME && !warningShown) {
        setWarningShown(true);
        showSessionWarning();
      }
      
      // Auto-logout when session expires
      if (remaining <= 0) {
        console.log('🕐 SESSION EXPIRED - AUTO LOGOUT');
        clearInterval(timer);
        logout();
      }
    }, 1000);
    
    setSessionTimer(timer);
  };

  // Show session expiry warning
  const showSessionWarning = () => {
    const extend = window.confirm(
      '⚠️ Your session will expire in 2 minutes for security.\n\nClick OK to extend your session, or Cancel to logout now.'
    );
    
    if (extend) {
      extendSession();
    } else {
      logout();
    }
  };

  // Extend session
  const extendSession = () => {
    console.log('🔄 EXTENDING SESSION');
    setWarningShown(false);
    startSessionTimer();
    
    // Update last activity
    sessionStorage.setItem('wrattle_last_activity', Date.now().toString());
  };

  // Authenticate user for this session
const authenticate = (firebaseUser: User) => {
  console.log('🔐 BANKING AUTH: MANUALLY AUTHENTICATING USER:', firebaseUser.email);

  // Skip the manual authentication check for demo
  sessionStorage.setItem('wrattle_manual_auth', 'true'); // Force manualAuth to true

  // Set session markers
  sessionStorage.setItem('wrattle_auth_time', Date.now().toString());
  sessionStorage.setItem('wrattle_last_activity', Date.now().toString());
  setUser(firebaseUser);
  setIsAuthenticated(true);

  // Start security timer
  startSessionTimer();
};


  // Logout with security cleanup
  const logout = async () => {
    try {
      console.log('🔒 BANKING LOGOUT: Clearing all session data');
      
      // Clear all session data
      sessionStorage.clear();
      localStorage.removeItem('wrattle_manual_auth');
      localStorage.removeItem('wrattle_auth_time');
      
      // Clear timers
      if (sessionTimer) {
        clearInterval(sessionTimer);
        setSessionTimer(null);
      }
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      setSessionTimeRemaining(0);
      setWarningShown(false);
      
      // Sign out from Firebase
      await signOut(auth);
      
      console.log('✅ BANKING LOGOUT COMPLETE');
    } catch (error) {
      console.error('❌ LOGOUT ERROR:', error);
    }
  };

  // Activity monitoring for session extension
  useEffect(() => {
    const updateActivity = () => {
      if (isAuthenticated) {
        sessionStorage.setItem('wrattle_last_activity', Date.now().toString());
      }
    };

    // Monitor user activity
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    activityEvents.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, [isAuthenticated]);

  // Main authentication state management
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    console.log('🔥 FIREBASE AUTH STATE:', firebaseUser ? firebaseUser.email : 'NO USER');
    
    const manualAuth = sessionStorage.getItem('wrattle_manual_auth');
    const freshSession = isFreshSession();  // Check if it's a new session
    
    if (firebaseUser) {
      if (manualAuth === 'true' && !freshSession) {
        // Skip email verification check for demo and mark user as authenticated
        console.log('✅ BANKING AUTH: User signed in and skipping verification for demo');
        
        setUser(firebaseUser);
        setIsAuthenticated(true);
        setLoading(false);
        
        // Start session timer or continue the current session
        startSessionTimer();
      }
    } else {
      // No Firebase user or session expired, log the user out
      console.log('❌ NO USER OR SESSION EXPIRED');
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      logout();
    }
  });

  return () => {
    unsubscribe();
  };
}, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    sessionTimeRemaining,
    authenticate,
    logout,
    extendSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};