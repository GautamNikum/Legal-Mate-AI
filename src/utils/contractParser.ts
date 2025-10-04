// Utility to parse additional information and extract structured data
export interface ContractDetails {
  partyA?: string;
  partyB?: string;
  duration?: string;
  durationMonths?: number;
  paymentTerms?: string;
  effectiveDate: string;
  endDate?: string;
}

export const parseAdditionalInfo = (text: string): ContractDetails => {
  const details: ContractDetails = {
    effectiveDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  // Extract party names
  const partyAMatch = text.match(/party\s*a:?\s*([^\n,]+)/i);
  const partyBMatch = text.match(/party\s*b:?\s*([^\n,]+)/i);
  
  if (partyAMatch) details.partyA = partyAMatch[1].trim();
  if (partyBMatch) details.partyB = partyBMatch[1].trim();

  // Extract duration (supports "6 months", "12 months", "1 year", etc.)
  const durationMatch = text.match(/duration:?\s*(\d+)\s*(month|months|year|years)/i);
  if (durationMatch) {
    const value = parseInt(durationMatch[1]);
    const unit = durationMatch[2].toLowerCase();
    details.duration = `${value} ${unit}`;
    details.durationMonths = unit.includes('year') ? value * 12 : value;
    
    // Calculate end date
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + details.durationMonths);
    details.endDate = endDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  // Extract payment terms
  const paymentMatch = text.match(/payment\s*terms?:?\s*([^\n]+)/i);
  if (paymentMatch) {
    details.paymentTerms = paymentMatch[1].trim();
  }

  return details;
};

export const formatContract = (
  template: string,
  details: ContractDetails,
  isHindi: boolean = false
): string => {
  let formatted = template;

  // Replace placeholders
  formatted = formatted.replace(/\[Date\]/g, details.effectiveDate);
  formatted = formatted.replace(/\[तारीख\]/g, details.effectiveDate);
  
  if (details.partyA) {
    formatted = formatted.replace(/\[Company\/Individual Name\]/g, details.partyA);
    formatted = formatted.replace(/\[कंपनी\/व्यक्ति का नाम\]/g, details.partyA);
    formatted = formatted.replace(/Party A: .*/g, `Party A: ${details.partyA}`);
    formatted = formatted.replace(/पक्ष A: .*/g, `पक्ष A: ${details.partyA}`);
  }
  
  if (details.partyB) {
    formatted = formatted.replace(/Party B: .*/g, `Party B: ${details.partyB}`);
    formatted = formatted.replace(/पक्ष B: .*/g, `पक्ष B: ${details.partyB}`);
  }

  if (details.duration && details.endDate) {
    const durationClause = isHindi 
      ? `\nअनुबंध अवधि: ${details.duration}\nसमाप्ति तिथि: ${details.endDate}\n`
      : `\nContract Duration: ${details.duration}\nTermination Date: ${details.endDate}\n`;
    
    formatted = formatted.replace(
      /TERMS AND CONDITIONS/,
      `TERMS AND CONDITIONS\n${durationClause}`
    );
    formatted = formatted.replace(
      /नियम और शर्तें/,
      `नियम और शर्तें\n${durationClause}`
    );
  }

  if (details.paymentTerms) {
    formatted = formatted.replace(
      /Payment shall be made.*/,
      details.paymentTerms
    );
  }

  return formatted;
};
