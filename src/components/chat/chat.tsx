'use client';

import { useEffect, useState } from 'react';
import { connectSocket } from '@/lib/socket/socket';
import { useChatStore } from '@/lib/stores/chat.store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Socket } from 'socket.io-client';

export default function Chat({ token }: { token: string }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState('');

  const messages = useChatStore((state) => state.messages);
  const typingUser = useChatStore((state) => state.typingUser);

  useEffect(() => {
    const s = connectSocket(token);
    setSocket(s);
  }, [token]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket?.emit('message', { message });
     socket?.emit('stopTyping');
    setMessage('');
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-2 overflow-y-auto p-2">
        {messages.map((msg) => (
          <div key={msg.id} className="rounded bg-muted p-2">
            <strong>{msg.senderName}</strong>
            <p>{msg.message}</p>
          </div>
        ))}

        {typingUser && (
          <p className="text-sm text-muted-foreground">
            {typingUser} is typing...
          </p>
        )}
      </div>

      <div className="flex gap-2 p-2">
        <Input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            socket?.emit('typing');
          }}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter'){
               sendMessage();
               socket?.emit('stopTyping');
            }
          }}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
