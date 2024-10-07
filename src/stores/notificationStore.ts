
import {create} from 'zustand';

interface NotificationState {
  message: string | null;
  addNotification: (message: string) => void;
  clearNotification: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  message: null,
  addNotification: (message: string) => set({ message }),
  clearNotification: () => set({ message: null }),
}));
