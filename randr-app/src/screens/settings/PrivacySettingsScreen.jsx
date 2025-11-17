import React from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';

export default function PrivacySettingsScreen({ navigation }) {
  const { settings, updateSettings } = useStore();

  return (
    <View className="flex-1 bg-background-dark">
      <View className="pt-12 px-4 pb-4 border-b border-gray-800">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Privacy & Safety</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-gray-400 text-sm mb-6">
          To protect your privacy, all chat logs are automatically and permanently deleted after a chat ends.
        </Text>

        <View className="bg-card-dark rounded-lg p-4 mb-4">
          <Ionicons name="shield-checkmark" size={24} color="#10b981" />
          <Text className="text-white font-bold mt-2">Safety Tips</Text>
          <Text className="text-gray-400 text-sm mt-1">
            Learn how to stay safe while chatting
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('BlockedUsers')}
          className="bg-card-dark rounded-lg p-4 flex-row items-center justify-between"
        >
          <View className="flex-row items-center gap-3">
            <Ionicons name="ban" size={24} color="#FFFFFF" />
            <Text className="text-white font-medium">Blocked Users</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
