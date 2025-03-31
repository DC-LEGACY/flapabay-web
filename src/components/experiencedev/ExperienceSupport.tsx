
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';




const commonQuestions = [
  "What should I bring?",
  "Is there a minimum age?",
  "Can I cancel my booking?",
  "What if it rains?"
];

// Mock response database
const responses = {
  "What should I bring?": "Please bring comfortable clothing, walking shoes, a water bottle, and sunscreen. All other equipment will be provided by the host.",
  "Is there a minimum age?": "This experience is suitable for all ages, but children under 12 must be accompanied by an adult.",
  "Can I cancel my booking?": "Yes, you can cancel up to 24 hours before the experience for a full refund, minus the service fee.",
  "What if it rains?": "If the weather is unsuitable, the host will offer to reschedule your experience or provide a full refund.",
  "default": "Thanks for your question! I'll forward it to the host who will respond shortly. For immediate assistance, please use the contact link above."
};

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ExperienceSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi there! I'm your FlapaBay AI assistant. How can I help with your experience booking?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage = { text: inputText, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate AI response
    setTimeout(() => {
      const userQuestion = userMessage.text.toLowerCase();
      let responseText = responses.default;
      
      // Look for matching responses
      for (const question of Object.keys(responses)) {
        if (userQuestion.includes(question.toLowerCase())) {
          responseText = responses[question as keyof typeof responses];
          break;
        }
      }
      
      setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
    }, 1000);
  };
  
  const handleQuickQuestion = (question: string) => {
    // Add user message
    setMessages(prev => [...prev, { text: question, sender: 'user' }]);
    
    // Add bot response
    setTimeout(() => {
      const responseText = responses[question as keyof typeof responses] || responses.default;
      setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
    }, 800);
  };
  
  return (
    <motion.div 
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.7 }}
    >
      <h3 className="text-xl font-semibold mb-4">Questions about this experience?</h3>
      
      <Card className="border-gray-200 shadow-md rounded-2xl overflow-hidden">
        <CardHeader className="bg-[#ffc500]/5 border-b border-gray-200 py-3">
          <div className="flex items-center gap-3">
            <div className="bg-[#ffc500]/10 p-2 rounded-full">
              <Bot className="h-5 w-5 text-[#ffc500]" />
            </div>
            <div>
              <h4 className="font-medium">FlapaBay AI Assistant</h4>
              <p className="text-xs text-gray-500">Online now</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 h-60 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-[#ffc500] text-black' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-gray-200 p-3 flex flex-col gap-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {commonQuestions.map((question, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                className="whitespace-nowrap"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2 w-full">
            <Input 
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Type your question..."
              className="flex-1"
              onKeyDown={e => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <Button 
              variant="default" 
              size="icon"
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ExperienceSupport;
