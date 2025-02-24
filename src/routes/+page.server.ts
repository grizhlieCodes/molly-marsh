import type { Actions } from './$types';

export const actions: Actions = {
	sendErrorReport: async (event) => {
		try {
			const formData = await event.request.formData();
			console.log('Form data received:', [...formData.entries()]);

			const reportDataStr = formData.get('reportData');
			console.log('Report data string length:', reportDataStr ? reportDataStr.toString().length : 'null');

			if (!reportDataStr) {
				console.error('No report data found in form submission');
				return { success: false, message: 'No report data found' };
			}

			const reportData = JSON.parse(reportDataStr.toString());
			console.log('Report data parsed, keys:', Object.keys(reportData));
			const response = await event.fetch('/api/email/send-error-report', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(reportData)
			});

			if (!response.ok) {
				return { success: false, message: 'Failed to send report' };
			}

			return { success: true };
		} catch (error) {
			console.error('Error sending bug report:', error);
			return { success: false, message: error.message };
		}
	}
};
