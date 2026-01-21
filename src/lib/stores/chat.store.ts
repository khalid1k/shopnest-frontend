import { create } from 'zustand';

interface ChatMessage {
  id: string;
  message: string;
  senderId: string;
  senderName: string;
  createdAt: string;
}

interface ChatState {
  messages: ChatMessage[];
  typingUser: string | null;
  addMessage: (msg: ChatMessage) => void;
  setTyping: (user: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  typingUser: null,

  addMessage: (msg) =>
  set((state) => {
    if (state.messages.some((m) => m.id === msg.id)) {
      return state; // 🛑 block duplicates
    }
    return { messages: [...state.messages, msg] };
  }),


  setTyping: (user) => set({ typingUser: user }),
}));
