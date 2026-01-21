'use client';

import Chat from '@/components/chat/chat';
import { useAuthStore } from '@/lib/stores/auth.store';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

export default function ChatPage() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Card className="w-105">
          <CardHeader>
            <CardTitle>Unauthorized</CardTitle>
            <CardDescription>
              Please login to access the live chat.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button className="w-full">Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b px-6 py-4">
        <h1 className="text-xl font-semibold">Live Support Chat</h1>
        <p className="text-sm text-muted-foreground">
          Real-time chat powered by WebSocket & JWT
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-2xl h-full flex flex-col">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
            <CardDescription>
              You are connected securely
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden">
            <Chat token={accessToken} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
