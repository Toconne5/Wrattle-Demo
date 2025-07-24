export interface FriendRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUserName: string;
  fromUserEmail: string;
  status: 'pending' | 'accepted' | 'rejected';  // ← changed this
  createdAt: Date;
}

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  friendName: string;
  friendEmail: string;
  createdAt: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;  // ← changed this
  username?: string;
  profilePicture?: string;
  createdAt: Date;
}