import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient({ log: [] });
const where = {
  businessEmail: 'browser-qa@example.test',
  organization: 'LinkqGlobal Local QA',
  subject: 'Local browser integration test',
};
const rows = await db.enquiry.findMany({
  where,
  select: {
    id: true,
    consentGiven: true,
    consentTimestamp: true,
    status: true,
    notificationStatus: true,
  },
});
if (rows.length !== 1 || !rows[0].consentGiven)
  throw new Error('Expected exactly one browser QA record with consent.');
console.info({
  browserSubmission: 'persisted',
  records: rows.length,
  consentRecorded: rows[0].consentGiven,
  status: rows[0].status,
  email: rows[0].notificationStatus,
});
await db.enquiry.deleteMany({ where });
console.info('Removed only the generated browser QA record.');
await db.$disconnect();
