import { TokenType } from "@prisma/client";
import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function sendConfirmationEmail(email: string, confirmationLink: string, type: TokenType) {
     const auth: SMTPTransport.Options['auth'] = {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME!,
          clientId: process.env.OAUTH_CLIENTID!,
          clientSecret: process.env.OAUTH_CLIENT_SECRET!,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN!,
     };

     const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: auth,
     });

     if (type === "EMAIL_VERIFICATION") {
          await transporter.sendMail({
               from: `Book_My_Space`,
               to: email,
               subject: 'Confirm your Email',
               text: `Click the following link to confirm your email: ${confirmationLink}`,
               html: `<p>Click the following link to confirm your email:</p><a href="${confirmationLink}">Confirm Email</a>`,
          });
     } else if (type === "RESET_PASSWORD") {
          await transporter.sendMail({
               from: `Book_My_Space`,
               to: email,
               subject: "Reset your password",
               text: `Click the following link to reset your password: ${confirmationLink}`,
               html: `<p>Click the following link to reset your password:</p><a href="${confirmationLink}">Confirm Email</a>`,
          });
     }
}