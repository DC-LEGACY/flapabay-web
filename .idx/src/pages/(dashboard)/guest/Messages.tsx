import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CalendarRange, MapPin, Users, Clock, MessageSquare, Send, Loader2, Smile, ImagePlus, Video, AudioLines, Paperclip, Plus, X, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockSupabaseDataOperations, mockAuthService } from "@/components/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  isRead: boolean;
}

const Messages: React.FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messageLoading, setMessageLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const fetchMessages = async (conversationId: string) => {
    setMessageLoading(true);
    try {
      const { data, error } = await mockSupabaseDataOperations
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      const formattedMessages = data.map(msg => ({
        id: msg.id,
        content: msg.content,
        senderId: msg.sender_id,
        createdAt: msg.created_at,
        isRead: msg.is_read || false,
      }));
      
      setMessages(formattedMessages);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    } finally {
      setMessageLoading(false);
    }
  };
  
  const sendMessage = async () => {
    if (!newMessage.trim() || !activeConversationId || !user) return;
    
    try {
      const { data, error } = await mockSupabaseDataOperations
        .from('messages')
        .insert({
          conversation_id: activeConversationId,
          sender_id: user.id,
          content: newMessage,
          is_read: false
        })
        .select('*')
        .single();
      
      if (error) throw error;
      
      setNewMessage('');
      fetchMessages(activeConversationId);
      
      // Update last message timestamp in conversations table
      await mockSupabaseDataOperations
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', activeConversationId);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        
        const { data: userData, error: authError } = await mockAuthService.getUser();
        if (authError || !userData?.user) {
          console.error("Error fetching user for conversations or user not found", authError);
          setError('Could not fetch user details for conversations.');
          setLoading(false);
          return;
        }
        
        // Fetch conversations without trying to join the host directly
        const { data, error } = await mockSupabaseDataOperations
          .from('conversations')
          .select(`
            id,
            last_message_at,
            host_id
          `)
          .eq('guest_id', userData.user.id)
          .order('last_message_at', { ascending: false });
        
        if (error) throw error;
        
        // Fetch hosts and properties separately to avoid relationship issues
        const formattedConversations = await Promise.all(data.map(async (conv) => {
          // Get host info
          const { data: hostData, error: hostError } = await mockSupabaseDataOperations
            .from('users')
            .select('id, first_name, last_name, avatar_url')
            .eq('id', conv.host_id)
            .single();
            
          let hostInfo = {
            id: conv.host_id,
            firstName: 'Unknown',
            lastName: 'Host',
            avatarUrl: '',
          };
          
          if (!hostError && hostData) {
            hostInfo = {
              id: hostData.id,
              firstName: hostData.first_name || 'Unknown',
              lastName: hostData.last_name || 'Host',
              avatarUrl: hostData.avatar_url || '',
            };
          }
          
          // Get property info for each conversation
          let propertyInfo = {
            id: '',
            title: 'Unknown Property',
            location: '',
            photo: '/placeholder.svg'
          };
          
          // Fetch property linked to this conversation
          const { data: propertyData, error: propertyError } = await mockSupabaseDataOperations
            .from('listings')
            .select('id, title, location, photos')
            .eq('host_id', conv.host_id)
            .limit(1)
            .single();
            
          if (!propertyError && propertyData) {
            propertyInfo = {
              id: propertyData.id,
              title: propertyData.title || 'Unknown Property',
              location: propertyData.location || '',
              photo: Array.isArray(propertyData.photos) && propertyData.photos.length > 0 
                ? propertyData.photos[0] 
                : '/placeholder.svg',
            };
          }
          
          return {
            id: conv.id,
            lastMessageAt: conv.last_message_at,
            host: hostInfo,
            property: propertyInfo
          };
        }));
        
        setConversations(formattedConversations);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };
    
    fetchConversations();
    
    // Set up real-time subscription for new messages
    // TODO: Implement real-time functionality with a future WebSocket/REST API solution.
    // The supabase.channel subscription is commented out as it's not supported by the current mock.
    /*
    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' }, 
        (payload) => {
          if (payload.new.conversation_id === activeConversationId) {
            fetchMessages(activeConversationId);
          }
          
          // Update conversations list if there's a new message
          fetchConversations();
        }
      )
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
    */
  }, [activeConversationId, user]);
  
  const handleConversationClick = (conversationId: string) => {
    setActiveConversationId(conversationId);
    fetchMessages(conversationId);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-6 w-6" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
        <p className="text-gray-600 mb-6">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <CardDescription>Choose a conversation to view</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {conversations.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {conversations.map((conversation) => (
                    <li 
                      key={conversation.id} 
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${activeConversationId === conversation.id ? 'bg-gray-100' : ''}`}
                      onClick={() => handleConversationClick(conversation.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={conversation.host.avatarUrl || '/placeholder.svg'} alt={conversation.host.firstName} />
                          <AvatarFallback>{conversation.host.firstName?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{conversation.host.firstName} {conversation.host.lastName}</p>
                          <p className="text-sm text-gray-500">{conversation.property.title}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-4 text-gray-500">No conversations yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Messages Area */}
        <div className="lg:col-span-2">
          {activeConversationId ? (
            <Card>
              <CardHeader>
                <CardTitle>Conversation</CardTitle>
                <CardDescription>View and send messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {messageLoading ? (
                  <div className="flex justify-center items-center h-48">
                    <Loader2 className="animate-spin h-6 w-6" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.length > 0 ? (
                      messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`p-3 rounded-md ${message.senderId === user?.id ? 'bg-blue-100 ml-auto text-right' : 'bg-gray-100 mr-auto'}`}
                          style={{ maxWidth: '80%' }}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(message.createdAt).toLocaleTimeString()}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No messages in this conversation yet.</p>
                    )}
                  </div>
                )}
              </CardContent>
              <div className="p-4 flex items-center space-x-2 border-t">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={sendMessage} disabled={messageLoading}>
                  Send
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <MessageSquare className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-lg">Select a conversation to view messages</h3>
                <p className="text-gray-500">Choose a conversation from the list to start messaging.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
