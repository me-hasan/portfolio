// Configuration file for sensitive data
// Uses environment variables for EmailJS credentials
// Get your credentials from https://www.emailjs.com/

const CONFIG = {
    emailjs: {
        serviceId: process.env.EMAILJS_SERVICE_ID || 'service_locvdra',
        templateId: process.env.EMAILJS_TEMPLATE_ID || 'template_vgo6eb9',
        publicKey: process.env.EMAILJS_PUBLIC_KEY || 'Miyj13RhV53SlpsgN'
    }
};