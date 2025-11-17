import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/common/Button';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    icon: 'chatbubbles',
    title: 'Welcome to RANDR',
    description: 'A place for spontaneous and anonymous conversations with people from around the world.',
  },
  {
    icon: 'planet',
    title: 'Random, But Not Really',
    description: 'We connect you with random strangers who share your interests, so you always have something to talk about.',
  },
  {
    icon: 'rocket',
    title: 'Spark a Chat About Anything',
    description: 'On RANDR, you\'re instantly connected with someone new based on a shared topic. No profiles, no history—just pure, spontaneous conversation.',
  },
];

export default function WelcomeScreen({ navigation }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slide);
  };

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      const nextSlide = currentSlide + 1;
      scrollViewRef.current?.scrollTo({ x: width * nextSlide, animated: true });
      setCurrentSlide(nextSlide);
    } else {
      navigation.navigate('Terms');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Terms');
  };

  return (
    <View className="flex-1 bg-background-dark">
      {/* Skip button */}
      <TouchableOpacity
        onPress={handleSkip}
        className="absolute top-12 right-4 z-10 p-2"
      >
        <Text className="text-gray-400 font-bold text-base">Skip Intro</Text>
      </TouchableOpacity>

      {/* Carousel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {SLIDES.map((slide, index) => (
          <View key={index} style={{ width }} className="flex-1 items-center justify-center px-8">
            {/* Icon */}
            <View className="w-60 h-60 bg-primary/20 rounded-full items-center justify-center mb-8">
              <Ionicons name={slide.icon} size={120} color="#2b8cee" />
            </View>

            {/* Text */}
            <View className="items-center gap-2">
              <Text className="text-white text-2xl font-bold text-center">
                {slide.title}
              </Text>
              <Text className="text-gray-400 text-base text-center max-w-xs leading-6">
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Page indicators and button */}
      <View className="px-4 pb-8 pt-4 items-center gap-6">
        {/* Indicators */}
        <View className="flex-row gap-3">
          {SLIDES.map((_, index) => (
            <View
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentSlide ? 'bg-primary' : 'bg-gray-700'
              }`}
            />
          ))}
        </View>

        {/* Button */}
        <View className="w-full">
          <Button
            title={currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
          />
        </View>
      </View>
    </View>
  );
}
