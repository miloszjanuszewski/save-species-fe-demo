
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  login: (username: string) => set({ isAuthenticated: true, username }),
  logout: () => set({ isAuthenticated: false, username: null }),
}));
