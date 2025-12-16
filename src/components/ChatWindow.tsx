import { useEffect, useRef, useState } from 'react';
import { Message } from '@/agents/types';
import { Customer } from '@/data/mockData';
import { MasterAgent } from '@/agents/masterAgent';
import { sanctionLetterAgent } from '@/agents/sanctionLetterAgent';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { CustomerSelector } from './CustomerSelector';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/i18n/LanguageContext';

export const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [masterAgent, setMasterAgent] = useState<MasterAgent | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    const agent = new MasterAgent(customer.customer_id);
    setMasterAgent(agent);
    setMessages([]);
    
    // Send greeting
    setIsTyping(true);
    setTimeout(() => {
      const responses = agent.processMessage('');
      setMessages(responses);
      setIsTyping(false);
    }, 800);
  };

  const handleSendMessage = async (content: string) => {
    if (!masterAgent) return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);

    // Process with agent
    setIsTyping(true);
    
    // Simulate thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));
    
    const responses = masterAgent.processMessage(content);
    
    // Add responses with staggered timing for natural feel
    for (let i = 0; i < responses.length; i++) {
      if (i > 0) {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      setMessages((prev) => [...prev, responses[i]]);
    }
    
    setIsTyping(false);
  };

  const handleFileUpload = async (file: File) => {
    if (!masterAgent) return;
    
    toast({
      title: t('fileUploaded'),
      description: `${file.name} ${t('fileUploadedDesc')}`,
    });

    // Add file upload message
    const uploadMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: `📎 Uploaded: ${file.name}`,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, uploadMessage]);

    // Process salary slip
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const responses = masterAgent.handleSalarySlipUpload();
    
    for (let i = 0; i < responses.length; i++) {
      if (i > 0) {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      setMessages((prev) => [...prev, responses[i]]);
    }
    
    setIsTyping(false);
  };

  const handleSanctionDownload = (letterId: string) => {
    const pdfBlob = sanctionLetterAgent.downloadLetter(letterId);
    
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sanction-letter-${letterId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: t('downloadStarted'),
        description: t('downloadStartedDesc'),
      });
    } else {
      toast({
        title: t('downloadFailed'),
        description: t('downloadFailedDesc'),
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{t('assistantName')}</h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {t('aiPoweredAgent')}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Selector */}
      <div className="px-4 py-3 bg-muted/30">
        <CustomerSelector
          selectedCustomer={selectedCustomer}
          onSelect={handleCustomerSelect}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t('welcomeTitle')}
            </h3>
            <p className="text-muted-foreground max-w-sm">
              {t('welcomeMessage')}
            </p>
          </div>
        ) : (
          <div className="pb-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onFileUpload={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.pdf,.jpg,.jpeg,.png';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) handleFileUpload(file);
                  };
                  input.click();
                }}
                onDownload={handleSanctionDownload}
              />
            ))}
            {isTyping && (
              <div className="flex gap-3 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Bot className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl bg-card px-4 py-3 shadow-md rounded-tl-sm">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSendMessage}
        onFileUpload={handleFileUpload}
        disabled={!selectedCustomer || isTyping}
        placeholder={
          !selectedCustomer
            ? t('selectCustomerPlaceholder')
            : t('typeMessagePlaceholder')
        }
      />
    </div>
  );
};
