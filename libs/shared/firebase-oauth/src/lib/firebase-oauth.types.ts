import { User } from 'firebase/auth';

export type FirebaseRole = 'pro' | 'discord' | 'sheets' | 'vision' | 'chatgpt';

export type FirebaseLoginResponse = {
  user: User | null;
  role: FirebaseRole;
} | null;
