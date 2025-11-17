import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { useStore } from '../../store/useStore';

export default function TermsScreen({ navigation }) {
  const acceptTerms = useStore(state => state.acceptTerms);

  const handleAgree = () => {
    acceptTerms();
    navigation.navigate('AgeVerification');
  };

  const handleDecline = () => {
    // In a real app, this would exit or show a message
    alert('You must accept the terms to use RANDR');
  };

  return (
    <View className="flex-1 bg-background-dark">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 pt-12">
        <Text className="text-white text-xl font-bold">Terms and Conditions</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4">
        <Text className="text-white text-3xl font-bold mb-6">Our Terms</Text>

        <Text className="text-gray-300 text-base leading-6 mb-6">
          Welcome to RANDR. By using our app, you agree to the following terms and conditions.
          Please read them carefully. To use RANDR, you must accept these terms.
        </Text>

        <Text className="text-white text-xl font-bold mb-4">User Conduct</Text>
        <Text className="text-gray-300 text-base leading-6 mb-6">
          You agree not to engage in any of the following prohibited activities: harassing,
          threatening, or intimidating other users; posting or sharing content that is illegal,
          hateful, or explicit; impersonating any person or entity or falsely stating or otherwise
          misrepresenting your affiliation with a person or entity. Violation of these rules will
          result in immediate termination of your access.
        </Text>

        <Text className="text-white text-xl font-bold mb-4">Privacy and Anonymity</Text>
        <Text className="text-gray-300 text-base leading-6 mb-6">
          RANDR is designed for anonymous conversations. We do not store your personal information
          linking to your chats. However, we reserve the right to monitor content for violations of
          our User Conduct policy. Do not share personal identifying information with strangers.
        </Text>

        <Text className="text-white text-xl font-bold mb-4">Content Moderation</Text>
        <Text className="text-gray-300 text-base leading-6 mb-8">
          We use automated systems to detect and filter harmful content. By using RANDR, you
          consent to having your messages monitored for safety purposes. Chat logs are automatically
          deleted after each session ends.
        </Text>
      </ScrollView>

      {/* Buttons */}
      <View className="px-4 pb-8 gap-3">
        <Button title="I Agree" onPress={handleAgree} />
        <Button title="Decline" onPress={handleDecline} variant="secondary" />
      </View>
    </View>
  );
}
