import { User } from "firebase/auth";

export { };

declare global {
  interface SelectUserValues {
    displayName: User['displayName'],
    email: User['email'],
    emailVerified: User['emailVerified'],
    photoURL: User['photoURL'],
    uid: User['uid'],
  };
};
