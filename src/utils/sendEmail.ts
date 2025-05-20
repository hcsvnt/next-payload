import configPromise from '@payload-config';
import { getPayload } from 'payload';

export default async function sendEmail(to: string, subject: string, text: string) {
    const payload = await getPayload({ config: configPromise });
    await payload.sendEmail({ to, subject, text });
}
