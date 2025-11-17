import React from 'react';
import { View, TextInput, Text } from 'react-native';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  className = '',
  ...props
}) {
  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-white text-sm font-medium mb-2">{label}</Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
        className="bg-card-dark border border-gray-700 rounded-lg px-4 h-12 text-white"
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}
