
export interface Post {
  id: string;
  sender: string;
  recipient: string;
  avatar: string;
  content?: string;
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
  stock: string;
  amount: string;
}
export interface FeedPostProps {
  post: Post;
  currentUser: string;
  onUpdatePost?: (postId: string, updates: { likes: number; liked: boolean; comments?: number }) => void;
  onShare?: (stock: string, postId: string) => void;
  onCommentAdded?: () => void;
}