import { ToneType } from './types';

export interface Assistant {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  tone?: ToneType;
  voice_settings?: Record<string, any>;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}
