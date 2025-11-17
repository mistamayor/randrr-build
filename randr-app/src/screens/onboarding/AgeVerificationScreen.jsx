import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/common/Button';

export default function AgeVerificationScreen({ navigation }) {
  const [isUnder18, setIsUnder18] = useState(false);

  const handleAgeCheck = (under18) => {
    if (under18) {
      setIsUnder18(true);
    } else {
      navigation.navigate('AccountCreation');
    }
  };

  if (isUnder18) {
    return (
      <View className="flex-1 bg-background-dark items-center justify-center px-8">
        <View className="bg-card-dark rounded-2xl p-8 items-center">
          <View className="w-20 h-20 bg-red-500/20 rounded-full items-center justify-center mb-6">
            <Text className="text-red-500 text-4xl">🚫</Text>
          </View>

          <Text className="text-white text-2xl font-bold text-center mb-4">
            Access Restricted
          </Text>
          <Text className="text-gray-400 text-base text-center mb-8">
            Sorry, you're not old enough. Randr is an 18+ community, so you cannot create an
            account at this time.
          </Text>

          <Button
            title="I Understand"
            onPress={() => setIsUnder18(false)}
            className="w-full"
          />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-dark items-center justify-center px-8">
      <Text className="text-white text-3xl font-bold mb-4 text-center">
        Are you 18 or older?
      </Text>
      <Text className="text-gray-400 text-base mb-12 text-center">
        RANDR is an 18+ community. Please confirm your age to continue.
      </Text>

      <View className="w-full gap-4">
        <Button title="Yes, I'm 18 or older" onPress={() => handleAgeCheck(false)} />
        <Button
          title="No, I'm under 18"
          onPress={() => handleAgeCheck(true)}
          variant="secondary"
        />
      </View>
    </View>
  );
}
