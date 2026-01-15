import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableCell, TableRow, WidthType } from 'docx';
import { MonthData } from '../types';

// Generate PDF Export
export async function exportToPDF(data: MonthData[], scope: 'current' | 'all', currentMonth?: MonthData) {
  const exportData = scope === 'current' && currentMonth ? [currentMonth] : data;
  
  // Create a temporary container for rendering
  const container = document.createElement('div');
  container.style.width = '800px';
  container.style.padding = '40px';
  container.style.backgroundColor = 'white';
  container.style.fontFamily = 'Arial, sans-serif';
  
  // Build HTML content
  let html = `
    <div style="margin-bottom: 30px;">
      <h1 style="color: #c026d3; font-size: 28px; margin-bottom: 10px;">Physique 57 India</h1>
      <h2 style="color: #4b5563; font-size: 20px; margin-bottom: 20px;">2026 Sales Masterplan</h2>
      <p style="color: #6b7280; font-size: 12px;">Generated: ${new Date().toLocaleDateString()}</p>
    </div>
  `;
  
  exportData.forEach((month, index) => {
    html += `
      <div style="page-break-after: always; margin-bottom: 30px;">
        <div style="border-bottom: 3px solid #c026d3; padding-bottom: 15px; margin-bottom: 20px;">
          <h3 style="color: #c026d3; font-size: 22px; margin-bottom: 5px;">${month.name}</h3>
          <h4 style="color: #6b7280; font-size: 16px; margin-bottom: 10px;">${month.theme}</h4>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">${month.summary}</p>
          <p style="color: #059669; font-weight: bold; font-size: 16px; margin-top: 10px;">Revenue Target: ${month.revenueTargetTotal}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h5 style="color: #374151; font-size: 16px; margin-bottom: 10px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Strategic Offers (${month.offers.filter(o => !o.cancelled).length} Active)</h5>
          ${month.offers.filter(o => !o.cancelled).map(offer => `
            <div style="margin-bottom: 15px; padding: 15px; background: #f9fafb; border-left: 4px solid #c026d3; border-radius: 4px;">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                <h6 style="color: #111827; font-size: 14px; font-weight: bold; margin: 0;">${offer.title}</h6>
                <span style="background: #ddd6fe; color: #7c3aed; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">${offer.type}</span>
              </div>
              <p style="color: #6b7280; font-size: 12px; margin: 5px 0;">${offer.description}</p>
              <p style="color: #c026d3; font-weight: bold; font-size: 13px; margin: 5px 0;">${offer.pricing}</p>
              <div style="margin: 8px 0; padding: 8px; background: #fff; border-radius: 4px; font-size: 11px;">
                <p style="margin: 2px 0; color: #374151;"><strong>Mumbai:</strong> ₹${offer.priceMumbai?.toLocaleString('en-IN') || 'N/A'} → <strong>₹${offer.finalPriceMumbai?.toLocaleString('en-IN') || 'N/A'}</strong></p>
                <p style="margin: 2px 0; color: #374151;"><strong>Bengaluru:</strong> ₹${offer.priceBengaluru?.toLocaleString('en-IN') || 'N/A'} → <strong>₹${offer.finalPriceBengaluru?.toLocaleString('en-IN') || 'N/A'}</strong></p>
                <p style="margin: 2px 0; color: #059669;"><strong>Discount:</strong> ${offer.discountPercent}% | <strong>Savings:</strong> ${offer.savings}</p>
                <p style="margin: 2px 0; color: #6366f1;"><strong>Target:</strong> ${offer.targetUnits} units | <strong>Promoted:</strong> ${offer.promoteOnAds ? 'Yes' : 'No'}</p>
              </div>
              <p style="color: #4b5563; font-size: 11px; font-style: italic; margin: 5px 0;">Strategy: ${offer.whyItWorks}</p>
              ${offer.marketingCollateral ? `<p style="color: #7c3aed; font-size: 10px; margin: 3px 0;">📣 Marketing: ${offer.marketingCollateral}</p>` : ''}
              ${offer.operationalSupport ? `<p style="color: #059669; font-size: 10px; margin: 3px 0;">⚙️ Operations: ${offer.operationalSupport}</p>` : ''}
            </div>
          `).join('')}
        </div>
        
        ${month.financialTargets && month.financialTargets.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h5 style="color: #374151; font-size: 16px; margin-bottom: 10px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Financial Targets</h5>
          ${month.financialTargets.map(target => `
            <div style="margin-bottom: 10px; padding: 10px; background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
              <p style="color: #1e40af; font-weight: bold; font-size: 13px; margin: 0;">${target.location} - ${target.category}</p>
              <p style="color: #4b5563; font-size: 12px; margin: 5px 0;">Target: ${target.targetUnits} units | Revenue: ${target.revenueTarget}</p>
              <p style="color: #6b7280; font-size: 11px; font-style: italic; margin: 0;">${target.logic}</p>
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>
    `;
  });
  
  container.innerHTML = html;
  document.body.appendChild(container);
  
  // Convert to canvas
  const canvas = await html2canvas(container, {
    scale: 2,
    backgroundColor: '#ffffff',
    logging: false
  });
  
  document.body.removeChild(container);
  
  // Create PDF
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;
  
  const imgData = canvas.toDataURL('image/png');
  
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;
  
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  
  const filename = scope === 'current' && currentMonth 
    ? `Physique57_${currentMonth.name}_Plan_${new Date().toISOString().split('T')[0]}.pdf`
    : `Physique57_2026_Sales_Plan_${new Date().toISOString().split('T')[0]}.pdf`;
  
  pdf.save(filename);
}

// Generate Word Document Export
export async function exportToWord(data: MonthData[], scope: 'current' | 'all', currentMonth?: MonthData) {
  const exportData = scope === 'current' && currentMonth ? [currentMonth] : data;
  
  const children: any[] = [
    new Paragraph({
      text: "Physique 57 India",
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }),
    new Paragraph({
      text: "2026 Sales Masterplan",
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }),
    new Paragraph({
      text: `Generated: ${new Date().toLocaleDateString()}`,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    })
  ];
  
  exportData.forEach(month => {
    // Month header
    children.push(
      new Paragraph({
        text: month.name,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      }),
      new Paragraph({
        text: month.theme,
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 200 }
      }),
      new Paragraph({
        text: month.summary,
        spacing: { after: 200 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Revenue Target: ${month.revenueTargetTotal}`,
            bold: true,
            color: "059669"
          })
        ],
        spacing: { after: 300 }
      })
    );
    
    // Strategic Offers
    children.push(
      new Paragraph({
        text: `Strategic Offers (${month.offers.filter(o => !o.cancelled).length} Active)`,
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 300, after: 200 }
      })
    );
    
    month.offers.filter(o => !o.cancelled).forEach(offer => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${offer.title} `,
              bold: true,
              size: 24
            }),
            new TextRun({
              text: `[${offer.type}]`,
              color: "7c3aed",
              bold: true
            })
          ],
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          text: offer.description,
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: offer.pricing,
              bold: true,
              color: "c026d3"
            })
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Mumbai: ₹${offer.priceMumbai?.toLocaleString('en-IN') || 'N/A'} → ₹${offer.finalPriceMumbai?.toLocaleString('en-IN') || 'N/A'} | `,
              size: 20
            }),
            new TextRun({
              text: `Bengaluru: ₹${offer.priceBengaluru?.toLocaleString('en-IN') || 'N/A'} → ₹${offer.finalPriceBengaluru?.toLocaleString('en-IN') || 'N/A'}`,
              size: 20
            })
          ],
          spacing: { after: 50 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Discount: ${offer.discountPercent}% | Savings: ${offer.savings} | Target: ${offer.targetUnits} units`,
              size: 20,
              color: "059669"
            })
          ],
          spacing: { after: 100 }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Strategy: ${offer.whyItWorks}`,
              italics: true
            })
          ],
          spacing: { after: 100 }
        })
      );
      
      if (offer.marketingCollateral) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Marketing: ${offer.marketingCollateral}`,
                size: 18,
                color: "7c3aed"
              })
            ],
            spacing: { after: 50 }
          })
        );
      }
      
      if (offer.operationalSupport) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Operations: ${offer.operationalSupport}`,
                size: 18,
                color: "059669"
              })
            ],
            spacing: { after: 200 }
          })
        );
      }
    });
    
    // Financial Targets
    if (month.financialTargets && month.financialTargets.length > 0) {
      children.push(
        new Paragraph({
          text: "Financial Targets",
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 300, after: 200 }
        })
      );
      
      month.financialTargets.forEach(target => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${target.location} - ${target.category}`,
                bold: true
              })
            ],
            spacing: { before: 150, after: 50 }
          }),
          new Paragraph({
            text: `Target: ${target.targetUnits} units | Revenue: ${target.revenueTarget}`,
            spacing: { after: 50 }
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: target.logic,
                italics: true
              })
            ],
            spacing: { after: 150 }
          })
        );
      });
    }
  });
  
  const doc = new Document({
    sections: [{
      properties: {},
      children: children
    }]
  });
  
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const filename = scope === 'current' && currentMonth 
    ? `Physique57_${currentMonth.name}_Plan_${new Date().toISOString().split('T')[0]}.docx`
    : `Physique57_2026_Sales_Plan_${new Date().toISOString().split('T')[0]}.docx`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Generate Image Export
export async function exportToImage(data: MonthData[], scope: 'current' | 'all', currentMonth?: MonthData) {
  const exportData = scope === 'current' && currentMonth ? [currentMonth] : data;
  
  // Create a temporary container
  const container = document.createElement('div');
  container.style.width = '1200px';
  container.style.padding = '60px';
  container.style.backgroundColor = 'white';
  container.style.fontFamily = 'Inter, Arial, sans-serif';
  
  let html = `
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #c026d3; font-size: 48px; margin-bottom: 15px; font-weight: bold;">Physique 57 India</h1>
      <h2 style="color: #6b7280; font-size: 32px; margin-bottom: 20px;">2026 Sales Masterplan</h2>
      <p style="color: #9ca3af; font-size: 16px;">Generated: ${new Date().toLocaleDateString()}</p>
    </div>
  `;
  
  exportData.forEach(month => {
    html += `
      <div style="margin-bottom: 50px; padding: 40px; background: linear-gradient(135deg, #fdf4ff 0%, #f0abfc 100%); border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <h3 style="color: #c026d3; font-size: 36px; margin-bottom: 10px; font-weight: bold;">${month.name}</h3>
        <h4 style="color: #7c3aed; font-size: 24px; margin-bottom: 20px;">${month.theme}</h4>
        <p style="color: #4b5563; font-size: 18px; line-height: 1.6; margin-bottom: 20px;">${month.summary}</p>
        <p style="color: #059669; font-weight: bold; font-size: 22px;">💰 Revenue Target: ${month.revenueTargetTotal}</p>
        
        <div style="margin-top: 30px; padding-top: 30px; border-top: 3px solid #c026d3;">
          <h5 style="color: #374151; font-size: 24px; margin-bottom: 20px;">✨ Strategic Offers (${month.offers.filter(o => !o.cancelled).length} Active)</h5>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            ${month.offers.filter(o => !o.cancelled).map(offer => `
              <div style="padding: 20px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <h6 style="color: #111827; font-size: 18px; font-weight: bold; margin: 0;">${offer.title}</h6>
                  <span style="background: #ddd6fe; color: #7c3aed; padding: 6px 12px; border-radius: 16px; font-size: 12px; font-weight: bold;">${offer.type}</span>
                </div>
                <p style="color: #6b7280; font-size: 14px; margin: 10px 0; line-height: 1.5;">${offer.description}</p>
                <p style="color: #c026d3; font-weight: bold; font-size: 16px; margin: 10px 0;">${offer.pricing}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  document.body.appendChild(container);
  
  const canvas = await html2canvas(container, {
    scale: 2,
    backgroundColor: '#ffffff',
    logging: false
  });
  
  document.body.removeChild(container);
  
  // Download as PNG
  const url = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = url;
  const filename = scope === 'current' && currentMonth 
    ? `Physique57_${currentMonth.name}_Plan_${new Date().toISOString().split('T')[0]}.png`
    : `Physique57_2026_Sales_Plan_${new Date().toISOString().split('T')[0]}.png`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Generate Email Body HTML
export function generateEmailBody(data: MonthData[], scope: 'current' | 'all', currentMonth?: MonthData): string {
  const exportData = scope === 'current' && currentMonth ? [currentMonth] : data;
  
  let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Physique 57 India - 2026 Sales Masterplan</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #c026d3 0%, #7c3aed 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: #ffffff; font-size: 32px; margin: 0 0 10px 0;">Physique 57 India</h1>
              <h2 style="color: #fdf4ff; font-size: 20px; margin: 0;">2026 Sales Masterplan</h2>
            </td>
          </tr>
          
          <!-- Content -->
          ${exportData.map(month => `
          <tr>
            <td style="padding: 30px;">
              <h3 style="color: #c026d3; font-size: 24px; margin: 0 0 10px 0;">${month.name}: ${month.theme}</h3>
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">${month.summary}</p>
              <p style="color: #059669; font-weight: bold; font-size: 16px; margin: 0 0 20px 0;">💰 Revenue Target: ${month.revenueTargetTotal}</p>
              
              <h4 style="color: #374151; font-size: 18px; margin: 20px 0 15px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Strategic Offers (${month.offers.filter(o => !o.cancelled).length} Active)</h4>
              
              ${month.offers.filter(o => !o.cancelled).map(offer => `
              <div style="margin-bottom: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #c026d3; border-radius: 4px;">
                <div style="margin-bottom: 8px;">
                  <strong style="color: #111827; font-size: 15px;">${offer.title}</strong>
                  <span style="background-color: #ddd6fe; color: #7c3aed; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; margin-left: 10px;">${offer.type}</span>
                </div>
                <p style="color: #6b7280; font-size: 13px; margin: 8px 0; line-height: 1.5;">${offer.description}</p>
                <p style="color: #c026d3; font-weight: bold; font-size: 14px; margin: 8px 0;">${offer.pricing}</p>
                <div style="margin: 10px 0; padding: 10px; background-color: #ffffff; border-radius: 4px; font-size: 12px;">
                  <p style="margin: 3px 0; color: #374151;"><strong>Mumbai:</strong> ₹${offer.priceMumbai?.toLocaleString('en-IN') || 'N/A'} → <strong>₹${offer.finalPriceMumbai?.toLocaleString('en-IN') || 'N/A'}</strong></p>
                  <p style="margin: 3px 0; color: #374151;"><strong>Bengaluru:</strong> ₹${offer.priceBengaluru?.toLocaleString('en-IN') || 'N/A'} → <strong>₹${offer.finalPriceBengaluru?.toLocaleString('en-IN') || 'N/A'}</strong></p>
                  <p style="margin: 3px 0; color: #059669;"><strong>Discount:</strong> ${offer.discountPercent}% | <strong>Savings:</strong> ${offer.savings}</p>
                  <p style="margin: 3px 0; color: #6366f1;"><strong>Target:</strong> ${offer.targetUnits} units | <strong>Promoted:</strong> ${offer.promoteOnAds ? 'Yes' : 'No'}</p>
                </div>
                <p style="color: #4b5563; font-size: 12px; font-style: italic; margin: 8px 0;">Strategy: ${offer.whyItWorks}</p>
                ${offer.marketingCollateral ? `<p style="color: #7c3aed; font-size: 11px; margin: 5px 0;">📣 <strong>Marketing:</strong> ${offer.marketingCollateral}</p>` : ''}
                ${offer.operationalSupport ? `<p style="color: #059669; font-size: 11px; margin: 5px 0;">⚙️ <strong>Operations:</strong> ${offer.operationalSupport}</p>` : ''}
              </div>
              `).join('')}
              
              ${month.financialTargets && month.financialTargets.length > 0 ? `
              <h4 style="color: #374151; font-size: 18px; margin: 25px 0 15px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Financial Targets</h4>
              ${month.financialTargets.map(target => `
              <div style="margin-bottom: 15px; padding: 12px; background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
                <p style="color: #1e40af; font-weight: bold; font-size: 14px; margin: 0 0 6px 0;">${target.location} - ${target.category}</p>
                <p style="color: #4b5563; font-size: 13px; margin: 0 0 6px 0;">Target: ${target.targetUnits} units | Revenue: ${target.revenueTarget}</p>
                <p style="color: #6b7280; font-size: 12px; font-style: italic; margin: 0;">${target.logic}</p>
              </div>
              `).join('')}
              ` : ''}
            </td>
          </tr>
          `).join('<tr><td style="padding: 0 30px;"><hr style="border: none; border-top: 2px solid #e5e7eb; margin: 0;"></td></tr>')}
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-radius: 0 0 12px 12px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2026 Physique 57 India Sales Strategy - Confidential</p>
              <p style="color: #9ca3af; font-size: 11px; margin: 10px 0 0 0;">Generated on ${new Date().toLocaleString()}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
  
  return html;
}

// Copy Email HTML to clipboard
export async function copyEmailToClipboard(data: MonthData[], scope: 'current' | 'all', currentMonth?: MonthData) {
  const emailHTML = generateEmailBody(data, scope, currentMonth);
  await navigator.clipboard.writeText(emailHTML);
}
