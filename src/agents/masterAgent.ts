import { AgentContext, ConversationState, Message, LoanApplication } from './types';
import { salesAgent } from './salesAgent';
import { verificationAgent } from './verificationAgent';
import { underwritingAgent } from './underwritingAgent';
import { sanctionLetterAgent } from './sanctionLetterAgent';

export class MasterAgent {
  private context: AgentContext;

  constructor(customerId: string) {
    this.context = {
      customerId,
      state: 'greeting',
      application: { customerId },
      messages: []
    };
  }

  getContext(): AgentContext {
    return this.context;
  }

  reset(customerId: string): void {
    this.context = {
      customerId,
      state: 'greeting',
      application: { customerId },
      messages: []
    };
  }

  processMessage(userMessage: string): Message[] {
    const responses: Message[] = [];
    
    const addResponse = (content: string, showFileUpload = false, showDownload = false, sanctionLetterId?: string) => {
      responses.push({
        id: crypto.randomUUID(),
        role: 'assistant',
        content,
        timestamp: new Date(),
        agentType: 'master',
        showFileUpload,
        showDownload,
        sanctionLetterId
      });
    };

    switch (this.context.state) {
      case 'greeting':
        addResponse(salesAgent.greet(this.context.customerId));
        this.context.state = 'collecting_loan_amount';
        break;

      case 'collecting_loan_amount':
        const amount = this.parseAmount(userMessage);
        if (amount) {
          const validation = salesAgent.validateLoanAmount(amount);
          if (validation.valid) {
            this.context.application.loanAmount = amount;
            addResponse(salesAgent.askTenure(amount));
            this.context.state = 'collecting_tenure';
          } else {
            addResponse(validation.message);
          }
        } else {
          addResponse("Please enter a valid loan amount (e.g., 500000 or 5 lakh)");
        }
        break;

      case 'collecting_tenure':
        const tenure = this.parseTenure(userMessage);
        if (tenure) {
          const validation = salesAgent.validateTenure(tenure);
          if (validation.valid) {
            this.context.application.tenure = tenure;
            this.context.application.interestRate = 11.5;
            const { emi } = salesAgent.calculateEMI(
              this.context.application.loanAmount!,
              tenure,
              11.5
            );
            this.context.application.emi = emi;
            addResponse(salesAgent.showEMIDetails(this.context.application));
            this.context.state = 'showing_emi';
          } else {
            addResponse(validation.message);
          }
        } else {
          addResponse("Please enter a valid tenure in months (12-60)");
        }
        break;

      case 'showing_emi':
        if (userMessage.toLowerCase().includes('yes') || userMessage.toLowerCase().includes('proceed')) {
          addResponse(verificationAgent.getVerificationStatus());
          const verificationResult = verificationAgent.verifyKYC(this.context.customerId);
          
          setTimeout(() => {}, 1000);
          
          if (verificationResult.success) {
            addResponse(verificationResult.message);
            this.context.state = 'underwriting';
            
            // Auto-proceed to underwriting
            const underwritingResult = underwritingAgent.assessCredit(
              this.context.customerId,
              this.context.application.loanAmount!
            );
            
            if (underwritingResult.decision === 'approved') {
              addResponse(underwritingResult.message);
              this.context.application.status = 'approved';
              
              // Generate sanction letter
              const sanctionResult = sanctionLetterAgent.generateLetter(
                this.context.customerId,
                this.context.application
              );
              
              if (sanctionResult.success) {
                this.context.application.sanctionLetterId = sanctionResult.letterId;
                addResponse(sanctionResult.message, false, true, sanctionResult.letterId);
                this.context.state = 'sanction_generated';
              }
            } else if (underwritingResult.decision === 'salary_slip_required') {
              addResponse(underwritingResult.message, true);
              this.context.state = 'waiting_salary_slip';
            } else {
              addResponse(underwritingResult.message);
              this.context.application.status = 'rejected';
              this.context.application.rejectionReason = underwritingResult.reason;
              this.context.state = 'rejected';
            }
          } else {
            addResponse(verificationResult.message);
            this.context.state = 'rejected';
          }
        } else if (userMessage.toLowerCase().includes('no') || userMessage.toLowerCase().includes('change')) {
          addResponse("No problem! Let's start over. What loan amount would you like to apply for?");
          this.context.state = 'collecting_loan_amount';
          this.context.application = { customerId: this.context.customerId };
        } else {
          addResponse("Please type 'yes' to proceed with verification or 'no' to modify your loan details.");
        }
        break;

      case 'waiting_salary_slip':
        addResponse("I see you've uploaded your salary slip. Let me verify it...");
        
        const salaryVerification = underwritingAgent.verifySalarySlip(
          this.context.customerId,
          this.context.application
        );
        
        if (salaryVerification.decision === 'approved') {
          addResponse(salaryVerification.message);
          this.context.application.status = 'approved';
          this.context.application.salarySlipUploaded = true;
          
          // Generate sanction letter
          const sanctionResult = sanctionLetterAgent.generateLetter(
            this.context.customerId,
            this.context.application
          );
          
          if (sanctionResult.success) {
            this.context.application.sanctionLetterId = sanctionResult.letterId;
            addResponse(sanctionResult.message, false, true, sanctionResult.letterId);
            this.context.state = 'sanction_generated';
          }
        } else {
          addResponse(salaryVerification.message);
          this.context.application.status = 'rejected';
          this.context.application.rejectionReason = salaryVerification.reason;
          this.context.state = 'rejected';
        }
        break;

      case 'rejected':
        if (userMessage.toLowerCase().includes('yes') || userMessage.toLowerCase().includes('new') || userMessage.toLowerCase().includes('try')) {
          addResponse("Let's start fresh! What loan amount would you like to apply for?");
          this.context.state = 'collecting_loan_amount';
          this.context.application = { customerId: this.context.customerId };
        } else {
          addResponse("Thank you for using QuickLoan. If you'd like to apply for a new loan, just type 'yes'. Have a great day! 👋");
        }
        break;

      case 'sanction_generated':
        addResponse("Your loan has been sanctioned! 🎉\n\nIf you have any questions about the loan terms or need assistance with documentation, feel free to ask.\n\nThank you for choosing QuickLoan NBFC!");
        break;

      default:
        addResponse("I'm sorry, something went wrong. Let me restart the conversation.");
        this.context.state = 'greeting';
    }

    return responses;
  }

  private parseAmount(input: string): number | null {
    // Remove spaces and convert to lowercase
    const cleanInput = input.toLowerCase().replace(/\s+/g, '').replace(/,/g, '');
    
    // Check for lakh notation
    const lakhMatch = cleanInput.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lac|l)/);
    if (lakhMatch) {
      return parseFloat(lakhMatch[1]) * 100000;
    }
    
    // Check for plain number
    const numMatch = cleanInput.match(/(\d+)/);
    if (numMatch) {
      return parseInt(numMatch[1]);
    }
    
    return null;
  }

  private parseTenure(input: string): number | null {
    const cleanInput = input.toLowerCase().replace(/\s+/g, '');
    
    // Check for year notation
    const yearMatch = cleanInput.match(/(\d+)\s*(?:year|yr|y)/);
    if (yearMatch) {
      return parseInt(yearMatch[1]) * 12;
    }
    
    // Check for month notation or plain number
    const monthMatch = cleanInput.match(/(\d+)/);
    if (monthMatch) {
      return parseInt(monthMatch[1]);
    }
    
    return null;
  }

  handleSalarySlipUpload(): Message[] {
    // Simulate processing and return to waiting_salary_slip state handler
    return this.processMessage('uploaded');
  }
}
