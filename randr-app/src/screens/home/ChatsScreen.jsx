import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatsScreen() {
  return (
    <View className="flex-1 bg-background-dark items-center justify-center px-8">
      <Ionicons name="chatbubbles-outline" size={80} color="#374151" />
      <Text className="text-white text-2xl font-bold mt-6 mb-2">No Chat History</Text>
      <Text className="text-gray-400 text-base text-center">
        Chats are automatically deleted after each session for your privacy.
      </Text>
    </View>
  );
}
