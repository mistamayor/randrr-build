import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';

export default function PremiumScreen({ navigation }) {
  return (
    <View className="flex-1 bg-background-dark">
      <View className="pt-12 px-4 pb-4 flex-row items-center justify-between">
        <Text className="text-white text-lg font-bold">Go Premium</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4">
        <Text className="text-white text-3xl font-bold text-center my-8">
          Unlock the Full RANDR Experience
        </Text>

        <Text className="text-gray-400 text-center mb-8">
          Get the most out of your anonymous chats with these exclusive benefits.
        </Text>

        <View className="gap-4 mb-8">
          <View className="bg-card-dark rounded-xl p-4 flex-row gap-4">
            <View className="w-12 h-12 bg-primary/20 rounded-full items-center justify-center">
              <Ionicons name="shield-checkmark" size={24} color="#2b8cee" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">Ad-Free Experience</Text>
              <Text className="text-gray-400 text-sm">
                Enjoy uninterrupted conversations without any ads.
              </Text>
            </View>
          </View>

          <View className="bg-card-dark rounded-xl p-4 flex-row gap-4">
            <View className="w-12 h-12 bg-primary/20 rounded-full items-center justify-center">
              <Ionicons name="rocket" size={24} color="#2b8cee" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">Priority Matchmaking</Text>
              <Text className="text-gray-400 text-sm">
                Connect faster and get placed ahead in the matching queue.
              </Text>
            </View>
          </View>

          <View className="bg-card-dark rounded-xl p-4 flex-row gap-4">
            <View className="w-12 h-12 bg-primary/20 rounded-full items-center justify-center">
              <Ionicons name="filter" size={24} color="#2b8cee" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">Premium Filters</Text>
              <Text className="text-gray-400 text-sm">
                Access exclusive filters like interests and location proximity.
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-card-dark rounded-xl p-6 mb-6 items-center">
          <Text className="text-gray-400 text-sm mb-2">Monthly Subscription</Text>
          <Text className="text-white text-5xl font-bold mb-1">£2.99</Text>
          <Text className="text-gray-400 text-sm">/month</Text>
        </View>

        <Button
          title="Upgrade Now"
          onPress={() => alert('Payment integration coming soon!')}
          className="mb-4"
        />

        <Text className="text-gray-500 text-xs text-center">
          Secure payment via Google Play / Apple Pay
        </Text>
      </ScrollView>
    </View>
  );
}
