import * as functions from "firebase-functions";
import { errorHandler } from "../errorHandler";

import { client } from "./client";

interface Data {
  body: string;
  to: string;
};

interface Result {
  message?: string,
  error?: string,
};

/** 
 * @example
 * interface Data {
 *   body: string;
 *   to: string;
 * };
 * 
 * const sendText = httpsCallable<Data, { message: string; }>(firebaseFunctions, 'sendText');
 *  
 * const result = await sendText({
 *   body,
 *   to,
 * });
 * 
 * console.log(result?.data?.message);
 */
export const sendText = functions
  // .runWith({ secrets: ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_PHONE_NUMBER'] })
  .https.onCall(async (
    { body, to }: Data,
    context
  ): Promise<Result> => {
    try {
      const message = await client.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
      });

      console.log(message?.sid);

      return {
        message: `Successfully sent text.`,
      };
    } catch (error) {
      return errorHandler(error);
    };
  });
