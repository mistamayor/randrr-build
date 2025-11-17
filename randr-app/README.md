# RANDR - Random Chat Mobile App

A React Native mobile application for spontaneous, anonymous conversations with strangers worldwide or nearby.

## Tech Stack

- **React Native** with Expo (Managed Workflow)
- **NativeWind** (Tailwind CSS for React Native)
- **Zustand** for state management
- **React Navigation** (Stack + Bottom Tabs)
- **AsyncStorage** for local persistence

## Features Implemented

### ✅ Onboarding Flow
- Welcome carousel (3 screens)
- Terms & Conditions
- Age verification (18+)
- Anonymous account creation with auto-generated usernames
- Optional profile setup (avatar, interests, age range)

### ✅ Main App
- Home screen with "Find Someone" matchmaking
- Local/Global mode toggle
- Animated "Finding Match" screen (2-5 second simulation)
- Real-time chat interface with bot responses
- Content filtering (blocks phone numbers, emails, social handles, URLs)
- Profile & settings management
- Privacy settings
- Blocked users management
- Premium upgrade screen (UI only)

### ✅ Chat Features
- Text-only chat with emoji support
- Bot responses with different personalities for Local vs Global mode
- Message filtering and validation
- "Next Chat" and "End Chat" options
- Report/Block functionality
- Typing indicators
- Auto-scroll to latest messages

## Project Structure

```
randr-app/
├── src/
│   ├── components/
│   │   └── common/          # Reusable UI components
│   ├── constants/           # Colors, avatars, interests
│   ├── data/                # Bot responses & conversation logic
│   ├── navigation/          # App & Tab navigators
│   ├── screens/
│   │   ├── onboarding/      # Welcome, Terms, Age, Account, Profile
│   │   ├── home/            # Home & Chats tabs
│   │   ├── chat/            # FindingMatch & ChatScreen
│   │   ├── profile/         # Profile management
│   │   └── settings/        # Privacy, Blocked, Premium
│   ├── store/               # Zustand global state
│   └── utils/               # Content filtering utilities
├── App.js                   # Main entry point
├── global.css               # NativeWind styles
└── package.json
```

## Installation & Running

### Prerequisites
- Node.js 18+ installed
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start the app:
```bash
npm start
```

3. Run on specific platform:
```bash
# iOS (macOS only)
npm run ios

# Android
npm run android

# Web (for testing)
npm run web
```

## How It Works

### Simulated Backend
Since this is a frontend-only implementation, the following features are simulated:

- **Matchmaking**: Random 2-5 second delay before "matching" with a bot
- **Chat Partners**: Auto-generated usernames and avatars
- **Messages**: Bot responds intelligently based on user input
- **Local/Global Mode**: Different bot response pools

### Bot Conversation System
- Greets user on first message
- Responds contextually to questions
- Occasionally asks questions back
- Small chance to "leave" after 8+ messages
- Different responses for Local vs Global mode

### Content Filtering
The app blocks messages containing:
- Phone numbers (various formats)
- Email addresses
- Social media handles (@username)
- URLs and website links
- Suspicious obfuscation patterns

## Future Backend Integration (Supabase)

The app is structured to easily integrate with Supabase:

1. **Authentication**: Replace anonymous creation with Supabase Auth
2. **Real-time Chat**: Use Supabase Realtime for WebSocket messaging
3. **User Matching**: Implement server-side matchmaking logic
4. **Content Moderation**: Integrate AI moderation APIs
5. **Storage**: Store user preferences and blocked users in Supabase DB

## Testing Features

- **Reset App**: Available in Profile screen to restart onboarding (for testing)
- **Block/Unblock**: Test safety features
- **Local/Global Toggle**: See different bot response styles

## Design System

### Colors
- Primary: `#2b8cee` (Blue)
- Background Dark: `#101922`
- Card Dark: `#1a2532`
- Accent: `#F5A623` (Orange/Yellow)

### Typography
- Font: Inter (via system fonts)
- Dark mode by default

## Known Limitations (Frontend-Only)

- No real users (bot simulation only)
- No persistent chat history
- No actual payments for Premium
- No push notifications
- No real-time typing from actual users
- No voice/video calls

## Next Steps for MVP

1. Set up Supabase project
2. Implement Supabase Auth
3. Build real-time matchmaking API
4. Add WebSocket chat functionality
5. Integrate AI content moderation
6. Implement push notifications
7. Add payment processing

## License

MIT
