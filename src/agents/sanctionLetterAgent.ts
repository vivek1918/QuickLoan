import { jsPDF } from 'jspdf';
import { getCustomerById } from '@/data/mockData';
import { LoanApplication } from './types';
import { salesAgent } from './salesAgent';

export interface SanctionLetter {
  id: string;
  pdfBlob: Blob;
  generatedAt: Date;
}

// Store generated letters in memory
const sanctionLetters: Map<string, SanctionLetter> = new Map();

export const sanctionLetterAgent = {
  generateLetter: (customerId: string, application: LoanApplication): { success: boolean; letterId?: string; message: string } => {
    const customer = getCustomerById(customerId);
    
    if (!customer) {
      return { success: false, message: "Error generating sanction letter: Customer not found" };
    }

    const letterId = `SL-${Date.now()}-${customerId}`;
    const { emi, totalInterest, totalAmount } = salesAgent.calculateEMI(
      application.loanAmount!,
      application.tenure!,
      application.interestRate || 11.5
    );

    // Generate PDF
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(138, 92, 246); // Purple
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('QuickLoan NBFC', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Personal Loan Sanction Letter', 105, 32, { align: 'center' });

    // Reference
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Reference No: ${letterId}`, 20, 55);
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 150, 55);

    // Customer Details
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Borrower Details', 20, 75);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${customer.name}`, 20, 85);
    doc.text(`Customer ID: ${customer.customer_id}`, 20, 93);
    doc.text(`Phone: ${customer.phone}`, 20, 101);
    doc.text(`Address: ${customer.address}`, 20, 109);

    // Loan Details
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Loan Sanction Details', 20, 130);
    
    doc.setFillColor(245, 245, 245);
    doc.rect(20, 135, 170, 60, 'F');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const loanDetails = [
      ['Sanctioned Amount:', `₹${application.loanAmount!.toLocaleString('en-IN')}`],
      ['Interest Rate:', `${application.interestRate || 11.5}% p.a.`],
      ['Tenure:', `${application.tenure} months`],
      ['Monthly EMI:', `₹${emi.toLocaleString('en-IN')}`],
      ['Total Interest:', `₹${totalInterest.toLocaleString('en-IN')}`],
      ['Total Payable:', `₹${totalAmount.toLocaleString('en-IN')}`],
    ];

    let y = 145;
    loanDetails.forEach(([label, value]) => {
      doc.text(label, 30, y);
      doc.setFont('helvetica', 'bold');
      doc.text(value, 120, y);
      doc.setFont('helvetica', 'normal');
      y += 10;
    });

    // Terms
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Terms & Conditions', 20, 215);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const terms = [
      '1. This sanction letter is valid for 30 days from the date of issue.',
      '2. Disbursement is subject to completion of all documentation.',
      '3. Pre-closure charges: 3% of outstanding principal after 6 months.',
      '4. Late payment charges: 2% per month on overdue EMI.',
      '5. All disputes subject to jurisdiction of local courts.'
    ];
    let termY = 225;
    terms.forEach(term => {
      doc.text(term, 20, termY);
      termY += 7;
    });

    // Signature
    doc.setFontSize(11);
    doc.text('Authorized Signatory', 140, 275);
    doc.setFont('helvetica', 'bold');
    doc.text('QuickLoan NBFC', 140, 283);

    // Footer
    doc.setFillColor(138, 92, 246);
    doc.rect(0, 290, 210, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('This is a system generated document | support@quickloan.com | 1800-XXX-XXXX', 105, 296, { align: 'center' });

    const pdfBlob = doc.output('blob');
    
    sanctionLetters.set(letterId, {
      id: letterId,
      pdfBlob,
      generatedAt: new Date()
    });

    return {
      success: true,
      letterId,
      message: `📜 **Sanction Letter Generated!**\n\n` +
        `Reference: ${letterId}\n\n` +
        `🎊 **Congratulations ${customer.name}!**\n\n` +
        `Your personal loan of ₹${application.loanAmount!.toLocaleString('en-IN')} has been sanctioned.\n\n` +
        `📥 Click the button below to download your sanction letter.`
    };
  },

  downloadLetter: (letterId: string): Blob | null => {
    const letter = sanctionLetters.get(letterId);
    return letter?.pdfBlob || null;
  }
};
