import { create } from 'zustand';
import type { ColorSchemeType } from '@vkontakte/vkui';
import type { VKUser } from '../types';

interface AppState {
  user: VKUser | null;
  colorScheme: ColorSchemeType;
  isLoading: boolean;
  setUser: (user: VKUser | null) => void;
  setColorScheme: (colorScheme: ColorSchemeType) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  colorScheme: 'light',
  isLoading: false,
  setUser: (user) => set({ user }),
  setColorScheme: (colorScheme) => set({ colorScheme }),
  setLoading: (isLoading) => set({ isLoading }),
}));
