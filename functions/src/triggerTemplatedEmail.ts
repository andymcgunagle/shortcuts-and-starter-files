import * as functions from "firebase-functions";

import * as sgMail from "@sendgrid/mail";

import { errorHandler } from "./errorHandler";

interface Data {
  sendToEmail: string,
  templateId: string,
};

interface Response {
  error?: string,
  message?: string,
};

export const triggerTemplatedEmail = functions
  .runWith({ secrets: ['SENDGRID_API_KEY'] })
  .https.onCall(async (data: Data, context): Promise<Response> => {
    try {
      if (!context?.auth?.uid) {
        throw new functions.https.HttpsError(
          'unauthenticated',
          `This function can only be called in an authenticated context (context?.auth?.uid was ${context?.auth?.uid}).`
        );
      };

      if (!process.env.SENDGRID_API_KEY) {
        throw new functions.https.HttpsError(
          'cancelled',
          `Sendgrid API key not set (process.env.SENDGRID_API_KEY was ${process.env.SENDGRID_API_KEY}).`
        );
      };

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const emailMessage: sgMail.MailDataRequired = {
        from: 'hello@roost.me',
        templateId: data.templateId,
        to: data.sendToEmail,
      };

      const response = await sgMail.send(emailMessage);

      if (response?.[0]?.statusCode !== 202) {
        throw new functions.https.HttpsError(
          'unknown',
          `SendGrid error (response?.[0]?.statusCode was ${response?.[0]?.statusCode}).`
        );
      };

      return {
        message: `Success! Function completed with an sgMail send response status code of ${response?.[0]?.statusCode}.`,
      };
    } catch (error) {
      return errorHandler(error);
    };
  });
