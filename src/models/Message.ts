export interface Message {
  id: string;
  session_id: string;
  user_id: string;
  assistant_id: string;
  content: string;
  sender: 'user' | 'ai';
  sequence: number;
  created_at: Date;
}
