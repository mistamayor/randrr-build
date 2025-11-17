import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';
import { useStore } from '../../store/useStore';

export default function BlockedUsersScreen({ navigation }) {
  const { blockedUsers, unblockUser } = useStore();

  const handleUnblock = (username) => {
    Alert.alert(
      'Unblock User',
      `Are you sure you want to unblock ${username}? You may be matched with them again.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unblock',
          onPress: () => unblockUser(username),
        },
      ]
    );
  };

  const renderUser = ({ item }) => (
    <View className="flex-row items-center justify-between bg-card-dark rounded-lg p-4 mb-3">
      <View className="flex-row items-center gap-3">
        <View className="w-10 h-10 bg-gray-700 rounded-full items-center justify-center">
          <Text className="text-lg">👤</Text>
        </View>
        <Text className="text-white font-medium">{item.username}</Text>
      </View>

      <TouchableOpacity onPress={() => handleUnblock(item.username)}>
        <Text className="text-primary font-bold">Unblock</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-background-dark">
      <View className="pt-12 px-4 pb-4 border-b border-gray-800">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Blocked Users</Text>
        </View>
      </View>

      {blockedUsers.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Ionicons name="ban-outline" size={80} color="#374151" />
          <Text className="text-white text-xl font-bold mt-4 mb-2">No Blocked Users</Text>
          <Text className="text-gray-400 text-center">
            Users you block will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={blockedUsers}
          renderItem={renderUser}
          keyExtractor={item => item.username}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}
