import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  MessagesSquare,
  ClipboardCheck,
  Handshake,
  ShieldCheck,
  LoaderCircle,
} from 'lucide-react';
import {
  enquirySchema,
  industries,
  serviceOptions,
  type EnquiryInput,
  type EnquiryFormInput,
} from '../../shared/enquiry';
import { Breadcrumb, PageHero } from '../components/Common';
export function Contact() {
  const [params] = useSearchParams();
  const requested = params.get('service');
  const requestedIndustry = params.get('industry');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<EnquiryFormInput, unknown, EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      phoneNumber: '',
      website: '',
      consentGiven: false,
      industry: industries.includes(requestedIndustry as (typeof industries)[number])
        ? (requestedIndustry as (typeof industries)[number])
        : undefined,
      subject: serviceOptions.includes(requested as (typeof serviceOptions)[number])
        ? `Consultation about ${requested}`
        : '',
      service: serviceOptions.includes(requested as (typeof serviceOptions)[number])
        ? (requested as (typeof serviceOptions)[number])
        : undefined,
    },
  });
  const [failure, setFailure] = useState('');
  const [success, setSuccess] = useState(false);
  const key = useRef<string | null>(null);
  const pending = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const lastPayload = useRef('');
  async function submit(data: EnquiryInput) {
    if (pending.current) return;
    pending.current = true;
    setFailure('');
    const payload = JSON.stringify(data);
    if (payload !== lastPayload.current) {
      key.current = crypto.randomUUID();
      lastPayload.current = payload;
    }
    key.current ??= crypto.randomUUID();
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key.current },
        body: payload,
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.fields) {
          for (const [field, messages] of Object.entries(result.fields))
            setError(field as keyof EnquiryInput, { message: (messages as string[])[0] });
        }
        throw new Error(
          response.status === 429
            ? 'Too many enquiries have been sent. Please wait and try again.'
            : result.message || 'Your enquiry could not be sent. Please try again.',
        );
      }
      setSuccess(true);
      requestAnimationFrame(() => {
        resultRef.current?.focus({ preventScroll: true });
        resultRef.current?.scrollIntoView({ block: 'center' });
      });
    } catch (error) {
      setFailure(
        error instanceof Error && error.name === 'TimeoutError'
          ? 'The request took too long. Please retry; duplicate protection will prevent a second record.'
          : error instanceof TypeError
            ? 'We couldn’t reach the enquiry service. Please check your connection and try again.'
            : error instanceof Error
              ? error.message
              : 'Your enquiry could not be sent. Please try again.',
      );
    } finally {
      pending.current = false;
    }
  }
  const field = (
    name: keyof EnquiryInput,
    label: string,
    options: {
      type?: string;
      placeholder?: string;
      full?: boolean;
      optional?: boolean;
      autoComplete?: string;
    } = {},
  ) => (
    <div className={`form-field ${options.full ? 'field-full' : ''}`}>
      <label htmlFor={name}>
        {label} {options.optional ? <span>(optional)</span> : <span aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        type={options.type || 'text'}
        {...register(name)}
        placeholder={options.placeholder}
        autoComplete={options.autoComplete}
        maxLength={
          name === 'businessEmail'
            ? 255
            : name === 'fullName'
              ? 150
              : name === 'phoneNumber'
                ? 30
                : 200
        }
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <p id={`${name}-error`} className="field-error">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
  return (
    <>
      <Breadcrumb label="Contact" />
      <PageHero
        eyebrow="LET’S START A CONVERSATION"
        image="contact-banner"
        alt="Two business professionals discussing a consulting enquiry"
        title={
          <>
            Your business ambition.
            <br />A wider opportunity.
          </>
        }
        description="Tell us about your business, the market you want to reach, and the kind of global collaboration you have in mind."
      />
      <div className="container contact-layout">
        <aside className="contact-aside">
          <h2>
            A useful partnership
            <br />
            begins with a clear case.
          </h2>
          <p>Whether you have a partner in mind or are still exploring, start with your current business and your goal.</p>
          {[
            {
              icon: MessagesSquare,
              title: 'Share your context',
              text: 'Describe your offering, current market, capacity, and collaboration goal.',
            },
            {
              icon: ClipboardCheck,
              title: 'Review readiness',
              text: 'We’ll discuss the business case, evidence, and any verification or certification needs.',
            },
            {
              icon: Handshake,
              title: 'Plan the next step',
              text: 'If there is a fit, we’ll scope the work before any partner outreach.',
            },
          ].map((s) => (
            <div className="contact-step" key={s.title}>
              <s.icon size={22} />
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
          <div className="contact-privacy">
            <ShieldCheck size={23} />
            <p>
              Your information is used to respond to your enquiry. Please avoid including sensitive
              personal information or confidential business documents.
            </p>
          </div>
        </aside>
        <div className="contact-form">
          {success ? (
            <div ref={resultRef} className="form-success" role="status" tabIndex={-1}>
              <CheckCircle2 size={48} />
              <h2>Your enquiry is with us.</h2>
              <p>
                Thank you for getting in touch. Your enquiry has been securely recorded for our team
                to review.
              </p>
              <button
                className="button button-outline"
                onClick={() => {
                  reset();
                  setSuccess(false);
                  key.current = null;
                  lastPayload.current = '';
                }}
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(submit)} noValidate>
              <div className="form-header">
                <h2>Let’s talk about your collaboration goal.</h2>
                <p>Fields marked with * are required.</p>
              </div>
              {failure && (
                <div className="form-error" role="alert">
                  {failure}
                </div>
              )}
              <div className="form-grid">
                {field('fullName', 'Full name', {
                  placeholder: 'Your full name',
                  autoComplete: 'name',
                })}
                {field('businessEmail', 'Business email', {
                  type: 'email',
                  placeholder: 'you@organization.com',
                  autoComplete: 'email',
                })}
                {field('organization', 'Company / organization', {
                  placeholder: 'Organization name',
                  autoComplete: 'organization',
                })}
                {field('phoneNumber', 'Phone number', {
                  type: 'tel',
                  placeholder: 'Include country code',
                  optional: true,
                  autoComplete: 'tel',
                })}
                <div className="form-field">
                  <label htmlFor="industry">
                    Industry <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="industry"
                    {...register('industry')}
                    aria-invalid={!!errors.industry}
                    aria-describedby={errors.industry ? 'industry-error' : undefined}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your industry
                    </option>
                    {industries.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                  {errors.industry && (
                    <p id="industry-error" className="field-error">
                      {errors.industry.message}
                    </p>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="service">
                    Consulting focus <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="service"
                    {...register('service')}
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? 'service-error' : undefined}
                    defaultValue={requested || ''}
                  >
                    <option value="" disabled>
                      Select a focus
                    </option>
                    {serviceOptions.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <p id="service-error" className="field-error">
                      {errors.service.message}
                    </p>
                  )}
                </div>
                {field('subject', 'Subject', {
                  placeholder: 'What would you like to discuss?',
                  full: true,
                })}
                <div className="form-field field-full">
                  <label htmlFor="message">
                    Your business requirements <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    placeholder="Tell us what your business offers, the market you want to reach, and the partner or support you’re looking for…"
                    rows={5}
                    maxLength={10000}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : 'message-help'}
                  />
                  <p id="message-help" className="sr-only">
                    At least 20 characters. Please do not include sensitive personal or confidential
                    information.
                  </p>
                  {errors.message && (
                    <p id="message-error" className="field-error">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
              </div>
              <label className="consent-field">
                <input
                  type="checkbox"
                  {...register('consentGiven')}
                  aria-invalid={!!errors.consentGiven}
                  aria-describedby={errors.consentGiven ? 'consent-error' : undefined}
                />
                <span>
                  I agree that LinkqGlobal Consulting may use the information I provide to respond
                  to this enquiry, as described in the{' '}
                  <Link to="/privacy-policy">Privacy Policy</Link>.
                </span>
              </label>
              {errors.consentGiven && (
                <p className="field-error" id="consent-error" style={{ marginBottom: 20 }}>
                  {errors.consentGiven.message}
                </p>
              )}
              <div className="form-submit">
                <button type="submit" className="button" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="loading-spinner" size={16} /> &nbsp; Sending enquiry…
                    </>
                  ) : (
                    'Send your enquiry'
                  )}
                </button>
                <span>A thoughtful next step starts here.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
