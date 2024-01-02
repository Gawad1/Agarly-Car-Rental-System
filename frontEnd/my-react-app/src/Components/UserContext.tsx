// UserContext.tsx
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface User {
  name: string;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const checkAuthenticationStatus = (): boolean => {
  // You should implement your authentication check logic here
  // For example, check if there is a valid token in localStorage
  const token = localStorage.getItem('authToken');
  return Boolean(token);
};

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check authentication status and set the user accordingly
    const isAuthenticated = checkAuthenticationStatus();
    if (isAuthenticated) {
      setUser({ name: 'Authenticated User' }); // Replace with actual user data
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser, UserContext };
