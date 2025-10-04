import jsPDF from 'jspdf';

export const exportContractToPDF = (content: string, filename: string = 'contract.pdf') => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Set font
  doc.setFont('helvetica');
  doc.setFontSize(12);

  // Add title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Contract Agreement', 105, 20, { align: 'center' });

  // Add content
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  const maxWidth = pageWidth - 2 * margin;
  
  let yPosition = 35;
  
  // Split content into lines
  const lines = content.split('\n');
  
  lines.forEach((line) => {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }

    // Handle bold text (text in brackets or uppercase headers)
    if (line.match(/^\[.*\]$/) || line.match(/^[A-Z\s]+:?$/)) {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }

    // Split long lines
    const splitLines = doc.splitTextToSize(line || ' ', maxWidth);
    
    splitLines.forEach((splitLine: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(splitLine, margin, yPosition);
      yPosition += lineHeight;
    });
  });

  // Add footer with page numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  doc.save(filename);
};
