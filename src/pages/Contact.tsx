import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
  Controller,
  useForm,
  useWatch,
  type Control,
  type DefaultValues,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Handshake,
  LoaderCircle,
  MessagesSquare,
  ShieldCheck,
} from 'lucide-react';
import {
  COLLABORATION_SERVICE,
  MESSAGE_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  collaborationObjectives,
  enquirySchema,
  industries,
  partnerTypes,
  serviceOptions,
  type EnquiryFormInput,
  type EnquiryInput,
} from '../../shared/enquiry';
import { Breadcrumb, PageHero } from '../components/Common';

type IndustryOption = (typeof industries)[number];
type ServiceOption = (typeof serviceOptions)[number];

const DRAFT_STORAGE_KEY = 'linkq_contact_form_draft_v1';

interface SavedContactDraft {
  values: Omit<EnquiryFormInput, 'website'>;
  search: string;
}

const LEGACY_INDUSTRY_MAP: Record<string, IndustryOption> = {
  'Information Technology': 'Information Technology & Technology',
  Manufacturing: 'Manufacturing & Industrial',
  FMCG: 'FMCG & Consumer Goods',
};

const LEGACY_SERVICE_MAP: Record<string, ServiceOption> = {
  'Technology & Automation Consulting': 'Technology & Automation',
  'Data Analytics & AI Consulting': 'Data Analytics & AI',
  'Supply Chain & Operations Consulting': 'Supply Chain & Operations',
  'Business Strategy Consulting': 'Business Strategy',
  'General Business Enquiry': 'General Business Inquiry',
};

function resolveInitialIndustry(value: string | null): IndustryOption | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (industries.includes(trimmed as IndustryOption)) return trimmed as IndustryOption;
  return LEGACY_INDUSTRY_MAP[trimmed];
}

function resolveInitialService(
  serviceParam: string | null,
  industryParam: string | null,
): ServiceOption | undefined {
  if (serviceParam) {
    const trimmed = serviceParam.trim();
    if (serviceOptions.includes(trimmed as ServiceOption)) return trimmed as ServiceOption;
    if (trimmed in LEGACY_SERVICE_MAP) return LEGACY_SERVICE_MAP[trimmed];
  }
  if (industryParam?.trim() === 'Business Strategy') {
    return 'Business Strategy';
  }
  return undefined;
}

function getRequirementsPlaceholder(selectedService?: string): string {
  if (selectedService === COLLABORATION_SERVICE) {
    return "Tell us about your business, the market or country you want to reach, your collaboration goal, and the partner or business opportunity you're looking for.";
  }
  if (selectedService) {
    return "Describe your business challenge, objectives, current situation, and the consulting support you're looking for.";
  }
  return "Tell us about your business, your goals, the market you want to reach, and the support you're looking for.";
}

function readContactDraft(): SavedContactDraft | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedContactDraft>;
    if (!parsed || typeof parsed !== 'object' || !parsed.values || typeof parsed.values !== 'object') {
      return null;
    }
    return {
      values: parsed.values,
      search: typeof parsed.search === 'string' ? parsed.search : '',
    };
  } catch {
    return null;
  }
}

function writeContactDraft(draft: SavedContactDraft) {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Ignore storage quota or restricted-mode errors without interrupting the visitor.
  }
}

function clearContactDraft() {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // Ignore restricted-mode errors cleanly.
  }
}

interface FormSelectProps {
  id: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  value?: string | null;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  optional?: boolean;
  allowEmpty?: boolean;
  full?: boolean;
}

function FormSelect({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  onBlur,
  error,
  optional = false,
  allowEmpty = false,
  full = false,
}: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const currentValue = value || '';
  const items = allowEmpty
    ? [{ value: '', label: placeholder }, ...options.map((item) => ({ value: item, label: item }))]
    : options.map((item) => ({ value: item, label: item }));

  useEffect(() => {
    if (!open) return;
    function handleOutsidePointer(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', handleOutsidePointer);
    return () => document.removeEventListener('pointerdown', handleOutsidePointer);
  }, [open]);

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const optionEl = listRef.current?.children.item(activeIndex) as HTMLElement | null;
    optionEl?.scrollIntoView?.({ block: 'nearest' });
  }, [open, activeIndex]);

  function openMenu() {
    const selectedIndex = items.findIndex((item) => item.value === currentValue);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function selectValue(nextValue: string) {
    onChange(nextValue);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) {
        openMenu();
      } else {
        setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
      }
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        openMenu();
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
      return;
    }
    if (event.key === 'Home' && open) {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (event.key === 'End' && open) {
      event.preventDefault();
      setActiveIndex(items.length - 1);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!open) {
        openMenu();
      } else if (activeIndex >= 0 && items[activeIndex]) {
        selectValue(items[activeIndex].value);
      }
      return;
    }
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key === 'Tab' && open) {
      setOpen(false);
      return;
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const char = event.key.toLowerCase();
      const start = open && activeIndex >= 0 ? activeIndex + 1 : 0;
      const matchAfter = items.findIndex(
        (item, idx) => idx >= start && item.label.toLowerCase().startsWith(char),
      );
      const match =
        matchAfter >= 0
          ? matchAfter
          : items.findIndex((item) => item.label.toLowerCase().startsWith(char));
      if (match >= 0) {
        setActiveIndex(match);
        if (!open) {
          onChange(items[match].value);
        }
      }
    }
  }

  const labelId = `${id}-label`;
  const listboxId = `${id}-listbox`;

  return (
    <div ref={wrapperRef} className={`form-field ${full ? 'field-full' : ''}`}>
      <label id={labelId} htmlFor={id}>
        {label} {optional ? <span>(optional)</span> : <span aria-hidden="true">*</span>}
      </label>
      <div className="custom-select">
        <button
          ref={triggerRef}
          id={id}
          type="button"
          role="combobox"
          aria-labelledby={labelId}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={open && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`select-trigger ${open ? 'is-open' : ''}`}
          onClick={() => {
            if (open) setOpen(false);
            else openMenu();
          }}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
        >
          <span className={currentValue ? 'select-value' : 'select-placeholder'}>
            {currentValue || placeholder}
          </span>
          <ChevronDown
            size={17}
            className={`select-chevron ${open ? 'is-open' : ''}`}
            aria-hidden="true"
          />
        </button>
        {open && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            className="select-menu"
          >
            {items.map((item, idx) => {
              const selected = currentValue === item.value;
              const highlighted = idx === activeIndex;
              return (
                <li
                  key={item.value || '__empty__'}
                  id={`${id}-option-${idx}`}
                  role="option"
                  aria-selected={selected}
                  className={[
                    'select-option',
                    selected ? 'is-selected' : '',
                    highlighted ? 'is-highlighted' : '',
                    !item.value ? 'is-empty' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectValue(item.value)}
                >
                  <span>{item.label}</span>
                  {selected && item.value && <Check size={15} aria-hidden="true" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

function RequirementsCounter({ control }: { control: Control<EnquiryFormInput> }) {
  const value = useWatch({ control, name: 'message' }) ?? '';
  return (
    <span
      className={
        value.length >= MESSAGE_MAX_LENGTH - 100 ? 'char-count char-count-near' : 'char-count'
      }
    >
      {value.length} / {MESSAGE_MAX_LENGTH}
    </span>
  );
}

export function Contact() {
  const location = useLocation();
  const [params] = useSearchParams();
  const requestedService = params.get('service');
  const requestedIndustry = params.get('industry');
  const requestedSubject = params.get('subject')?.trim().slice(0, 200);

  const [initialDefaults] = useState<DefaultValues<EnquiryFormInput>>(() => {
    const initialIndustry = resolveInitialIndustry(requestedIndustry);
    const initialService = resolveInitialService(requestedService, requestedIndustry);
    const saved = readContactDraft();
    const shouldRestoreDraft = Boolean(
      saved && (saved.search === location.search || (!requestedService && !requestedIndustry)),
    );

    if (shouldRestoreDraft && saved) {
      return {
        fullName: saved.values.fullName ?? '',
        businessEmail: saved.values.businessEmail ?? '',
        organization: saved.values.organization ?? '',
        phoneNumber: saved.values.phoneNumber ?? '',
        industry: saved.values.industry,
        industryOther: saved.values.industryOther ?? '',
        service: saved.values.service,
        collaborationObjective: saved.values.collaborationObjective ?? '',
        collaborationObjectiveOther: saved.values.collaborationObjectiveOther ?? '',
        targetCountryRegion: saved.values.targetCountryRegion ?? '',
        partnerType: saved.values.partnerType ?? '',
        partnerTypeOther: saved.values.partnerTypeOther ?? '',
        subject: saved.values.subject ?? '',
        message: saved.values.message ?? '',
        consentGiven: Boolean(saved.values.consentGiven),
        website: '',
      };
    }

    return {
      fullName: '',
      businessEmail: '',
      organization: '',
      phoneNumber: '',
      industry: initialIndustry,
      industryOther: '',
      service: initialService,
      collaborationObjective: '',
      collaborationObjectiveOther: '',
      targetCountryRegion: '',
      partnerType: '',
      partnerTypeOther: '',
      subject: requestedSubject || (initialService ? `Consultation about ${initialService}` : ''),
      message: '',
      consentGiven: false,
      website: '',
    };
  });

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormInput, unknown, EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: initialDefaults,
  });

  const [selectedIndustry, selectedService, selectedObjective, selectedPartnerType] = useWatch({
    control,
    name: ['industry', 'service', 'collaborationObjective', 'partnerType'],
  });

  const isCollaboration = selectedService === COLLABORATION_SERVICE;
  const [failure, setFailure] = useState('');
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const key = useRef<string | null>(null);
  const pending = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const lastPayload = useRef('');

  function saveDraftSnapshot() {
    if (success) return;
    const { website: _honeypot, ...rest } = getValues();
    writeContactDraft({
      values: rest,
      search: location.search,
    });
  }

  useEffect(() => {
    const subscription = watch((values) => {
      if (success) return;
      const { website: _honeypot, ...rest } = values;
      writeContactDraft({
        values: rest as Omit<EnquiryFormInput, 'website'>,
        search: location.search,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, success, location.search]);

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
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        referenceNumber?: string;
        fields?: Record<string, string[]>;
      };
      if (!response.ok) {
        if (result.fields) {
          for (const [fieldName, messages] of Object.entries(result.fields)) {
            if (messages?.[0]) {
              setError(fieldName as keyof EnquiryFormInput, { message: messages[0] });
            }
          }
        }
        throw new Error(
          response.status === 429
            ? 'Too many inquiries have been sent. Please wait and try again.'
            : result.message || 'Your inquiry could not be submitted. Please try again.',
        );
      }
      clearContactDraft();
      setReferenceNumber(result.referenceNumber || null);
      setSuccess(true);
      requestAnimationFrame(() => {
        resultRef.current?.focus({ preventScroll: true });
        resultRef.current?.scrollIntoView({ block: 'center' });
      });
    } catch (error) {
      setFailure(
        error instanceof Error && error.name === 'TimeoutError'
          ? 'The request took too long. Your details are preserved — please retry.'
          : error instanceof TypeError
            ? 'We could not reach the inquiry service. Please check your connection and try again.'
            : error instanceof Error
              ? error.message
              : 'Your inquiry could not be submitted. Please try again.',
      );
    } finally {
      pending.current = false;
    }
  }

  const renderTextField = (
    name: keyof EnquiryFormInput,
    label: string,
    options: {
      type?: string;
      placeholder?: string;
      full?: boolean;
      optional?: boolean;
      autoComplete?: string;
      maxLength?: number;
    } = {},
  ) => {
    const fieldError = errors[name];
    return (
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
          maxLength={options.maxLength ?? 200}
          aria-invalid={!!fieldError}
          aria-describedby={fieldError ? `${name}-error` : undefined}
        />
        {fieldError && (
          <p id={`${name}-error`} className="field-error">
            {fieldError.message}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <PageHero
        edgeBreadcrumb={<Breadcrumb label="Contact" />}
        eyebrow="LET’S START A CONVERSATION"
        image="contact-banner"
        alt="Two business professionals discussing a consulting enquiry"
        title={
          <>
            Your business ambition.
            <br />A wider opportunity.
          </>
        }
        description="Tell us about your business, your consulting priorities, or the global collaboration you have in mind."
      />
      <div className="container contact-layout">
        <aside className="contact-aside">
          <h2>
            A useful partnership
            <br />
            begins with a clear case.
          </h2>
          <p>
            Whether you need focused advisory support or are exploring an international partnership,
            share your current priorities and goals.
          </p>
          {[
            {
              icon: MessagesSquare,
              title: 'Share your context',
              text: 'Outline your business scope, industry focus, and key operational or market priorities.',
            },
            {
              icon: ClipboardCheck,
              title: 'Review readiness',
              text: 'We evaluate fit, technical requirements, and any verification or partnership groundwork needed.',
            },
            {
              icon: Handshake,
              title: 'Plan the next step',
              text: 'Our consulting team responds with a structured recommendation tailored to your goals.',
            },
          ].map((step) => (
            <div className="contact-step" key={step.title}>
              <step.icon size={22} />
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
          <div className="contact-privacy">
            <ShieldCheck size={23} />
            <p>
              Your information is used solely to respond to your inquiry. Please avoid including
              sensitive personal identifiers or confidential documents.
            </p>
          </div>
        </aside>

        <div className="contact-form">
          {success ? (
            <div ref={resultRef} className="form-success" role="status" tabIndex={-1}>
              <CheckCircle2 size={48} />
              <h2>Thank you for reaching out.</h2>
              <p>
                Your inquiry has been successfully submitted. Our team will review your requirements
                and contact you regarding the next steps.
              </p>
              {referenceNumber && (
                <p className="form-reference">
                  Reference number: <strong>{referenceNumber}</strong>
                </p>
              )}
              <div className="form-success-actions">
                <Link to="/" className="button">
                  Return to website
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(submit)} noValidate>
              <div className="form-header">
                <h2>Let's talk about your business goals.</h2>
                <p>Fields marked with * are required.</p>
              </div>
              {failure && (
                <div className="form-error" role="alert">
                  {failure}
                </div>
              )}
              <div className="form-grid">
                {renderTextField('fullName', 'Full Name', {
                  placeholder: 'Your full name',
                  autoComplete: 'name',
                  maxLength: 150,
                })}
                {renderTextField('businessEmail', 'Business Email', {
                  type: 'email',
                  placeholder: 'you@organization.com',
                  autoComplete: 'email',
                  maxLength: 255,
                })}
                {renderTextField('organization', 'Company / Organization', {
                  placeholder: 'Organization name',
                  autoComplete: 'organization',
                  maxLength: 200,
                })}
                {renderTextField('phoneNumber', 'Phone Number', {
                  type: 'tel',
                  placeholder: 'Include country code',
                  optional: true,
                  autoComplete: 'tel',
                  maxLength: 30,
                })}

                <Controller
                  control={control}
                  name="industry"
                  render={({ field }) => (
                    <FormSelect
                      id="industry"
                      label="Industry"
                      placeholder="Select your industry"
                      options={industries}
                      value={field.value}
                      onBlur={field.onBlur}
                      error={errors.industry?.message}
                      onChange={(val) => {
                        field.onChange(val);
                        if (val !== 'Other') {
                          setValue('industryOther', '', {
                            shouldValidate: false,
                            shouldDirty: false,
                          });
                          clearErrors('industryOther');
                        }
                      }}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="service"
                  render={({ field }) => (
                    <FormSelect
                      id="service"
                      label="Consulting Focus"
                      placeholder="Select a consulting area"
                      options={serviceOptions}
                      value={field.value}
                      onBlur={field.onBlur}
                      error={errors.service?.message}
                      onChange={(val) => {
                        field.onChange(val);
                        if (val !== COLLABORATION_SERVICE) {
                          setValue('collaborationObjective', '', {
                            shouldValidate: false,
                            shouldDirty: false,
                          });
                          setValue('collaborationObjectiveOther', '', {
                            shouldValidate: false,
                            shouldDirty: false,
                          });
                          setValue('targetCountryRegion', '', {
                            shouldValidate: false,
                            shouldDirty: false,
                          });
                          setValue('partnerType', '', {
                            shouldValidate: false,
                            shouldDirty: false,
                          });
                          setValue('partnerTypeOther', '', {
                            shouldValidate: false,
                            shouldDirty: false,
                          });
                          clearErrors([
                            'collaborationObjective',
                            'collaborationObjectiveOther',
                            'targetCountryRegion',
                            'partnerType',
                            'partnerTypeOther',
                          ]);
                        }
                      }}
                    />
                  )}
                />

                {selectedIndustry === 'Other' &&
                  renderTextField('industryOther', 'Specify your industry', {
                    placeholder: 'Enter your industry',
                    full: true,
                    maxLength: 150,
                  })}

                {isCollaboration && (
                  <fieldset className="collaboration-fieldset field-full">
                    <legend className="collaboration-legend">Collaboration Details</legend>
                    <div className="collaboration-grid">
                      <Controller
                        control={control}
                        name="collaborationObjective"
                        render={({ field }) => (
                          <FormSelect
                            id="collaborationObjective"
                            label="Collaboration Objective"
                            placeholder="Select your collaboration objective"
                            options={collaborationObjectives}
                            value={field.value}
                            onBlur={field.onBlur}
                            error={errors.collaborationObjective?.message}
                            full
                            onChange={(val) => {
                              field.onChange(val);
                              if (val !== 'Other') {
                                setValue('collaborationObjectiveOther', '', {
                                  shouldValidate: false,
                                  shouldDirty: false,
                                });
                                clearErrors('collaborationObjectiveOther');
                              }
                            }}
                          />
                        )}
                      />

                      {selectedObjective === 'Other' &&
                        renderTextField(
                          'collaborationObjectiveOther',
                          'Specify collaboration objective',
                          {
                            placeholder: 'Enter your collaboration objective',
                            full: true,
                            maxLength: 150,
                          },
                        )}

                      {renderTextField('targetCountryRegion', 'Target Country / Region', {
                        placeholder: 'Which country or region are you interested in?',
                        optional: true,
                        maxLength: 200,
                      })}

                      <Controller
                        control={control}
                        name="partnerType"
                        render={({ field }) => (
                          <FormSelect
                            id="partnerType"
                            label="Partner Type"
                            placeholder="Select the type of partner you are looking for"
                            options={partnerTypes}
                            value={field.value}
                            onBlur={field.onBlur}
                            error={errors.partnerType?.message}
                            optional
                            allowEmpty
                            onChange={(val) => {
                              field.onChange(val);
                              if (val !== 'Other') {
                                setValue('partnerTypeOther', '', {
                                  shouldValidate: false,
                                  shouldDirty: false,
                                });
                                clearErrors('partnerTypeOther');
                              }
                            }}
                          />
                        )}
                      />

                      {selectedPartnerType === 'Other' &&
                        renderTextField('partnerTypeOther', 'Specify partner type', {
                          placeholder: 'Enter the type of partner you are looking for',
                          optional: true,
                          full: true,
                          maxLength: 150,
                        })}
                    </div>
                  </fieldset>
                )}

                {renderTextField('subject', 'Subject', {
                  placeholder: 'Briefly describe your inquiry',
                  full: true,
                  maxLength: 200,
                })}

                <div className="form-field field-full">
                  <label htmlFor="message">
                    Your Business Requirements <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    placeholder={getRequirementsPlaceholder(selectedService)}
                    rows={5}
                    maxLength={MESSAGE_MAX_LENGTH}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error message-help' : 'message-help'}
                  />
                  <div id="message-help" className="field-meta">
                    <span>Minimum {MESSAGE_MIN_LENGTH} characters.</span>
                    <RequirementsCounter control={control} />
                  </div>
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
                  I agree that LinkqGlobal Consulting may use the information I provide to respond to
                  this inquiry, as described in the{' '}
                  <Link to="/privacy-policy" onClick={saveDraftSnapshot}>
                    Privacy Policy
                  </Link>
                  .
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
                      <LoaderCircle className="loading-spinner" size={16} /> &nbsp; Submitting inquiry…
                    </>
                  ) : (
                    'Submit Inquiry'
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
