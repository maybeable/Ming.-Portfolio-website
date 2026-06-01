export interface FeedbackReply {
  id: string;
  feedback_id: string;
  content: string;
  is_author: boolean;
  created_at: string;
}

export interface Feedback {
  id: string;
  content: string;
  name: string | null;
  featured: boolean;
  created_at: string;
  author_reply: string | null;
  author_replied_at: string | null;
  deleted: boolean;
  deleted_at: string | null;
  is_author: boolean;
  is_pinned: boolean;
  pinned_at: string | null;
  replies?: FeedbackReply[];
}
