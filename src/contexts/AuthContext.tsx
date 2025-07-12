import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useBrand } from './BrandContext';

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
  const { getBrandByEmail } = useBrand();

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check if it's a brand account created by admin
    const brand = getBrandByEmail(email);
    if (brand && brand.password === password) {
      const brandUser: User = {
        id: brand.id,
        email: brand.ownerEmail,
        username: brand.brandName,
        isBrand: true,
        brandName: brand.brandName,
        brandDescription: brand.brandDescription || '',
        brandLogo: brand.brandLogo || 'https://i.postimg.cc/xTVNmCps/Dream-X-Store.png',
        joinedDate: brand.createdAt
      };
      setUser(brandUser);
      return true;
    }
    
    // Regular user login - Extract username from email
    const username = email.includes('@') ? email.split('@')[0] : email;
    const regularUser: User = {
      id: 'user-1',
      email: email,
      username: username,
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