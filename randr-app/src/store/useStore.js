import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateUsername, getRandomAvatar } from '../constants/avatars';

export const useStore = create(
  persist(
    (set, get) => ({
      // User data
      user: {
        username: null,
        avatar: null,
        ageRange: [18, 45],
        country: null,
        interests: [],
        isAnonymous: true,
      },

      // App settings
      settings: {
        darkMode: true,
        localMode: false,
        matchNotifications: true,
        dailyReminders: false,
      },

      // Onboarding state
      hasCompletedOnboarding: false,
      hasAcceptedTerms: false,

      // Blocked users
      blockedUsers: [],

      // Current chat state (not persisted)
      currentChat: null,
      isSearching: false,

      // Actions
      setUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),

      initializeUser: () => {
        const state = get();
        if (!state.user.username) {
          set({
            user: {
              ...state.user,
              username: generateUsername(),
              avatar: getRandomAvatar(),
            }
          });
        }
      },

      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

      toggleLocalMode: () => set((state) => ({
        settings: { ...state.settings, localMode: !state.settings.localMode }
      })),

      toggleDarkMode: () => set((state) => ({
        settings: { ...state.settings, darkMode: !state.settings.darkMode }
      })),

      addInterest: (interest) => set((state) => {
        if (state.user.interests.length >= 3) return state;
        if (state.user.interests.includes(interest)) return state;
        return {
          user: {
            ...state.user,
            interests: [...state.user.interests, interest]
          }
        };
      }),

      removeInterest: (interest) => set((state) => ({
        user: {
          ...state.user,
          interests: state.user.interests.filter(i => i !== interest)
        }
      })),

      setAgeRange: (range) => set((state) => ({
        user: { ...state.user, ageRange: range }
      })),

      setCountry: (country) => set((state) => ({
        user: { ...state.user, country }
      })),

      setAvatar: (avatar) => set((state) => ({
        user: { ...state.user, avatar }
      })),

      setUsername: (username) => set((state) => ({
        user: { ...state.user, username }
      })),

      completeOnboarding: () => set({
        hasCompletedOnboarding: true
      }),

      acceptTerms: () => set({
        hasAcceptedTerms: true
      }),

      blockUser: (username) => set((state) => ({
        blockedUsers: [...state.blockedUsers, {
          username,
          blockedAt: new Date().toISOString(),
        }]
      })),

      unblockUser: (username) => set((state) => ({
        blockedUsers: state.blockedUsers.filter(u => u.username !== username)
      })),

      isUserBlocked: (username) => {
        const state = get();
        return state.blockedUsers.some(u => u.username === username);
      },

      setCurrentChat: (chat) => set({ currentChat: chat }),

      setIsSearching: (searching) => set({ isSearching: searching }),

      endCurrentChat: () => set({ currentChat: null }),

      // Reset app (for testing)
      resetApp: () => set({
        hasCompletedOnboarding: false,
        hasAcceptedTerms: false,
        user: {
          username: generateUsername(),
          avatar: getRandomAvatar(),
          ageRange: [18, 45],
          country: null,
          interests: [],
          isAnonymous: true,
        },
      }),
    }),
    {
      name: 'randr-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        settings: state.settings,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        hasAcceptedTerms: state.hasAcceptedTerms,
        blockedUsers: state.blockedUsers,
      }),
    }
  )
);
