import api from './api';
import type { Post, PostData, NewPostData } from '../types';
import { AxiosError } from 'axios';

export const createPost = async (data: NewPostData): Promise<Post | string> => {
  try {
    const res = await api.post(`/posts`, data);
    return res.data;
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      if (status === 400 || status === 500) {
        message = error.response?.data?.message;
      }
    }
    console.error(`Post creation failed:`, message);
    return message;
  }
};

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await api.get('/posts');
  return res.data;
};

export const fetchAllPosts = async (): Promise<Post[]> => {
  const res = await api.get('/posts/all');
  return res.data;
};

export const fetchPostById = async (id: number): Promise<Post> => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const updatePost = async (data: PostData): Promise<Post | string> => {
  try {
    const res = await api.put(`/posts/${data.id}`, data);
    return res.data;
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      if (status === 400 || status === 404 || status === 500 || status === 403) {
        message = error.response?.data?.message;
      }
    }
    console.error(`Post update failed:`, message);
    alert(`Post update failed: ${message}`);
    return message;
  }
};

export const deletePost = async (data: PostData): Promise<Post | string> => {
  try {
    const res = await api.delete(`/posts/${data.id}`);
    return res.data;
  } catch (error) {
    let message = 'Something went wrong';
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      if (status === 400 || status === 404 || status === 500) {
        message = error.response?.data?.message;
      }
    }
    console.error(`Post deletion failed:`, message);
    return message;
  }
};
