import { SECRET_TRANSPORTER_USER, SECRET_TRANSPORTER_PASS } from '$env/static/private';
import nodemailer from 'nodemailer';

/**
 * Creates and returns a configured nodemailer transporter
 * @returns A configured nodemailer transporter instance
 */
export function setupEmailTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SECRET_TRANSPORTER_USER,
      pass: SECRET_TRANSPORTER_PASS
    }
  });
}

// Create a singleton instance for reuse
let emailTransporter: nodemailer.Transporter | null = null;

/**
 * Gets a nodemailer transporter instance (creates one if it doesn't exist)
 * @returns A configured nodemailer transporter instance
 */
export function getEmailTransporter() {
  if (!emailTransporter) {
    emailTransporter = setupEmailTransporter();
  }
  return emailTransporter;
}

// Email sender configuration
export const EMAIL_SENDER = SECRET_TRANSPORTER_USER;
export const EMAIL_SENDER_NAME = 'Molly Marsh';
export const EMAIL_FORMATTED_SENDER = `${EMAIL_SENDER_NAME} <${EMAIL_SENDER}>`;