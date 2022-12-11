import * as functions from "firebase-functions";

export interface ErrorCondition {
  throwErrorIf: boolean,
  code?: functions.https.FunctionsErrorCode,
  message: string,
};

export function errorThrower(errorConditions: ErrorCondition[]) {
  const error = errorConditions.find(errorCondition => errorCondition.throwErrorIf);
  if (error) throw new functions.https.HttpsError(error.code ?? 'cancelled', error.message);
};