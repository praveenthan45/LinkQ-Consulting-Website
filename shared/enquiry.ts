import { z } from 'zod';
export const industries = [
  'Information Technology',
  'Manufacturing',
  'FMCG',
  'Education',
  'Technology & Automation',
  'Investment & Real Estate',
  'Business Strategy',
  'Other',
] as const;
export const serviceOptions = [
  'IT Consulting',
  'Manufacturing Consulting',
  'FMCG Consulting',
  'Education Consulting',
  'Technology & Automation Consulting',
  'Business Strategy Consulting',
  'Data Analytics & AI Consulting',
  'Supply Chain & Operations Consulting',
  'General Business Enquiry',
  'Collaboration Consulting',
] as const;
const clean = (min: number, max: number, label: string) =>
  z
    .string()
    .trim()
    .min(min, `${label} must contain at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`)
    .refine(
      // Intentionally reject control characters while allowing tab/newline in requirements.
      // eslint-disable-next-line no-control-regex
      (v) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(v),
      'Please remove unsupported control characters.',
    );
export const enquirySchema = z
  .object({
    fullName: clean(2, 150, 'Name'),
    businessEmail: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email('Enter a valid business email.').max(255)),
    phoneNumber: z
      .string()
      .trim()
      .max(30)
      .refine((v) => !v || /^[+\d\s().-]{5,30}$/.test(v), 'Enter a valid phone number.')
      .default(''),
    organization: clean(2, 200, 'Organization'),
    industry: z.enum(industries, { error: 'Select an industry.' }),
    service: z.enum(serviceOptions, { error: 'Select a consulting service.' }),
    subject: clean(3, 200, 'Subject'),
    message: clean(20, 10000, 'Requirements'),
    consentGiven: z.boolean().refine((v) => v, 'Please agree before sending your enquiry.'),
    website: z.string().max(0, 'Submission could not be accepted.').default(''),
  })
  .strict();
export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryFormInput = z.input<typeof enquirySchema>;
