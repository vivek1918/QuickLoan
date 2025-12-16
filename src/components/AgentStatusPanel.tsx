import { Bot, UserCheck, FileSearch, CreditCard, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Agent {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const agents: Agent[] = [
  {
    id: 'master',
    name: 'Master Agent',
    icon: <Bot className="h-5 w-5" />,
    description: 'Orchestrates the entire loan process',
    color: 'text-primary'
  },
  {
    id: 'sales',
    name: 'Sales Agent',
    icon: <UserCheck className="h-5 w-5" />,
    description: 'Collects loan requirements & EMI details',
    color: 'text-chart-1'
  },
  {
    id: 'verification',
    name: 'Verification Agent',
    icon: <FileSearch className="h-5 w-5" />,
    description: 'Validates KYC from CRM database',
    color: 'text-chart-2'
  },
  {
    id: 'underwriting',
    name: 'Underwriting Agent',
    icon: <CreditCard className="h-5 w-5" />,
    description: 'Credit assessment & eligibility check',
    color: 'text-chart-3'
  },
  {
    id: 'sanction',
    name: 'Sanction Letter Agent',
    icon: <FileText className="h-5 w-5" />,
    description: 'Generates loan sanction documents',
    color: 'text-chart-4'
  }
];

interface AgentStatusPanelProps {
  activeAgent?: string;
}

export const AgentStatusPanel = ({ activeAgent = 'master' }: AgentStatusPanelProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <Bot className="h-5 w-5 text-primary" />
        Agentic AI Architecture
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
          This demo showcases a multi-agent AI system where specialized agents
          collaborate to process loan applications end-to-end.
        </p>
      </div>
    </div>
  );
};
