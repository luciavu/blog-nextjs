export interface Post {
  id: number;
  title: string;
  content: string;
  previewImage: string;
  published: boolean;
  createdAt: string;
  authorId: number;
}

export type PostData = Omit<Post, 'createdAt'>;
export type NewPostData = Omit<PostData, 'id'>;

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  author: User;
  text: string;
  createdAt: string;
}

export interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}

export interface AuthTokenPayload {
  userId: number;
  username: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}
