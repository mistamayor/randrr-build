// Bot responses for simulating chat conversations
// Different pools for Global vs Local mode

export const GLOBAL_BOT_RESPONSES = {
  greetings: [
    "Hey there!",
    "Hi! How's it going?",
    "Hello! Nice to meet you",
    "What's up?",
    "Hey! How are you doing?",
  ],

  conversations: [
    "Pretty good, just chilling. You?",
    "Not much, just trying out this app. It's pretty cool!",
    "I'm doing alright. Where are you from?",
    "Same here. Just trying out this random chat thing.",
    "All good! What brings you here?",
    "Just exploring. This app seems interesting!",
    "I'm good! Been wanting to try this for a while",
    "Nice! What do you like to do for fun?",
    "Cool! Do you use apps like this often?",
    "That's interesting! Tell me more",
  ],

  questions: [
    "What kind of stuff are you into?",
    "Do you have any cool hobbies?",
    "What's your favorite movie or show?",
    "Are you into gaming at all?",
    "What kind of music do you listen to?",
    "Have you traveled anywhere cool recently?",
    "What do you do in your free time?",
    "Any interesting plans for the weekend?",
  ],

  responses: [
    "That sounds really cool!",
    "Oh nice! I've heard good things about that",
    "Interesting! I've been meaning to check that out",
    "That's awesome!",
    "I totally get that",
    "Haha yeah, I can relate",
    "That's pretty cool!",
    "Nice! How long have you been into that?",
  ],

  farewells: [
    "I gotta go, but this was fun!",
    "Nice chatting with you!",
    "Gotta run, but it was cool talking",
    "Alright, I'm out. Have a good one!",
    "Time for me to head out. Take care!",
  ],
};

export const LOCAL_BOT_RESPONSES = {
  greetings: [
    "Hey! You're nearby right?",
    "Hi! Cool to match with someone local",
    "Hey neighbor! How's it going?",
    "What's up! Are you in the area?",
  ],

  conversations: [
    "Pretty good! Weather's been nice here lately",
    "Not bad! Have you been to that new cafe downtown?",
    "Just chilling at home. You?",
    "It's cool to match with someone nearby!",
    "Have you lived here long?",
    "Do you know any good spots around here?",
    "The local scene here is pretty cool, right?",
  ],

  questions: [
    "Do you go to any local events?",
    "Have you tried that new restaurant on Main Street?",
    "What's your favorite local hangout?",
    "Do you know any good coffee shops around here?",
    "Are you into any local sports teams?",
    "What do you like most about living here?",
  ],

  responses: [
    "Oh yeah, I know that place!",
    "I've been meaning to check that out",
    "That's pretty close to where I am",
    "Yeah, I've heard about that",
    "I should definitely try that sometime",
  ],

  farewells: [
    "Gotta go, but maybe we'll run into each other sometime!",
    "Nice chatting! Enjoy the rest of your day locally",
    "Cool talking to you. Take care!",
    "I'm heading out. Stay safe out there!",
  ],
};

// Bot personality - determines response patterns
export class BotPersonality {
  constructor(mode = 'global') {
    this.mode = mode;
    this.responses = mode === 'local' ? LOCAL_BOT_RESPONSES : GLOBAL_BOT_RESPONSES;
    this.messageCount = 0;
    this.hasGreeted = false;
  }

  getResponse(userMessage) {
    this.messageCount++;

    // First message is always a greeting
    if (!this.hasGreeted) {
      this.hasGreeted = true;
      return this.randomFrom(this.responses.greetings);
    }

    // Analyze user message for context
    const lowerMessage = userMessage.toLowerCase();

    // Check for questions
    if (lowerMessage.includes('?')) {
      // 70% chance to answer with conversation, 30% to ask back
      if (Math.random() > 0.3) {
        return this.randomFrom(this.responses.conversations);
      } else {
        return this.randomFrom(this.responses.questions);
      }
    }

    // Check for greetings
    if (this.containsGreeting(lowerMessage)) {
      return this.randomFrom(this.responses.conversations);
    }

    // Random chance to ask a question (40%)
    if (Math.random() > 0.6) {
      return this.randomFrom(this.responses.questions);
    }

    // Default to response or conversation
    if (Math.random() > 0.5) {
      return this.randomFrom(this.responses.responses);
    } else {
      return this.randomFrom(this.responses.conversations);
    }
  }

  shouldLeaveChat() {
    // Small chance (5%) to leave after 8+ messages
    if (this.messageCount >= 8) {
      return Math.random() < 0.05;
    }
    return false;
  }

  getFarewellMessage() {
    return this.randomFrom(this.responses.farewells);
  }

  randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  containsGreeting(message) {
    const greetings = ['hi', 'hello', 'hey', 'yo', 'sup', 'howdy'];
    return greetings.some(g => message.includes(g));
  }
}
