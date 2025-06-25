export interface ConversationSession {
  id: string;
  user_id: string;
  assistant_id: string;
  title?: string;
  started_at: Date;
  ended_at?: Date;
}
