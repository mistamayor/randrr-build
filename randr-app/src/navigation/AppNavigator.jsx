import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStore } from '../store/useStore';

// Onboarding screens
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import TermsScreen from '../screens/onboarding/TermsScreen';
import AgeVerificationScreen from '../screens/onboarding/AgeVerificationScreen';
import AccountCreationScreen from '../screens/onboarding/AccountCreationScreen';
import ProfileSetupScreen from '../screens/onboarding/ProfileSetupScreen';

// Main app
import MainTabNavigator from './MainTabNavigator';

// Other screens
import ChatScreen from '../screens/chat/ChatScreen';
import FindingMatchScreen from '../screens/chat/FindingMatchScreen';
import PrivacySettingsScreen from '../screens/settings/PrivacySettingsScreen';
import BlockedUsersScreen from '../screens/settings/BlockedUsersScreen';
import PremiumScreen from '../screens/settings/PremiumScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const hasCompletedOnboarding = useStore(state => state.hasCompletedOnboarding);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#101922' },
        }}
      >
        {!hasCompletedOnboarding ? (
          // Onboarding flow
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="AgeVerification" component={AgeVerificationScreen} />
            <Stack.Screen name="AccountCreation" component={AccountCreationScreen} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          </>
        ) : (
          // Main app
          <>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="FindingMatch" component={FindingMatchScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
            <Stack.Screen name="BlockedUsers" component={BlockedUsersScreen} />
            <Stack.Screen name="Premium" component={PremiumScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
