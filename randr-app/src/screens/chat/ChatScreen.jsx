import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';
import { BotPersonality } from '../../data/botResponses';
import { checkMessage } from '../../utils/contentFilter';

export default function ChatScreen({ navigation }) {
  const { currentChat, settings, endCurrentChat, blockUser } = useStore();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const [strangerLeft, setStrangerLeft] = useState(false);
  const flatListRef = useRef(null);
  const botRef = useRef(new BotPersonality(settings.localMode ? 'local' : 'global'));

  useEffect(() => {
    // Initial greeting from stranger
    setTimeout(() => {
      addBotMessage(botRef.current.getResponse(''));
    }, 1000);
  }, []);

  const addBotMessage = (text) => {
    const newMessage = {
      id: Date.now().toString() + '-bot',
      text,
      sender: 'stranger',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = () => {
    if (!inputText.trim() || strangerLeft) return;

    // Check for prohibited content
    const contentCheck = checkMessage(inputText);
    if (!contentCheck.isAllowed) {
      Alert.alert('Message Blocked', contentCheck.reason);
      return;
    }

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot typing and response
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);

      // Check if bot wants to leave
      if (botRef.current.shouldLeaveChat()) {
        const farewellMessage = botRef.current.getFarewellMessage();
        addBotMessage(farewellMessage);
        setTimeout(() => {
          setStrangerLeft(true);
        }, 1000);
      } else {
        const response = botRef.current.getResponse(inputText);
        addBotMessage(response);
      }
    }, 1500 + Math.random() * 1500);
  };

  const handleNext = () => {
    Alert.alert(
      'Next Chat',
      'End this conversation and find someone new?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Next Chat',
          onPress: () => {
            endCurrentChat();
            navigation.replace('FindingMatch');
          },
        },
      ]
    );
  };

  const handleEndChat = () => {
    Alert.alert(
      'End Chat',
      'Are you sure you want to end this chat?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Chat',
          style: 'destructive',
          onPress: () => {
            endCurrentChat();
            navigation.navigate('MainTabs');
          },
        },
      ]
    );
  };

  const handleReport = () => {
    Alert.alert(
      'Report User',
      'Why are you reporting this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Inappropriate Content',
          onPress: () => {
            blockUser(currentChat?.username);
            Alert.alert('Reported', 'Thank you for helping us keep RANDR safe.');
            endCurrentChat();
            navigation.navigate('MainTabs');
          },
        },
        {
          text: 'Spam',
          onPress: () => {
            blockUser(currentChat?.username);
            Alert.alert('Reported', 'User has been blocked.');
            endCurrentChat();
            navigation.navigate('MainTabs');
          },
        },
      ]
    );
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';

    return (
      <View className={`flex-row ${isUser ? 'justify-end' : 'justify-start'} mb-3 px-4`}>
        <View className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser ? 'bg-primary' : 'bg-gray-700'
        }`}>
          <Text className="text-white text-base">{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background-dark"
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View className="bg-card-dark border-b border-gray-700 pt-12 pb-3 px-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={handleEndChat}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold">RANDR</Text>
          </View>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={handleNext} className="bg-primary px-4 py-2 rounded-lg">
              <Text className="text-white font-bold">Next Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReport}>
              <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* System message */}
      <View className="bg-gray-800/50 py-2 px-4">
        <Text className="text-gray-400 text-sm text-center">
          {strangerLeft
            ? 'Stranger has left the chat.'
            : 'You are now chatting with a stranger. Be kind!'}
        </Text>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Typing indicator */}
      {botTyping && (
        <View className="px-4 mb-2">
          <View className="bg-gray-700 rounded-2xl px-4 py-3 self-start">
            <Text className="text-gray-400">Stranger is typing...</Text>
          </View>
        </View>
      )}

      {/* Input */}
      <View className="bg-card-dark border-t border-gray-700 px-4 py-3 flex-row items-center gap-3">
        <TouchableOpacity>
          <Ionicons name="happy-outline" size={28} color="#9ca3af" />
        </TouchableOpacity>

        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Say hi..."
          placeholderTextColor="#6b7280"
          className="flex-1 bg-gray-800 rounded-full px-4 py-3 text-white"
          multiline
          maxLength={500}
          editable={!strangerLeft}
        />

        <TouchableOpacity
          onPress={handleSend}
          disabled={!inputText.trim() || strangerLeft}
          className={`w-12 h-12 rounded-full items-center justify-center ${
            inputText.trim() && !strangerLeft ? 'bg-primary' : 'bg-gray-700'
          }`}
        >
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
