import { useState, useRef, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Send, Paperclip, Mic, Volume2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface ChatInputProps {
  onSend: (message: string) => void;
  onFileUpload?: (file: File) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({
  onSend,
  onFileUpload,
  disabled,
  placeholder
}: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
      e.target.value = '';
    }
  };

  const handleSTTClick = () => {
    toast({
      title: "Speech-to-Text",
      description: t('speakTooltip'),
    });
  };

  const handleTTSClick = () => {
    toast({
      title: "Text-to-Speech",
      description: t('listenTooltip'),
    });
  };

  return (
    <div className="flex items-end gap-2 p-4 bg-card border-t border-border">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
      />
      
      {onFileUpload && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
      )}

      {/* Speech-to-Text Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSTTClick}
              disabled={disabled}
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <Mic className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('speakTooltip')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Text-to-Speech Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleTTSClick}
              disabled={disabled}
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <Volume2 className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('listenTooltip')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || t('typeMessagePlaceholder')}
        disabled={disabled}
        className="min-h-[44px] max-h-[120px] resize-none bg-background"
        rows={1}
      />

      <Button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        size="icon"
        className="shrink-0"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};
