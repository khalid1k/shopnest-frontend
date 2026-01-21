import { io, Socket } from 'socket.io-client';
import { useChatStore } from '@/lib/stores/chat.store';

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
  if (socket) return socket;

  socket = io('http://localhost:3002', {
    auth: { token },
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket?.id);
  });

  socket.on('message', (data) => {
    useChatStore.getState().addMessage(data);
  });

  socket.on('typing', (data) => {
    useChatStore.getState().setTyping(data.user);
  });
  socket.on('stopTyping', () => {
  useChatStore.getState().setTyping(null);
});

  return socket;
};
