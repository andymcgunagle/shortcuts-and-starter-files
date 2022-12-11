import * as functions from 'firebase-functions';

import { ErrorCondition, errorThrower } from "./errorThrower";

export function adminFunctionErrorThrower(
  context: functions.https.CallableContext,
  additionalErrorConditions: ErrorCondition[] = []
) {
  errorThrower([
    {
      throwErrorIf: !context?.auth?.uid,
      code: 'unauthenticated',
      message: `This function can only be called in an authenticated context.`,
    },
    {
      throwErrorIf: !(context?.auth?.token?.email?.endsWith('@roost.me')),
      message: `This function can only be called by Roost employees.`,
    },
    {
      throwErrorIf: !context?.auth?.token?.email_verified,
      message: `This function can only be called by Roost employees with verified emails.`,
    },
    {
      throwErrorIf: !context?.auth?.token?.isAdmin,
      message: `This function can only be called by admins.`
    },
    ...additionalErrorConditions,
  ]);
};
