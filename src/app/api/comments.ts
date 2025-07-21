import api from './api';
import type { Comment } from '../types';
import { AxiosError } from 'axios';

type CommentData = {
  text: string;
};

export const fetchComments = async () => {
  const res = await api.get(`/comments`);
  return res.data;
};

export const fetchCommentsFromPostId = async (id: number): Promise<Comment[]> => {
  const res = await api.get(`/posts/${id}/comments`);
  return res.data;
};

export const createComment = async (
  postId: number,
  data: CommentData
): Promise<Comment | string> => {
  try {
    const res = await api.post(`/posts/${postId}/comments`, data);
    return res.data;
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      if (status === 400 || status === 500) {
        message = error.response?.data?.message;
      }
    }
    console.error(`Comment creation failed:`, message);
    return message;
  }
};

export const deleteComment = async (comment: Comment): Promise<Comment | string> => {
  try {
    const res = await api.delete(`/posts/${comment.postId}/comments/${comment.id}`);
    return res.data;
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      if (status === 400 || status === 404 || status === 500) {
        message = error.response?.data?.message;
      }
    }
    console.error(`Comment deletion failed:`, message);
    return message;
  }
};
