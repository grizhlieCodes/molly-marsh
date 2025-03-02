/**
 * Generates HTML for error report email
 * @param data Error data
 * @returns HTML content for error report email
 */
export function errorReportTemplate(data: {
  url: string;
  timestamp: string;
  browser?: { name: string; version: string };
  clientIp: string;
  errors?: Array<{ message?: string; filename?: string; lineno?: string; colno?: string }>;
  screenshot?: string;
}): string {
  const browserInfo = data.browser || { name: 'Unknown', version: 'Unknown' };
  const browserString = `${browserInfo.name} ${browserInfo.version}`;
  
  const errorMessages = (data.errors || []).map(
    (err) => `${err.message || ''} at ${err.filename || ''}:${err.lineno || ''}:${err.colno || ''}`
  );
  
  return `
    <h2>Bug Report</h2>
    <p><strong>URL:</strong> ${data.url}</p>
    <p><strong>Timestamp:</strong> ${data.timestamp}</p>
    <p><strong>Browser:</strong> ${browserString}</p>
    <p><strong>IP Address:</strong> ${data.clientIp}</p>
    
    ${errorMessages.length ? `<h3>Console Errors:</h3><pre>${errorMessages.join('\n')}</pre>` : ''}
    
    ${data.screenshot ? '<h3>Screenshot:</h3><img src="cid:screenshot@report.com" alt="Screenshot" style="max-width: 100%;" />' : '<p>No screenshot available</p>'}
  `;
}