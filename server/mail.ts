import nodemailer from 'nodemailer';
import type { Enquiry } from '@prisma/client';
import { COLLABORATION_SERVICE } from '../shared/enquiry.js';

export const emailConfigured = () =>
  !!(process.env.SMTP_HOST && process.env.MAIL_FROM && process.env.ENQUIRY_TO);

const safeLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

export async function sendNotification(enquiry: Enquiry) {
  if (!emailConfigured()) return;

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

  const reference = enquiry.referenceNumber || enquiry.id;
  const industryDisplay =
    enquiry.industry === 'Other' && enquiry.industryOther
      ? `Other — ${enquiry.industryOther}`
      : enquiry.industry;

  const lines = [
    `Reference number: ${reference}`,
    `Full name: ${enquiry.fullName}`,
    `Organization: ${enquiry.organization}`,
    `Business email: ${enquiry.businessEmail}`,
    `Phone number: ${enquiry.phoneNumber || 'Not provided'}`,
    `Industry: ${industryDisplay}`,
    `Consulting focus: ${enquiry.service}`,
  ];

  if (enquiry.service === COLLABORATION_SERVICE) {
    const objectiveDisplay =
      enquiry.collaborationObjective === 'Other' && enquiry.collaborationObjectiveOther
        ? `Other — ${enquiry.collaborationObjectiveOther}`
        : enquiry.collaborationObjective || 'Not provided';
    const partnerDisplay =
      enquiry.partnerType === 'Other' && enquiry.partnerTypeOther
        ? `Other — ${enquiry.partnerTypeOther}`
        : enquiry.partnerType || 'Not specified';

    lines.push(
      `Collaboration objective: ${objectiveDisplay}`,
      `Target country / region: ${enquiry.targetCountryRegion || 'Not specified'}`,
      `Partner type: ${partnerDisplay}`,
    );
  }

  lines.push(`Subject: ${enquiry.subject}`, '', 'Business requirements:', enquiry.message);

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.ENQUIRY_TO,
    replyTo: safeLine(enquiry.businessEmail),
    subject: safeLine(`New LinkqGlobal inquiry [${reference}]: ${enquiry.service}`),
    text: lines.join('\n'),
  });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: safeLine(enquiry.businessEmail),
      replyTo: process.env.ENQUIRY_TO,
      subject: safeLine(`Inquiry received — LinkqGlobal Consulting (${reference})`),
      text: [
        `Dear ${enquiry.fullName},`,
        '',
        'Thank you for reaching out to LinkqGlobal Consulting.',
        'Your inquiry has been successfully submitted. Our team will review your requirements and contact you regarding the next steps.',
        '',
        `Reference number: ${reference}`,
        `Consulting focus: ${enquiry.service}`,
        `Subject: ${enquiry.subject}`,
        '',
        'Regards,',
        'LinkqGlobal Consulting',
      ].join('\n'),
    });
  } catch {
    console.warn('enquiry_client_ack_failed');
  }
}
