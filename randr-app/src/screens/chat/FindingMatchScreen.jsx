import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';
import { generateUsername, getRandomAvatar } from '../../constants/avatars';

export default function FindingMatchScreen({ navigation }) {
  const [progress] = useState(new Animated.Value(0));
  const { settings, setCurrentChat, setIsSearching } = useStore();

  useEffect(() => {
    setIsSearching(true);

    // Animate progress bar
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    // Simulate finding a match after 2-4 seconds
    const matchDelay = 2000 + Math.random() * 2000;

    const timer = setTimeout(() => {
      // Generate random stranger
      const stranger = {
        username: generateUsername(),
        avatar: getRandomAvatar(),
        isOnline: true,
        mode: settings.localMode ? 'local' : 'global',
      };

      setCurrentChat(stranger);
      setIsSearching(false);
      navigation.replace('Chat');
    }, matchDelay);

    return () => {
      clearTimeout(timer);
      setIsSearching(false);
    };
  }, []);

  const handleCancel = () => {
    setIsSearching(false);
    navigation.goBack();
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View className="flex-1 bg-background-dark">
      {/* Close button */}
      <TouchableOpacity
        onPress={handleCancel}
        className="absolute top-12 right-4 z-10 p-2"
      >
        <Ionicons name="close" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Content */}
      <View className="flex-1 items-center justify-center px-8">
        {/* Animated search icon */}
        <View className="w-40 h-40 items-center justify-center mb-12">
          <View className="absolute w-40 h-40 bg-primary/20 rounded-full" />
          <View className="absolute w-32 h-32 bg-primary/30 rounded-full" />
          <View className="w-24 h-24 bg-primary rounded-full items-center justify-center">
            <Ionicons name="search" size={48} color="#FFFFFF" />
          </View>
        </View>

        {/* Text */}
        <Text className="text-white text-2xl font-bold mb-2">
          Finding someone new...
        </Text>

        <View className="flex-row items-center gap-2 mb-8">
          <Text className="text-gray-400 text-base">5s max</Text>
        </View>

        {/* Progress bar */}
        <View className="w-full bg-gray-700 h-1 rounded-full overflow-hidden mb-6">
          <Animated.View
            className="h-full bg-primary"
            style={{ width: progressWidth }}
          />
        </View>

        <Text className="text-gray-400 text-center max-w-xs">
          The app is actively searching for a chat partner. This should be quick!
        </Text>
      </View>

      {/* Cancel button */}
      <View className="px-4 pb-8">
        <TouchableOpacity
          onPress={handleCancel}
          className="bg-gray-800 border border-gray-700 rounded-lg h-12 items-center justify-center"
        >
          <Text className="text-white font-bold">Cancel Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
