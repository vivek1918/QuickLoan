import { Bot, UserCheck, FileSearch, CreditCard, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/i18n/LanguageContext';

interface AgentStatusPanelProps {
  activeAgent?: string;
}

export const AgentStatusPanel = ({ activeAgent = 'master' }: AgentStatusPanelProps) => {
  const { t } = useLanguage();

  const agents = [
    {
      id: 'master',
      name: t('masterAgent'),
      icon: <Bot className="h-5 w-5" />,
      description: t('masterAgentDesc'),
      color: 'text-primary'
    },
    {
      id: 'sales',
      name: t('salesAgent'),
      icon: <UserCheck className="h-5 w-5" />,
      description: t('salesAgentDesc'),
      color: 'text-chart-1'
    },
    {
      id: 'verification',
      name: t('verificationAgent'),
      icon: <FileSearch className="h-5 w-5" />,
      description: t('verificationAgentDesc'),
      color: 'text-chart-2'
    },
    {
      id: 'underwriting',
      name: t('underwritingAgent'),
      icon: <CreditCard className="h-5 w-5" />,
      description: t('underwritingAgentDesc'),
      color: 'text-chart-3'
    },
    {
      id: 'sanction',
      name: t('sanctionAgent'),
      icon: <FileText className="h-5 w-5" />,
      description: t('sanctionAgentDesc'),
      color: 'text-chart-4'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <Bot className="h-5 w-5 text-primary" />
        {t('agenticArchitecture')}
      </h3>
      
      <div className="space-y-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg transition-all duration-200',
              activeAgent === agent.id
                ? 'bg-primary/10 border border-primary/30'
                : 'bg-muted/30 border border-transparent'
            )}
          >
            <div
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full',
                activeAgent === agent.id ? 'bg-primary/20' : 'bg-muted'
              )}
            >
              <span className={agent.color}>{agent.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground">{agent.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {agent.description}
              </p>
            </div>
            {activeAgent === agent.id && (
              <div className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          {t('agentPanelNote')}
        </p>
      </div>
    </div>
  );
};
