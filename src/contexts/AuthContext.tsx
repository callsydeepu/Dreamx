import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  username: string;
  isBrand: boolean;
  brandName?: string;
  brandDescription?: string;
  brandLogo?: string;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isBrand: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo brand account
    if (email === 'rockage112@gmail.com' && password === 'Abhishek@123') {
      const brandUser: User = {
        id: 'brand-1',
        email: 'rockage112@gmail.com',
        username: 'ROCKAGE',
        isBrand: true,
        brandName: 'ROCKAGE',
        brandDescription: 'Rockage: Where fashion meets fearless attitude! Celebrate individuality with our premium 100% cotton, 250gsm oversized anime tees. Bold designs like "HONOR BOUND" and "GENJUTSU" in sizes S-XXL. Wear your attitude. Rock your age!',
        brandLogo: 'https://i.postimg.cc/xTVNmCps/Dream-X-Store.png',
        joinedDate: '2024-01-15'
      };
      setUser(brandUser);
      return true;
    }
    
    // Regular user login
    const regularUser: User = {
      id: 'user-1',
      email: email,
      username: email.split('@')[0],
      isBrand: false,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUser(regularUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isBrand: user?.isBrand || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};