import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-gray-700 border border-gray-600';
      case 'danger':
        return 'bg-red-500';
      case 'outline':
        return 'bg-transparent border-2 border-primary';
      default:
        return 'bg-primary';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'outline':
        return 'text-primary';
      default:
        return 'text-white';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-lg h-12 px-5 items-center justify-center ${getVariantStyles()} ${disabled ? 'opacity-50' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className={`text-base font-bold ${getTextStyles()}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
