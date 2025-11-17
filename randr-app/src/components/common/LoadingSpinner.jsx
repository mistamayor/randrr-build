import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

export default function LoadingSpinner({ text, size = 'large' }) {
  return (
    <View className="flex-1 items-center justify-center bg-background-dark">
      <ActivityIndicator size={size} color="#2b8cee" />
      {text && (
        <Text className="text-gray-400 mt-4 text-base">{text}</Text>
      )}
    </View>
  );
}
