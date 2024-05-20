import { User } from 'firebase/auth';

export type FirebaseRole = 'pro' | 'plus';

export type FirebaseLoginResponse = {
  user: User | null;
  role?: FirebaseRole;
};
