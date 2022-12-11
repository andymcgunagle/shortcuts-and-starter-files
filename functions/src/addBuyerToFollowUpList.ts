import * as functions from "firebase-functions";

import * as sgClient from "@sendgrid/client";
import { HttpMethod } from "twilio/lib/interfaces";

import { errorHandler } from "./errorHandler";

interface Data {
  email: string;
};

interface Result {
  error?: string,
  message?: string,
};

// https://docs.sendgrid.com/api-reference/contacts/add-or-update-a-contact#:~:text=An%20array%20of%20List%20ID%20strings%20that%20this%20contact%20will%20be%20added%20to.

export const addBuyerToFollowUpList = functions
  .runWith({ secrets: ['SENDGRID_API_KEY'] })
  .https.onCall(async ({ email }: Data, context): Promise<Result> => {
    try {
      if (!process.env.SENDGRID_API_KEY) {
        throw new Error('Missing SENDGRID_API_KEY');
      };

      sgClient.setApiKey(process.env.SENDGRID_API_KEY);

      // const data = {
      //   list_ids: ['list id here'],
      //   contacts: [{ 'email': email, },]
      // };

      // const request = {
      //   url: `/v3/marketing/contacts`,
      //   method: 'put' as HttpMethod,
      //   body: data
      // };

      const request = {
        method: 'get' as HttpMethod,
        url: '/v3/api_keys'
      };

      sgClient.request(request)
        .then(([response, body]) => {
          console.log(response.statusCode);
          console.log(body);
        });

      return {
        message: `Successfully added ${email} to follow up list.`
      };
    } catch (error) {
      return errorHandler(error);
    };
  });
