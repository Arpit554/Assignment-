import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  currentUser: UserProfile | null;
  users: UserProfile[];
  setCurrentUser: (user: UserProfile) => void;
  switchUserById: (userId: string) => void;
  refreshUsers: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  users: [],
  setCurrentUser: () => {},
  switchUserById: () => {},
  refreshUsers: async () => {},
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const fetchedUsers = await api.getUsers();
      setUsers(fetchedUsers);
      if (fetchedUsers.length > 0 && !currentUser) {
        // Default to Priya Sharma (Registered) matching the primary mockup
        setCurrentUser(fetchedUsers[0]);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const switchUserById = (userId: string) => {
    const target = users.find((u) => u._id === userId);
    if (target) {
      setCurrentUser(target);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        setCurrentUser,
        switchUserById,
        refreshUsers: loadUsers,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
