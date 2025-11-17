import React from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { useStore } from '../../store/useStore';

export default function ProfileScreen({ navigation }) {
  const { user, settings, toggleLocalMode, toggleDarkMode, updateSettings, resetApp } = useStore();

  const handleResetApp = () => {
    Alert.alert(
      'Reset App',
      'This will clear all data and restart onboarding. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetApp();
            navigation.replace('Welcome');
          },
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-background-dark">
      {/* Header */}
      <View className="bg-card-dark pt-12 pb-6 px-4">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Profile & Mode</Text>
          <View className="w-6" />
        </View>

        {/* Avatar and username */}
        <View className="items-center">
          <View className="w-20 h-20 rounded-full bg-gray-700 items-center justify-center mb-3">
            <Text className="text-4xl">{user.avatar?.emoji || '👤'}</Text>
          </View>
          <Text className="text-white text-xl font-bold">{user.username}</Text>
        </View>
      </View>

      {/* Matchmaking Mode */}
      <View className="px-4 py-6 border-b border-gray-800">
        <Text className="text-white text-xl font-bold mb-4">Matchmaking Mode</Text>

        <View className="flex-row gap-2 mb-3">
          <TouchableOpacity
            onPress={() => settings.localMode && toggleLocalMode()}
            className={`flex-1 py-3 rounded-lg border-2 ${
              !settings.localMode ? 'bg-primary border-primary' : 'border-gray-700'
            }`}
          >
            <Text className={`text-center font-bold ${!settings.localMode ? 'text-white' : 'text-gray-400'}`}>
              🌍 Global
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => !settings.localMode && toggleLocalMode()}
            className={`flex-1 py-3 rounded-lg border-2 ${
              settings.localMode ? 'bg-primary border-primary' : 'border-gray-700'
            }`}
          >
            <Text className={`text-center font-bold ${settings.localMode ? 'text-white' : 'text-gray-400'}`}>
              📍 Local
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-400 text-sm">
          Local: Connect with users nearby. Global: Chat with anyone in the world.
        </Text>
      </View>

      {/* Settings */}
      <View className="px-4 py-6">
        <Text className="text-white text-xl font-bold mb-4">Settings</Text>

        {/* Dark Mode */}
        <View className="bg-card-dark rounded-lg p-4 mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Ionicons name="moon" size={24} color="#FFFFFF" />
            <Text className="text-white font-medium">Dark Mode</Text>
          </View>
          <Switch
            value={settings.darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#374151', true: '#2b8cee' }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Match Notifications */}
        <View className="bg-card-dark rounded-lg p-4 mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Ionicons name="notifications" size={24} color="#FFFFFF" />
            <Text className="text-white font-medium">Match Notifications</Text>
          </View>
          <Switch
            value={settings.matchNotifications}
            onValueChange={(val) => updateSettings({ matchNotifications: val })}
            trackColor={{ false: '#374151', true: '#2b8cee' }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Privacy & Safety */}
        <TouchableOpacity
          onPress={() => navigation.navigate('PrivacySettings')}
          className="bg-card-dark rounded-lg p-4 mb-3 flex-row items-center justify-between"
        >
          <View className="flex-row items-center gap-3">
            <Ionicons name="shield-checkmark" size={24} color="#FFFFFF" />
            <Text className="text-white font-medium">Privacy & Safety</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        {/* Blocked Users */}
        <TouchableOpacity
          onPress={() => navigation.navigate('BlockedUsers')}
          className="bg-card-dark rounded-lg p-4 mb-3 flex-row items-center justify-between"
        >
          <View className="flex-row items-center gap-3">
            <Ionicons name="ban" size={24} color="#FFFFFF" />
            <Text className="text-white font-medium">Blocked Users</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        {/* Premium */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Premium')}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-4 mb-6 flex-row items-center justify-between"
        >
          <View className="flex-row items-center gap-3">
            <Ionicons name="star" size={24} color="#FFFFFF" />
            <Text className="text-white font-medium">Go Premium</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Reset App (for testing) */}
        <Button
          title="Reset App (Testing)"
          onPress={handleResetApp}
          variant="danger"
        />
      </View>
    </ScrollView>
  );
}
