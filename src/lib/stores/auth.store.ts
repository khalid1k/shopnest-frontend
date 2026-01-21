import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthResponse } from '../services/auth.service';

interface User {
  fullName: string;
  email: string;
  id: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (data: AuthResponse) => void;
  setUser: (data: User) => void;
  clearAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (data: AuthResponse) => {
        set({
          user: {
            id: data.id,
            fullName: data.fullName,
            email: data.email,
          },
          accessToken: data.accessToken,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },

      clearAuth: () => {
        set({ user: null });
      },

      logout: () => {
        set({ user: null });
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage', // ✅ REQUIRED
    }
  )
);
