import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<string | undefined>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:'+ error.message);
        return 'Error:'+ error.message
      } else {
        console.error('Error login');
      }
    }
  };


  const logout = () => {
    signOut(auth)
    .then(() => {
      setUser(null);
    })
    .catch((error) => {
      console.error('Error during logout:', error.message);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
