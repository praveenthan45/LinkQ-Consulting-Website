import nodemailer from 'nodemailer';
import type { Enquiry } from '@prisma/client';
export const emailConfigured = () =>
  !!(process.env.SMTP_HOST && process.env.MAIL_FROM && process.env.ENQUIRY_TO);
export async function sendNotification(enquiry: Enquiry) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
      : undefined,
    connectionTimeout: 10000,
    socketTimeout: 10000,
    requireTLS: process.env.SMTP_SECURE !== 'true',
  });
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.ENQUIRY_TO,
    replyTo: enquiry.businessEmail,
    subject: 'New LinkqGlobal website enquiry',
    text: [
      `Enquiry reference: ${enquiry.id}`,
      `Name: ${enquiry.fullName}`,
      `Organization: ${enquiry.organization}`,
      `Business email: ${enquiry.businessEmail}`,
      `Phone: ${enquiry.phoneNumber || 'Not provided'}`,
      `Industry: ${enquiry.industry}`,
      `Service: ${enquiry.service}`,
      `Subject: ${enquiry.subject}`,
      '',
      enquiry.message,
    ].join('\n'),
  });
}
