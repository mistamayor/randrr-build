import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { useStore } from '../../store/useStore';
import { AVATARS } from '../../constants/avatars';
import { INTERESTS, MAX_INTERESTS } from '../../constants/interests';

export default function ProfileSetupScreen({ navigation }) {
  const {
    user,
    setAvatar,
    setAgeRange,
    addInterest,
    removeInterest,
    completeOnboarding,
  } = useStore();

  const handleComplete = () => {
    completeOnboarding();
    navigation.replace('MainTabs');
  };

  const handleSkip = () => {
    completeOnboarding();
    navigation.replace('MainTabs');
  };

  const toggleInterest = (interest) => {
    if (user.interests.includes(interest.id)) {
      removeInterest(interest.id);
    } else {
      addInterest(interest.id);
    }
  };

  return (
    <View className="flex-1 bg-background-dark">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 pt-12">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Personalize Your Experience</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 px-4">
        <Text className="text-gray-400 text-base text-center mb-8">
          These optional filters help us find better matches for you.
        </Text>

        {/* Choose Avatar */}
        <Text className="text-white text-xl font-bold mb-4">Choose an Avatar</Text>
        <View className="flex-row flex-wrap gap-3 mb-8">
          {AVATARS.slice(0, 8).map((avatar) => (
            <TouchableOpacity
              key={avatar.id}
              onPress={() => setAvatar(avatar)}
              className={`w-16 h-16 rounded-full items-center justify-center ${
                user.avatar?.id === avatar.id ? 'border-4 border-primary' : 'border-2 border-gray-700'
              }`}
              style={{ backgroundColor: avatar.color || '#4B5563' }}
            >
              <Text className="text-3xl">{avatar.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Age Range */}
        <Text className="text-white text-xl font-bold mb-2">Age Range</Text>
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-primary text-lg font-medium">
            {user.ageRange[0]} - {user.ageRange[1]}
          </Text>
        </View>

        {/* Interests */}
        <Text className="text-white text-xl font-bold mb-4">Interests</Text>
        <Text className="text-gray-400 text-sm mb-4">Select up to 3 interests</Text>

        <View className="flex-row flex-wrap gap-2 mb-8">
          {INTERESTS.map((interest) => {
            const isSelected = user.interests.includes(interest.id);
            const canSelect = user.interests.length < MAX_INTERESTS || isSelected;

            return (
              <TouchableOpacity
                key={interest.id}
                onPress={() => canSelect && toggleInterest(interest)}
                className={`px-4 py-2 rounded-full flex-row items-center gap-2 ${
                  isSelected ? 'bg-primary' : 'bg-gray-800 border border-gray-700'
                } ${!canSelect ? 'opacity-40' : ''}`}
                disabled={!canSelect}
              >
                <Text className="text-lg">{interest.emoji}</Text>
                <Text className={isSelected ? 'text-white' : 'text-gray-300'}>
                  {interest.label}
                </Text>
                {isSelected && (
                  <Ionicons name="close-circle" size={16} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="bg-card-dark/50 p-4 rounded-lg flex-row gap-3 mb-8">
          <Ionicons name="lock-closed" size={20} color="#9ca3af" />
          <Text className="text-gray-400 text-sm flex-1">
            Your info is only used for matchmaking and remains anonymous.
          </Text>
        </View>
      </ScrollView>

      {/* Buttons */}
      <View className="px-4 pb-8 gap-3">
        <Button title="Start Chatting" onPress={handleComplete} />
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-white text-center text-base">I'll do this later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
