import { ChatWindow } from '@/components/ChatWindow';
import { AgentStatusPanel } from '@/components/AgentStatusPanel';
import { Wallet, Shield, Zap, Clock } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Instant Decisions',
    description: 'AI-powered underwriting in seconds'
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Secure Process',
    description: 'Bank-grade KYC verification'
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: '24/7 Available',
    description: 'Apply anytime, anywhere'
  },
  {
    icon: <Wallet className="h-5 w-5" />,
    title: 'Best Rates',
    description: 'Starting from 10.5% p.a.'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-primary/10 via-accent to-background border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg">
                <Wallet className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">QuickLoan NBFC</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Personal Loans</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="text-primary">{feature.icon}</span>
                  <span className="text-foreground font-medium">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 h-[calc(100vh-180px)]">
          {/* Chat Window */}
          <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
            <ChatWindow />
          </div>

          {/* Sidebar */}
          <div className="hidden lg:flex flex-col gap-4">
            <AgentStatusPanel />
            
            {/* Quick Info */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground mb-3">How It Works</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-medium shrink-0">1</span>
                  <span>Select a demo customer</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-medium shrink-0">2</span>
                  <span>Enter loan amount & tenure</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-medium shrink-0">3</span>
                  <span>AI verifies KYC & credit</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-medium shrink-0">4</span>
                  <span>Get instant approval</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-medium shrink-0">5</span>
                  <span>Download sanction letter</span>
                </li>
              </ol>
            </div>

            {/* Demo Note */}
            <div className="bg-accent/50 rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Demo Mode:</strong> This is a simulation
                using static mock data. Select different customers to see various
                approval scenarios based on their credit profiles.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
