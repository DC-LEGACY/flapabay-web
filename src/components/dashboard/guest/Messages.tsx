
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Loader2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import MessagesList from '@/components/messaging/MessagesList';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  senderName: string;
  senderAvatar?: string;
  propertyId?: string;
  propertyTitle?: string;
}

interface Conversation {
  id: string;
  lastMessageAt: string;
  host: {
    id: string;
    email: string;
    user_metadata?: {
      avatar_url?: string;
      first_name?: string;
      last_name?: string;
    };
  };
  property?: {
    id: string;
    title: string;
  };
}

// Type guard functions to ensure proper types
const isValidHost = (host: any): host is Conversation['host'] => {
  return host && typeof host !== 'string' && !('error' in host) && host.id && host.email;
};

const isValidProperty = (property: any): property is Conversation['property'] => {
  return property && typeof property !== 'string' && !('error' in property) && property.id && property.title;
};

const Messages = () => {
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { conversationId } = useParams();
  
  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);
  
  useEffect(() => {
    if (conversations.length > 0) {
      fetchRecentMessages();
    } else {
      setIsLoading(false);
    }
  }, [conversations]);
  
  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      
      // Get all conversations where the user is the guest
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('conversations')
        .select(`
          id,
          last_message_at,
          host:host_id(id, email),
          property:property_id(id, title)
        `)
        .eq('guest_id', user?.id)
        .order('last_message_at', { ascending: false });
      
      if (conversationsError) {
        throw conversationsError;
      }
      
      // Format conversations and ensure type safety
      const formattedConversations: Conversation[] = conversationsData
        .filter(conv => {
          // Filter out any conversations with missing or invalid host data
          return isValidHost(conv.host) && (conv.property === null || isValidProperty(conv.property));
        })
        .map(conv => ({
          id: conv.id,
          lastMessageAt: conv.last_message_at,
          host: {
            id: isValidHost(conv.host) ? conv.host.id : '',
            email: isValidHost(conv.host) ? conv.host.email : '',
          },
          property: isValidProperty(conv.property) ? {
            id: conv.property.id,
            title: conv.property.title
          } : undefined
        }));
      
      setConversations(formattedConversations);
    } catch (error: any) {
      console.error('Error fetching conversations:', error);
      toast({
        title: "Failed to load conversations",
        description: error.message,
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };
  
  const fetchRecentMessages = async () => {
    try {
      const conversationIds = conversations.map(c => c.id);
      
      if (conversationIds.length === 0) {
        setRecentMessages([]);
        setIsLoading(false);
        return;
      }
      
      // Get most recent message from each conversation
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .in('conversation_id', conversationIds)
        .order('created_at', { ascending: false });
      
      if (messagesError) {
        throw messagesError;
      }
      
      // Get user profiles for all message senders
      const senderIds = [...new Set(messagesData.map(m => m.sender_id))];
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', senderIds);
      
      if (profilesError) {
        throw profilesError;
      }
      
      // Format messages with sender information
      const latestMessages: Message[] = [];
      const processedConversations = new Set();
      
      messagesData.forEach(message => {
        if (!processedConversations.has(message.conversation_id)) {
          processedConversations.add(message.conversation_id);
          
          const conversation = conversations.find(c => c.id === message.conversation_id);
          const sender = profiles?.find(p => p.id === message.sender_id);
          const senderName = sender 
            ? `${sender.first_name || ''} ${sender.last_name || ''}`.trim() || 'User'
            : (message.sender_id === user?.id ? 'You' : 'User');
          
          latestMessages.push({
            id: message.id,
            conversationId: message.conversation_id,
            senderId: message.sender_id,
            receiverId: message.receiver_id,
            content: message.content,
            createdAt: message.created_at,
            isRead: message.is_read,
            senderName: senderName,
            senderAvatar: sender?.avatar_url,
            propertyId: conversation?.property?.id,
            propertyTitle: conversation?.property?.title
          });
        }
      });
      
      setRecentMessages(latestMessages);
      setIsLoading(false);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Failed to load messages",
        description: error.message,
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };
  
  const filteredMessages = searchQuery.trim()
    ? recentMessages.filter(message => 
        message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (message.propertyTitle && message.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : recentMessages;
  
  return (
    <div className="flex flex-col h-full md:flex-row">
      {/* Messages Sidebar */}
      <div className={`w-full md:w-80 lg:w-96 border-r flex flex-col ${conversationId ? 'hidden md:flex' : ''}`}>
        <div className="py-6 px-4 bg-[#ffc500] dark:bg-[#ffc500]/90">
          <h1 className="text-xl font-bold text-black">Messages</h1>
          <p className="text-sm text-black/80">Communicate with hosts about your trips</p>
        </div>
        
        <div className="p-4 border-b">
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex-1 overflow-auto">
          <MessagesList 
            messages={filteredMessages} 
            isLoading={isLoading} 
          />
        </div>
      </div>
      
      {/* Messages Content or Outlet */}
      <div className={`flex-1 flex flex-col ${!conversationId ? 'hidden md:flex' : ''}`}>
        {conversationId ? (
          <Outlet />
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-4">
              <PlusCircle className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
              Choose a conversation from the list to view messages, or book a property to start a new conversation with a host
            </p>
            <Button onClick={() => navigate('/')}>
              Explore Properties
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
