import { Message } from '@/agents/types';
import { cn } from '@/lib/utils';
import { Bot, User, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: Message;
  onFileUpload?: () => void;
  onDownload?: (letterId: string) => void;
}

export const ChatMessage = ({ message, onFileUpload, onDownload }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  const formatContent = (content: string) => {
    // Convert markdown-style bold to HTML
    return content
      .split('\n')
      .map((line, i) => {
        // Handle bold text
        const boldFormatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        return <span key={i} dangerouslySetInnerHTML={{ __html: boldFormatted }} />;
      })
      .map((element, i, arr) => (
        <span key={i}>
          {element}
          {i < arr.length - 1 && <br />}
        </span>
      ));
  };

  return (
    <div
      className={cn(
        'flex gap-3 p-4 animate-in fade-in slide-in-from-bottom-2 duration-300',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
          isUser ? 'bg-primary' : 'bg-accent'
        )}
      >
        {isUser ? (
          <User className="h-5 w-5 text-primary-foreground" />
        ) : (
          <Bot className="h-5 w-5 text-accent-foreground" />
        )}
      </div>

      <div
        className={cn(
          'flex max-w-[75%] flex-col gap-2 rounded-2xl px-4 py-3',
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-sm'
            : 'bg-card text-card-foreground shadow-md rounded-tl-sm'
        )}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {formatContent(message.content)}
        </div>

        {message.showFileUpload && onFileUpload && (
          <Button
            onClick={onFileUpload}
            variant="secondary"
            size="sm"
            className="mt-2 gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Salary Slip
          </Button>
        )}

        {message.showDownload && message.sanctionLetterId && onDownload && (
          <Button
            onClick={() => onDownload(message.sanctionLetterId!)}
            variant="secondary"
            size="sm"
            className="mt-2 gap-2"
          >
            <Download className="h-4 w-4" />
            Download Sanction Letter
          </Button>
        )}

        <span className="text-xs opacity-60 mt-1">
          {message.timestamp.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </div>
  );
};
