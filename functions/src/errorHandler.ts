import * as functions from "firebase-functions";

export function errorHandler(error: Error | unknown): { error: string; } {
  if (error instanceof Error) {
    functions.logger.error(error.message);
    return { error: error.message, };
  } else {
    functions.logger.error(error);
    return { error: 'An unknown error occurred.', };
  };
};
