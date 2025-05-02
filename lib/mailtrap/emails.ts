import { mailtrapClient, sender } from '@/config/mailtrap.config';
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from './email-templates';
import { TokenType } from '@prisma/client';

export async function sendConfirmationEmail(
  email: string,
  confirmationLink: string,
  type: TokenType
) {
  if (type === 'EMAIL_VERIFICATION') {
    await mailtrapClient.send({
      from: sender,
      to: [{ email }],
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationURL}',
        confirmationLink
      ),
      category: 'EMAIL_VERIFICATION',
    });
  } else if (type === 'RESET_PASSWORD') {
    await mailtrapClient.send({
      from: sender,
      to: [{ email }],
      subject: 'Reset your password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        '{resetURL}',
        confirmationLink
      ),
      category: 'RESET_PASSWORD',
    });
  }
}
