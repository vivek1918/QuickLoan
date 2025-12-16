export type Language = 'en' | 'hi' | 'mr';

export const translations = {
  en: {
    // Header
    appName: 'QuickLoan NBFC',
    tagline: 'AI-Powered Personal Loans',
    
    // Features
    instantDecisions: 'Instant Decisions',
    instantDecisionsDesc: 'AI-powered underwriting in seconds',
    secureProcess: 'Secure Process',
    secureProcessDesc: 'Bank-grade KYC verification',
    available24x7: '24/7 Available',
    available24x7Desc: 'Apply anytime, anywhere',
    bestRates: 'Best Rates',
    bestRatesDesc: 'Starting from 10.5% p.a.',
    
    // Chat Window
    assistantName: 'QuickLoan Assistant',
    aiPoweredAgent: 'AI-Powered Loan Sales Agent',
    welcomeTitle: 'Welcome to QuickLoan NBFC',
    welcomeMessage: 'Select a customer from the dropdown above to start a loan conversation. This demo showcases our AI-powered loan sales assistant.',
    selectCustomerPlaceholder: 'Select a customer to start chatting...',
    typeMessagePlaceholder: 'Type your message...',
    
    // Customer Selector
    selectCustomerLabel: 'Select Customer (Demo)',
    chooseCustomer: 'Choose a customer...',
    
    // Agent Panel
    agenticArchitecture: 'Agentic AI Architecture',
    masterAgent: 'Master Agent',
    masterAgentDesc: 'Orchestrates the entire loan process',
    salesAgent: 'Sales Agent',
    salesAgentDesc: 'Collects loan requirements & EMI details',
    verificationAgent: 'Verification Agent',
    verificationAgentDesc: 'Validates KYC from CRM database',
    underwritingAgent: 'Underwriting Agent',
    underwritingAgentDesc: 'Credit assessment & eligibility check',
    sanctionAgent: 'Sanction Letter Agent',
    sanctionAgentDesc: 'Generates loan sanction documents',
    agentPanelNote: 'This demo showcases a multi-agent AI system where specialized agents collaborate to process loan applications end-to-end.',
    
    // How It Works
    howItWorks: 'How It Works',
    step1: 'Select a demo customer',
    step2: 'Enter loan amount & tenure',
    step3: 'AI verifies KYC & credit',
    step4: 'Get instant approval',
    step5: 'Download sanction letter',
    
    // Demo Note
    demoMode: 'Demo Mode:',
    demoNote: 'This is a simulation using static mock data. Select different customers to see various approval scenarios based on their credit profiles.',
    
    // Buttons & Actions
    uploadSalarySlip: 'Upload Salary Slip',
    downloadSanctionLetter: 'Download Sanction Letter',
    send: 'Send',
    
    // Accessibility
    speakTooltip: 'Speak instead of typing',
    listenTooltip: 'Listen to the chatbot response',
    
    // Language
    language: 'Language',
    
    // Toasts
    fileUploaded: 'File Uploaded',
    fileUploadedDesc: 'uploaded successfully. Processing...',
    downloadStarted: 'Download Started',
    downloadStartedDesc: 'Your sanction letter is being downloaded.',
    downloadFailed: 'Download Failed',
    downloadFailedDesc: 'Could not find the sanction letter. Please try again.',
  },
  hi: {
    // Header
    appName: 'क्विकलोन NBFC',
    tagline: 'AI-संचालित व्यक्तिगत ऋण',
    
    // Features
    instantDecisions: 'त्वरित निर्णय',
    instantDecisionsDesc: 'सेकंड में AI-संचालित अंडरराइटिंग',
    secureProcess: 'सुरक्षित प्रक्रिया',
    secureProcessDesc: 'बैंक-ग्रेड KYC सत्यापन',
    available24x7: '24/7 उपलब्ध',
    available24x7Desc: 'कभी भी, कहीं भी आवेदन करें',
    bestRates: 'सर्वोत्तम दरें',
    bestRatesDesc: '10.5% प्रति वर्ष से शुरू',
    
    // Chat Window
    assistantName: 'क्विकलोन सहायक',
    aiPoweredAgent: 'AI-संचालित ऋण बिक्री एजेंट',
    welcomeTitle: 'क्विकलोन NBFC में आपका स्वागत है',
    welcomeMessage: 'ऋण वार्तालाप शुरू करने के लिए ऊपर ड्रॉपडाउन से एक ग्राहक चुनें। यह डेमो हमारे AI-संचालित ऋण बिक्री सहायक को प्रदर्शित करता है।',
    selectCustomerPlaceholder: 'चैट शुरू करने के लिए ग्राहक चुनें...',
    typeMessagePlaceholder: 'अपना संदेश लिखें...',
    
    // Customer Selector
    selectCustomerLabel: 'ग्राहक चुनें (डेमो)',
    chooseCustomer: 'एक ग्राहक चुनें...',
    
    // Agent Panel
    agenticArchitecture: 'एजेंटिक AI आर्किटेक्चर',
    masterAgent: 'मास्टर एजेंट',
    masterAgentDesc: 'संपूर्ण ऋण प्रक्रिया का समन्वय करता है',
    salesAgent: 'बिक्री एजेंट',
    salesAgentDesc: 'ऋण आवश्यकताएं और EMI विवरण एकत्र करता है',
    verificationAgent: 'सत्यापन एजेंट',
    verificationAgentDesc: 'CRM डेटाबेस से KYC सत्यापित करता है',
    underwritingAgent: 'अंडरराइटिंग एजेंट',
    underwritingAgentDesc: 'क्रेडिट मूल्यांकन और पात्रता जांच',
    sanctionAgent: 'स्वीकृति पत्र एजेंट',
    sanctionAgentDesc: 'ऋण स्वीकृति दस्तावेज बनाता है',
    agentPanelNote: 'यह डेमो एक मल्टी-एजेंट AI सिस्टम प्रदर्शित करता है जहां विशेष एजेंट ऋण आवेदनों को एंड-टू-एंड संसाधित करने के लिए सहयोग करते हैं।',
    
    // How It Works
    howItWorks: 'यह कैसे काम करता है',
    step1: 'डेमो ग्राहक चुनें',
    step2: 'ऋण राशि और अवधि दर्ज करें',
    step3: 'AI KYC और क्रेडिट सत्यापित करता है',
    step4: 'त्वरित अनुमोदन प्राप्त करें',
    step5: 'स्वीकृति पत्र डाउनलोड करें',
    
    // Demo Note
    demoMode: 'डेमो मोड:',
    demoNote: 'यह स्थिर मॉक डेटा का उपयोग करने वाला एक सिमुलेशन है। उनके क्रेडिट प्रोफाइल के आधार पर विभिन्न अनुमोदन परिदृश्यों को देखने के लिए विभिन्न ग्राहकों का चयन करें।',
    
    // Buttons & Actions
    uploadSalarySlip: 'वेतन पर्ची अपलोड करें',
    downloadSanctionLetter: 'स्वीकृति पत्र डाउनलोड करें',
    send: 'भेजें',
    
    // Accessibility
    speakTooltip: 'टाइप करने के बजाय बोलें',
    listenTooltip: 'चैटबॉट प्रतिक्रिया सुनें',
    
    // Language
    language: 'भाषा',
    
    // Toasts
    fileUploaded: 'फ़ाइल अपलोड हो गई',
    fileUploadedDesc: 'सफलतापूर्वक अपलोड हो गई। प्रोसेसिंग...',
    downloadStarted: 'डाउनलोड शुरू हुआ',
    downloadStartedDesc: 'आपका स्वीकृति पत्र डाउनलोड हो रहा है।',
    downloadFailed: 'डाउनलोड विफल',
    downloadFailedDesc: 'स्वीकृति पत्र नहीं मिला। कृपया पुनः प्रयास करें।',
  },
  mr: {
    // Header
    appName: 'क्विकलोन NBFC',
    tagline: 'AI-संचालित वैयक्तिक कर्ज',
    
    // Features
    instantDecisions: 'त्वरित निर्णय',
    instantDecisionsDesc: 'सेकंदात AI-संचालित अंडररायटिंग',
    secureProcess: 'सुरक्षित प्रक्रिया',
    secureProcessDesc: 'बँक-दर्जाचे KYC पडताळणी',
    available24x7: '24/7 उपलब्ध',
    available24x7Desc: 'कधीही, कुठेही अर्ज करा',
    bestRates: 'सर्वोत्तम दर',
    bestRatesDesc: '10.5% प्रति वर्ष पासून',
    
    // Chat Window
    assistantName: 'क्विकलोन सहाय्यक',
    aiPoweredAgent: 'AI-संचालित कर्ज विक्री एजंट',
    welcomeTitle: 'क्विकलोन NBFC मध्ये आपले स्वागत आहे',
    welcomeMessage: 'कर्ज संवाद सुरू करण्यासाठी वरील ड्रॉपडाउनमधून ग्राहक निवडा. हे डेमो आमच्या AI-संचालित कर्ज विक्री सहाय्यकाचे प्रदर्शन करते.',
    selectCustomerPlaceholder: 'चॅट सुरू करण्यासाठी ग्राहक निवडा...',
    typeMessagePlaceholder: 'तुमचा संदेश लिहा...',
    
    // Customer Selector
    selectCustomerLabel: 'ग्राहक निवडा (डेमो)',
    chooseCustomer: 'ग्राहक निवडा...',
    
    // Agent Panel
    agenticArchitecture: 'एजंटिक AI आर्किटेक्चर',
    masterAgent: 'मास्टर एजंट',
    masterAgentDesc: 'संपूर्ण कर्ज प्रक्रियेचे समन्वय करते',
    salesAgent: 'विक्री एजंट',
    salesAgentDesc: 'कर्ज आवश्यकता आणि EMI तपशील गोळा करते',
    verificationAgent: 'पडताळणी एजंट',
    verificationAgentDesc: 'CRM डेटाबेसमधून KYC पडताळते',
    underwritingAgent: 'अंडररायटिंग एजंट',
    underwritingAgentDesc: 'क्रेडिट मूल्यांकन आणि पात्रता तपासणी',
    sanctionAgent: 'मंजुरी पत्र एजंट',
    sanctionAgentDesc: 'कर्ज मंजुरी दस्तऐवज तयार करते',
    agentPanelNote: 'हे डेमो एक मल्टी-एजंट AI प्रणाली प्रदर्शित करते जिथे विशेष एजंट कर्ज अर्जांवर एंड-टू-एंड प्रक्रिया करण्यासाठी सहकार्य करतात।',
    
    // How It Works
    howItWorks: 'हे कसे काम करते',
    step1: 'डेमो ग्राहक निवडा',
    step2: 'कर्ज रक्कम आणि कालावधी प्रविष्ट करा',
    step3: 'AI KYC आणि क्रेडिट पडताळते',
    step4: 'त्वरित मंजुरी मिळवा',
    step5: 'मंजुरी पत्र डाउनलोड करा',
    
    // Demo Note
    demoMode: 'डेमो मोड:',
    demoNote: 'हे स्थिर मॉक डेटा वापरणारे एक सिम्युलेशन आहे. त्यांच्या क्रेडिट प्रोफाइलवर आधारित विविध मंजुरी परिस्थिती पाहण्यासाठी विविध ग्राहक निवडा.',
    
    // Buttons & Actions
    uploadSalarySlip: 'पगार स्लिप अपलोड करा',
    downloadSanctionLetter: 'मंजुरी पत्र डाउनलोड करा',
    send: 'पाठवा',
    
    // Accessibility
    speakTooltip: 'टाइप करण्याऐवजी बोला',
    listenTooltip: 'चॅटबॉट प्रतिसाद ऐका',
    
    // Language
    language: 'भाषा',
    
    // Toasts
    fileUploaded: 'फाइल अपलोड झाली',
    fileUploadedDesc: 'यशस्वीरित्या अपलोड झाली. प्रक्रिया सुरू...',
    downloadStarted: 'डाउनलोड सुरू झाले',
    downloadStartedDesc: 'तुमचे मंजुरी पत्र डाउनलोड होत आहे.',
    downloadFailed: 'डाउनलोड अयशस्वी',
    downloadFailedDesc: 'मंजुरी पत्र सापडले नाही. कृपया पुन्हा प्रयत्न करा.',
  }
} as const;

export type TranslationKey = keyof typeof translations.en;

export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी'
};
