import { MailtrapClient } from 'mailtrap';

const token = process.env.MAILTRAP_TOKEN!;

export const mailtrapClient = new MailtrapClient({ token });

export const sender = {
  email: 'hello@demomailtrap.com',
  name: 'Mailtrap Test',
};
