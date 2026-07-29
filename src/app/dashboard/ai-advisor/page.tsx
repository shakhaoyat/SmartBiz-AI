'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sendAdvisorMessage, getConversations, getConversation } from '@/services/ai';
import { useAuth } from '@/providers/auth-provider';
import { Send, MessageSquare, RefreshCw } from 'lucide-react';

export default function AIAdvisorPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversations } = useQuery({ queryKey: ['conversations'], queryFn: getConversations });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessageMutation = useMutation({
    mutationFn: ({ message, conversationId }: { message: string; conversationId?: string }) =>
      sendAdvisorMessage(message, conversationId),
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
      setConversationId(data.conversationId);
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    sendMessageMutation.mutate({ message: input, conversationId: conversationId || undefined }, {
      onSettled: () => setLoading(false),
    });
    setInput('');
  };

  const loadConversation = async (id: string) => {
    const data = await getConversation(id);
    setMessages(data.messages.map((m: any) => ({ role: m.role, content: m.content })));
    setConversationId(id);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="w-64 bg-slate-50 border-r border-slate-200 p-4 hidden md:block">
        <h3 className="font-semibold mb-4">Conversations</h3>
        <div className="space-y-2">
          {(conversations as any[])?.map((conv: any) => (
            <button key={conv._id} onClick={() => loadConversation(conv._id)} className="w-full text-left p-2 rounded-lg hover:bg-slate-200 text-sm">
              <MessageSquare className="h-4 w-4 inline mr-2" />
              {conv.title}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-slate-500 py-12">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <p>Ask me anything about your business.</p>
              <div className="mt-4 space-y-2">
                {['Analyze my recent sales', 'What are my biggest risks?', 'Which products should I focus on?'].map((prompt) => (
                  <button key={prompt} onClick={() => setInput(prompt)} className="block mx-auto px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 text-sm">
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-900'}`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && <div className="flex justify-start"><div className="bg-slate-100 p-3 rounded-lg text-sm text-slate-500">Thinking...</div></div>}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="p-4 border-t border-slate-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI business advisor..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={loading}
            />
            <button type="submit" disabled={loading} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
