import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, PageHero } from '../components/Common';
const policies = {
  '/privacy-policy': {
    name: 'Privacy policy',
    description: 'How information submitted through this website is handled.',
    image: 'data-center',
    imageAlt: 'Secure data storage and network infrastructure',
    sections: [
      [
        'Information you provide',
        'The enquiry form collects your full name, business email, organization, industry, requested service, subject, and business requirements. A phone number is optional. The form also records your explicit consent and the time of submission. Please avoid submitting sensitive personal information or confidential documents.',
      ],
      [
        'Why information is used',
        'Information is used to review your enquiry, respond to you, understand the support requested, and manage related business discussions. Submitting an enquiry does not add you to a marketing mailing list.',
      ],
      [
        'Storage and service providers',
        'Enquiries are stored in a PostgreSQL database operated for this website. If internal email notifications are configured, the enquiry is also sent through the configured email provider to the designated business recipient. Hosting and email providers process data as needed to supply those services. The business must confirm these providers and their processing locations before launch.',
      ],
      [
        'Technical information and abuse prevention',
        'The application applies request limits and uses a short-lived, cryptographically keyed hash of the network address to count requests in memory. It does not write plaintext IP addresses to enquiry records. Hosting infrastructure may maintain separate security and access logs; its configuration and retention must be confirmed before launch.',
      ],
      [
        'Retention and access',
        'Access to enquiries should be limited to people who need the information to handle the request. The business must approve a retention period and a deletion process before launch. Data should not be retained longer than needed for the enquiry, subsequent engagement, or applicable obligations.',
      ],
      [
        'Your choices and requests',
        'You may ask about the information you submitted or request that it be corrected or deleted, subject to applicable obligations. Use the contact form to identify your request without including unnecessary personal information. The business must add an approved privacy contact before public launch.',
      ],
      [
        'Cookies and external resources',
        'This implementation does not install analytics, advertising, or tracking cookies. Fonts and photographs are served locally. The cookie policy describes the current implementation.',
      ],
      [
        'Changes to this notice',
        'The notice should be reviewed when data collection, service providers, or website functionality changes. The version date is 23 November 2026.',
      ],
    ],
  },
  '/terms-of-use': {
    name: 'Terms of use',
    description: 'The basis for using this website and its educational content.',
    image: 'terms-banner',
    imageAlt: 'Professional reviewing written terms and documents',
    sections: [
      [
        'Using the website',
        'This website introduces LinkqGlobal Consulting and provides general information about consulting capabilities. Use it for lawful purposes and do not attempt to disrupt the site, bypass its protections, or gain unauthorized access.',
      ],
      [
        'General information',
        'Content and insights are educational and do not constitute advice tailored to your organization. Business decisions should be based on an assessment of your circumstances and, where appropriate, specialist professional advice.',
      ],
      [
        'Consulting engagements',
        'Sending an enquiry does not create a consulting engagement or an obligation to provide services. Scope, responsibilities, deliverables, timing, fees, confidentiality, and other commercial terms must be agreed separately in writing. No particular business outcome is guaranteed.',
      ],
      [
        'Content and third-party materials',
        'Website content and branding must be used with respect for applicable intellectual property rights. Some photographs, fonts, and interface components are supplied under third-party licenses. Those licenses continue to govern the relevant materials.',
      ],
      [
        'Availability and accuracy',
        'Reasonable care should be taken to maintain useful and accurate information, but content may change. The site may be unavailable during maintenance or technical interruptions. Report material errors through the contact form.',
      ],
      [
        'Information submitted',
        'Provide accurate contact information and only share information you are authorized to disclose. Do not submit confidential business documents, sensitive personal data, malicious content, or material that infringes another person’s rights.',
      ],
      [
        'Legal terms to be finalized',
        'The business must approve its legal entity details, governing law, dispute process, and appropriate liability terms before public launch. This draft does not assert a jurisdiction or override applicable legal rights.',
      ],
    ],
  },
  '/cookie-policy': {
    name: 'Cookie policy',
    description: 'A simple explanation of the website’s current cookie use.',
    image: 'software-engineering',
    imageAlt: 'Website software and browser technology',
    sections: [
      [
        'Current implementation',
        'This website does not set analytics, advertising, or tracking cookies. It does not use third-party analytics tools, embedded videos, maps, or social media widgets. Photographs and fonts are served from the website’s own assets.',
      ],
      [
        'Enquiry form and navigation',
        'The enquiry form sends information to the website API when you submit it. A submission key is held in page memory to help prevent duplicate records during retries. It is not stored in a cookie or in browser local storage. Navigation and insight filters also operate without cookies.',
      ],
      [
        'Hosting infrastructure',
        'The hosting provider or reverse proxy may use technical protections that affect cookies or logs. The business must verify the final hosting configuration and update this notice to reflect any such behavior before launch.',
      ],
      [
        'If the website changes',
        'Adding analytics, advertising, third-party embeds, or other nonessential technologies requires a fresh assessment of notice and consent requirements for the operating jurisdictions. A cookie banner has not been added to this implementation because it does not set nonessential cookies.',
      ],
      [
        'Questions',
        'Use the contact form for questions about this implementation. The final policy should include the approved business contact and be reviewed whenever website functionality changes.',
      ],
    ],
  },
} as const;
export function Legal() {
  const { pathname } = useLocation();
  const policy = policies[pathname as keyof typeof policies];
  if (!policy) return null;
  return (
    <>
      <Breadcrumb label={policy.name} />
      <PageHero
        eyebrow="WEBSITE INFORMATION"
        image={policy.image}
        alt={policy.imageAlt}
        title={policy.name}
        description={policy.description}
      />
      <div className="container legal-content">
        <div className="legal-notice">
          <strong>Draft for business and legal review.</strong> This document reflects the
          implemented website functionality. Business identity, approved contact details, service
          providers, retention periods, and applicable legal terms must be confirmed before public
          launch.
          <br />
          Last updated: 23 November 2026.
        </div>
        {policy.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <section>
          <h2>Contact</h2>
          <p>
            For a website or information request,{' '}
            <Link to="/contact">contact LinkqGlobal through the enquiry form</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
