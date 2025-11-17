import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { useStore } from '../../store/useStore';

export default function HomeScreen({ navigation }) {
  const { settings, toggleLocalMode } = useStore();

  const handleFindSomeone = () => {
    navigation.navigate('FindingMatch');
  };

  return (
    <View className="flex-1 bg-background-dark">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 pt-12">
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={36} color="#FFFFFF" />
        </TouchableOpacity>

        <Text className="text-white text-lg font-bold">RANDR</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="settings-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1 justify-center px-4">
        <View className="items-center gap-12">
          {/* Headline */}
          <Text className="text-white text-3xl font-bold text-center">
            Ready to connect?
          </Text>

          {/* Find Someone Button */}
          <View className="w-full">
            <Button title="Find Someone" onPress={handleFindSomeone} />
          </View>

          {/* Local Mode Toggle */}
          <View className="w-full bg-card-dark rounded-xl p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 bg-gray-700 rounded-lg items-center justify-center">
                  <Ionicons name="map-outline" size={24} color="#FFFFFF" />
                </View>

                <View className="flex-1">
                  <Text className="text-white text-base font-medium">Local Mode</Text>
                  <Text className="text-gray-400 text-sm">Chat with people nearby.</Text>
                </View>
              </View>

              <Switch
                value={settings.localMode}
                onValueChange={toggleLocalMode}
                trackColor={{ false: '#374151', true: '#2b8cee' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>
      </View>

      {/* Bottom safe area */}
      <View className="h-20" />
    </View>
  );
}
