# 🧩 **PRODUCT SPECIFICATION DOCUMENT (PRD)**

## Product Name: *Randr* (Working Title)

**Tagline:** *“Meet someone new. Every time you open the app.”*
**Version:** 1.0 (MVP)
**Date:** November 2025
**Owner:** Olu Adeogun

---

## 1. 🎯 **Product Overview**

Randr is a **mobile application** that connects two random users for instant, real-time chat — either globally or within a local radius. Each time the app opens, users are matched with a new person, promoting spontaneous social interaction and cultural exchange.

The app is designed around **simplicity, safety, and discovery**, blending the curiosity of random connections with the trust and control expected in modern communication platforms.

---

## 2. 🌍 **Vision & Mission**

**Vision:**
To make the world smaller by enabling safe, spontaneous conversations between strangers — one chat at a time.

**Mission:**
Build a global community where people can meet, chat, and connect meaningfully, while maintaining privacy, safety, and inclusivity.

---

## 3. 👤 **Target Audience**

| Segment                  | Description                                              | Example Users                                |
| ------------------------ | -------------------------------------------------------- | -------------------------------------------- |
| **Young Adults (18–30)** | Curious, social users exploring new friendships globally | Students, travellers, digital nomads         |
| **Language Learners**    | Users wanting to practice foreign languages              | Users from Duolingo or HelloTalk communities |
| **Remote Professionals** | Networking or casual local connections                   | Freelancers, expats                          |
| **Local Connectors**     | People seeking friends nearby                            | People new to a city or area                 |

---

## 4. 💎 **Unique Value Proposition (UVP)**

Randr differentiates itself through:

* **Instant, global matchmaking** — one tap, one connection.
* **Safe & moderated chats** — AI filters remove toxicity and explicit content.
* **Dual match modes** — Local or Global.
* **Privacy-first design** — no real names, no stored chats.
* **Optional personalization** — connect by interests or language.

---

## 5. 🧱 **Core Features (MVP Scope)**

### 5.1 User Onboarding

* Quick, 3-step onboarding:

  1. Select username (or auto-generated nickname).
  2. Choose avatar (no photos).
  3. Select mode: *Global* 🌎 or *Local* 📍.
* Optional: Age range, country, and 3 interest tags.

### 5.2 Matchmaking Engine

* **Global Mode:** Pairs users randomly from all active users online.
* **Local Mode:** Uses device location (city-level, not exact GPS) to pair users nearby.
* Matching parameters: availability → language → interests (if enabled).
* Instant queue timeout: 5 seconds max.

### 5.3 Chat Interface

* Simple, two-way text chat window.
* Live typing indicators, message delivery ticks.
* “Next” button to skip current chat and find another user.
* “End Chat” button to disconnect and provide feedback (optional).
* Session timer (visible to both users).
* Chats are deleted automatically once session ends.

### 5.4 Safety & Moderation

* AI-powered content moderation (OpenAI / Google Perspective API).
* Block, report, or mute options.
* Profanity and NSFW content filters.
* Anonymous mode (no email shown).
* Age filter to restrict under-18 users.

### 5.5 Notifications

* Push notification when matched or app finds a new connection.
* Optional daily “Find your next friend” reminders.

### 5.6 User Settings

* Switch between Global and Local mode.
* Manage block list.
* Enable/disable chat history saving (default off).
* Language preference and dark mode toggle.

---

## 6. ⚙️ **Extended / Future Features (V2+)**

| Feature                  | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| **Voice & Video Chat**   | Optional after mutual consent                                |
| **AI Interest Matching** | Matches users by overlapping hobbies, profession, or mood    |
| **Chat Translation**     | Real-time language translation                               |
| **Gamification**         | Badges, chat streaks, or “Friend Found” achievements         |
| **Topic Rooms**          | Themed random rooms (e.g., “Travel Stories,” “Music Lovers”) |
| **Profile Enhancements** | Verified users, short bios, or link social handles           |

---

## 7. 🧩 **Functional Requirements**

| Category            | Requirement                                                       |
| ------------------- | ----------------------------------------------------------------- |
| **User Management** | Create, update, or delete lightweight user profile                |
| **Matchmaking**     | Real-time pairing of two online users with no wait longer than 5s |
| **Chat Engine**     | Secure, bi-directional text communication using WebSockets        |
| **Moderation**      | Detect and filter harmful messages in under 500ms latency         |
| **Data Privacy**    | Delete all chat data post-session unless both users save          |
| **Localization**    | Multi-language support (EN, ES, FR, DE)                           |
| **Analytics**       | Track engagement (avg. chat duration, retention) anonymously      |

---

## 8. 🏗️ **System Architecture**

### Frontend (Mobile App)

* **Framework:** Flutter (cross-platform: iOS & Android)
* **State Management:** Provider / Bloc
* **UI:** Material Design with custom brand color palette

### Backend

* **Core Stack:** Node.js + Express + Firebase Functions
* **Database:** Firestore (real-time user state and messages)
* **Auth:** Firebase Auth (Anonymous + Google/Apple optional)
* **Real-time Messaging:** WebSocket / Firebase Realtime DB
* **AI Moderation:** OpenAI Moderation API + Google Perspective API
* **Storage:** Google Cloud Storage (for avatars, logs)
* **Notifications:** Firebase Cloud Messaging (FCM)

### Infrastructure

* Hosting: Google Cloud Run or Firebase Hosting
* CI/CD: GitHub Actions
* Monitoring: Firebase Crashlytics + Google Analytics

---

## 9. 🔐 **Security & Privacy**

* End-to-end message encryption (AES + HTTPS transport).
* No personal identifiers stored without consent.
* Chats deleted at session end.
* Moderation layer inspects text before delivery (filtered client-side).
* GDPR & COPPA compliant.
* Age gating for under-18 users.

---

## 10. 🎨 **UX/UI Design Guidelines**

**Design Principles:**

* Simple → One action per screen.
* Friendly → Rounded shapes, calm pastel colors.
* Inclusive → Neutral, international design (no regional bias).

**Sample Screens:**

1. **Welcome / Onboarding**
2. **Mode Select (Global / Local)**
3. **Chat Match Screen (Connecting...)**
4. **Chat Window (Messages, “Next” / “End”)**
5. **Profile / Settings**

**Brand Colors:**

* Primary: #5C6BC0 (calm blue)
* Accent: #FFB300 (warm yellow)
* Neutral: #F5F5F5 background, black text

---

## 11. 📊 **KPIs & Success Metrics**

| KPI                                | Target                     |
| ---------------------------------- | -------------------------- |
| **Match Success Rate**             | 95% successful connections |
| **Avg. Chat Duration**             | ≥ 2 minutes per session    |
| **User Retention (30 days)**       | ≥ 35%                      |
| **App Store Rating**               | ≥ 4.5                      |
| **Moderation False Positive Rate** | < 3%                       |

---

## 12. 💰 **Monetization Model**

| Revenue Stream                      | Description                                        |
| ----------------------------------- | -------------------------------------------------- |
| **Freemium**                        | Free random text chat                              |
| **Subscription Tier (£2.99/month)** | Ad-free experience + interest matching             |
| **Ads**                             | Non-intrusive interstitial ads after every 5 chats |
| **In-App Purchases**                | Themed avatars, badges, and streak boosts          |

---

## 13. 🚀 **Launch Roadmap**

| Phase                           | Duration   | Key Deliverables                                 |
| ------------------------------- | ---------- | ------------------------------------------------ |
| **Phase 1: Discovery**          | 2 weeks    | Wireframes, branding, UI kit                     |
| **Phase 2: MVP Build**          | 8–10 weeks | Flutter app (text chat, matchmaking, moderation) |
| **Phase 3: Beta Test**          | 3 weeks    | Closed group (100–200 users)                     |
| **Phase 4: Launch**             | Week 15    | App Store + Google Play release                  |
| **Phase 5: Growth & Retention** | Ongoing    | Add gamification + interest filters              |

---

## 14. ⚖️ **Risk & Mitigation**

| Risk                              | Mitigation                                  |
| --------------------------------- | ------------------------------------------- |
| **Toxic user behavior**           | Real-time moderation + instant report/block |
| **Slow matchmaking**              | Adaptive load balancing + user queuing      |
| **Data abuse / privacy concerns** | Ephemeral data + anonymization              |
| **Low retention**                 | Add streaks, gamification, themed rooms     |
| **Legal compliance**              | GDPR, COPPA audits, clear Terms of Service  |

---

## 15. 🧭 **Future Vision**

In the long term, Randr aims to evolve from a “random chat app” into a **social discovery platform** where users can:

* Form communities around shared interests.
* Participate in virtual cultural exchanges.
* Attend live global events, chat-based games, and mentorship programs.
