
export interface User {
  id: string;
  email: string;
  displayName: string;
  username: string;
  phoneNumber?: string;
  avatar?: string;
  createdAt: Date;
}

export interface UserSearchResult {
  id: string;
  displayName: string;
  username: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
}
