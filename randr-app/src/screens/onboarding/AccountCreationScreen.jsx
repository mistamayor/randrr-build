import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { useStore } from '../../store/useStore';
import { generateUsername } from '../../constants/avatars';

export default function AccountCreationScreen({ navigation }) {
  const { user, setUsername, initializeUser } = useStore();

  useEffect(() => {
    initializeUser();
  }, []);

  const handleRegenerateUsername = () => {
    setUsername(generateUsername());
  };

  const handleContinue = () => {
    navigation.navigate('ProfileSetup');
  };

  return (
    <View className="flex-1 bg-background-dark justify-between p-4">
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-3xl font-bold mb-12 text-center">
          Create Your Account
        </Text>

        {/* Avatar placeholder (gradient) */}
        <View className="w-48 h-48 rounded-full mb-8 items-center justify-center bg-gradient-to-br from-pink-500 to-blue-500">
          <Text className="text-6xl">{user.avatar?.emoji || '🌈'}</Text>
        </View>

        {/* Username */}
        <View className="flex-row items-center gap-4 mb-2">
          <Text className="text-white text-xl font-normal">{user.username}</Text>
          <TouchableOpacity onPress={handleRegenerateUsername}>
            <Ionicons name="refresh" size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <Text className="text-gray-400 text-sm text-center px-4">
          Your anonymous ID. You can change this once.
        </Text>
      </View>

      <View className="gap-4">
        <Button title="Start Anonymously" onPress={handleContinue} />

        <View className="flex-row items-center justify-center gap-3 my-2">
          <View className="h-px bg-gray-700 flex-1" />
          <Text className="text-gray-500 text-sm">Or</Text>
          <View className="h-px bg-gray-700 flex-1" />
        </View>

        <Button
          title="Sign in with Apple"
          onPress={() => alert('Apple Sign In coming soon')}
          variant="secondary"
        />
        <Button
          title="Sign in with Google"
          onPress={() => alert('Google Sign In coming soon')}
          variant="secondary"
        />

        <Text className="text-gray-600 text-xs text-center px-4 mt-2">
          By continuing, you agree to our Terms of Service & Privacy Policy.
        </Text>
      </View>
    </View>
  );
}
