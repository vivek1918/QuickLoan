import { ChatWindow } from '@/components/ChatWindow';
import { AgentStatusPanel } from '@/components/AgentStatusPanel';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Wallet, Shield, Zap, Clock } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: t('instantDecisions'),
      description: t('instantDecisionsDesc')
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: t('secureProcess'),
      description: t('secureProcessDesc')
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: t('available24x7'),
      description: t('available24x7Desc')
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      title: t('bestRates'),
      description: t('bestRatesDesc')
    }
  ];

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
                <h1 className="text-2xl font-bold text-foreground">{t('appName')}</h1>
                <p className="text-sm text-muted-foreground">{t('tagline')}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {/* Language Selector */}
              <LanguageSelector />
              
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
              <h3 className="font-semibold text-foreground mb-3">{t('howItWorks')}</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-medium shrink-0">1</span>
                  <span>{t('step1')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-medium shrink-0">2</span>
                  <span>{t('step2')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-medium shrink-0">3</span>
                  <span>{t('step3')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-medium shrink-0">4</span>
                  <span>{t('step4')}</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-medium shrink-0">5</span>
                  <span>{t('step5')}</span>
                </li>
              </ol>
            </div>

            {/* Demo Note */}
            <div className="bg-accent/50 rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">{t('demoMode')}</strong> {t('demoNote')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
