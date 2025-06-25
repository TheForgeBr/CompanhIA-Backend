import { GenderType, LanguageType } from './types';

export interface User {
  id: string;
  email: string;
  email_verified: boolean;
  avatar_url?: string;
  bio?: string;
  gender?: GenderType;
  birthdate?: Date;
  language_pref?: LanguageType;
  timezone?: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  last_active_at?: Date;
}
