import { Timestamp, serverTimestamp } from "firebase/firestore";

export { };

declare global {
  type FirestoreReadyTimestamp = ReturnType<typeof serverTimestamp>;

  type FirestoreSideTimestamp = Timestamp;

  type ClientSideTimestamp = ReturnType<Timestamp['toMillis']>;
};
