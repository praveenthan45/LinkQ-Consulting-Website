import { z } from 'zod';

export const industries = [
  'Manufacturing & Industrial',
  'FMCG & Consumer Goods',
  'Information Technology & Technology',
  'Education',
  'Retail & Commerce',
  'Logistics & Distribution',
  'Investment & Real Estate',
  'Other',
] as const;

export const serviceOptions = [
  'IT Consulting',
  'Manufacturing Consulting',
  'FMCG Consulting',
  'Education Consulting',
  'Technology & Automation',
  'Data Analytics & AI',
  'Supply Chain & Operations',
  'Business Strategy',
  'General Business Inquiry',
  'Collaboration Consulting',
] as const;

export const collaborationObjectives = [
  'International Partner Search',
  'Global Buyer / Supplier Connection',
  'Market Entry & Expansion',
  'Distribution / Dealership Partnership',
  'Manufacturing / Production Partnership',
  'Strategic Alliance / Joint Venture',
  'Technology Partnership',
  'Verification & Certification Support',
  'Tie-up & Delivery Coordination',
  'Other',
] as const;

export const partnerTypes = [
  'Buyer',
  'Supplier',
  'Manufacturer',
  'Distributor',
  'Dealer',
  'Technology Partner',
  'Investor',
  'Joint Venture Partner',
  'Strategic Business Partner',
  'Other',
  'Not Sure Yet',
] as const;

export const COLLABORATION_SERVICE = 'Collaboration Consulting' as const;
export const MESSAGE_MIN_LENGTH = 20;
export const MESSAGE_MAX_LENGTH = 3000;

// eslint-disable-next-line no-control-regex
const hasUnsupportedControlChars = (value: string) => /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value);

// eslint-disable-next-line no-control-regex
const hasLineBreakOrControl = (value: string) => /[\u0000-\u001F\u007F]/.test(value);

const cleanSingleLine = (min: number, max: number, label: string) =>
  z
    .string()
    .trim()
    .min(min, `${label} must contain at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`)
    .refine((value) => !hasLineBreakOrControl(value), 'Please remove unsupported control characters.');

const cleanMultiline = (min: number, max: number, label: string) =>
  z
    .string()
    .trim()
    .min(min, `${label} must contain at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`)
    .refine(
      // Allow newlines and tabs inside multi-line business requirements while blocking unsafe controls.
      (value) => !hasUnsupportedControlChars(value),
      'Please remove unsupported control characters.',
    );

const optionalSingleLine = (max: number, label: string) =>
  z
    .string()
    .nullish()
    .transform((value) => (value ?? '').trim())
    .refine((value) => value.length <= max, `${label} must be ${max} characters or fewer.`)
    .refine(
      (value) => !value || !hasLineBreakOrControl(value),
      'Please remove unsupported control characters.',
    );

export function isValidInternationalPhone(value: string): boolean {
  if (!value) return true;
  if (!/^[+]?[0-9\s().-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export const enquirySchema = z
  .object({
    fullName: cleanSingleLine(2, 150, 'Full name'),
    businessEmail: z
      .string()
      .trim()
      .toLowerCase()
      .refine((value) => !hasLineBreakOrControl(value), 'Enter a valid business email.')
      .pipe(z.email('Enter a valid business email.').max(255)),
    phoneNumber: z
      .string()
      .nullish()
      .transform((value) => (value ?? '').trim())
      .refine((value) => value.length <= 30, 'Phone number must be 30 characters or fewer.')
      .refine(isValidInternationalPhone, 'Enter a valid phone number including country code.'),
    organization: cleanSingleLine(2, 200, 'Company / Organization'),
    industry: z.enum(industries, { error: 'Select your industry.' }),
    industryOther: optionalSingleLine(150, 'Industry specification'),
    service: z.enum(serviceOptions, { error: 'Select a consulting area.' }),
    collaborationObjective: z
      .union([z.literal(''), z.enum(collaborationObjectives)])
      .nullish()
      .transform((value) => value ?? ''),
    collaborationObjectiveOther: optionalSingleLine(150, 'Collaboration objective specification'),
    targetCountryRegion: optionalSingleLine(200, 'Target country or region'),
    partnerType: z
      .union([z.literal(''), z.enum(partnerTypes)])
      .nullish()
      .transform((value) => value ?? ''),
    partnerTypeOther: optionalSingleLine(150, 'Partner type specification'),
    subject: cleanSingleLine(3, 200, 'Subject'),
    message: cleanMultiline(MESSAGE_MIN_LENGTH, MESSAGE_MAX_LENGTH, 'Business requirements'),
    consentGiven: z.boolean().refine((value) => value, 'Please agree before submitting your inquiry.'),
    website: z
      .string()
      .nullish()
      .transform((value) => value ?? '')
      .refine((value) => value.length === 0, 'Submission could not be accepted.'),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.industry === 'Other') {
      if (data.industryOther.length === 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['industryOther'],
          message: 'Please specify your industry.',
        });
      } else if (data.industryOther.length < 2) {
        ctx.addIssue({
          code: 'custom',
          path: ['industryOther'],
          message: 'Industry specification must contain at least 2 characters.',
        });
      }
    }

    if (data.service === COLLABORATION_SERVICE) {
      if (!data.collaborationObjective) {
        ctx.addIssue({
          code: 'custom',
          path: ['collaborationObjective'],
          message: 'Select your collaboration objective.',
        });
      } else if (data.collaborationObjective === 'Other') {
        if (data.collaborationObjectiveOther.length === 0) {
          ctx.addIssue({
            code: 'custom',
            path: ['collaborationObjectiveOther'],
            message: 'Please specify your collaboration objective.',
          });
        } else if (data.collaborationObjectiveOther.length < 2) {
          ctx.addIssue({
            code: 'custom',
            path: ['collaborationObjectiveOther'],
            message: 'Collaboration objective must contain at least 2 characters.',
          });
        }
      }

      if (data.partnerType === 'Other' && data.partnerTypeOther.length === 1) {
        ctx.addIssue({
          code: 'custom',
          path: ['partnerTypeOther'],
          message: 'Partner type specification must contain at least 2 characters.',
        });
      }
    }
  })
  .transform((data) => {
    const isCollaboration = data.service === COLLABORATION_SERVICE;
    return {
      ...data,
      industryOther: data.industry === 'Other' ? data.industryOther : '',
      collaborationObjective: isCollaboration ? data.collaborationObjective : '',
      collaborationObjectiveOther:
        isCollaboration && data.collaborationObjective === 'Other'
          ? data.collaborationObjectiveOther
          : '',
      targetCountryRegion: isCollaboration ? data.targetCountryRegion : '',
      partnerType: isCollaboration ? data.partnerType : '',
      partnerTypeOther:
        isCollaboration && data.partnerType === 'Other' ? data.partnerTypeOther : '',
    };
  });

export type EnquiryInput = z.output<typeof enquirySchema>;
export type EnquiryFormInput = z.input<typeof enquirySchema>;
