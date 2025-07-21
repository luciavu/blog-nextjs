'use client';
import { useEffect, useState } from 'react';
import { fetchPostById } from '../../api/posts';
import type { Post, Comment } from '../../types';
import { fetchCommentsFromPostId } from '../../api/comments';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import './PostDetails.scss';
import CommentSection from '../../components/CommentSection/CommentSection';
import Image from 'next/image';
import Layout from '../../components/Layout';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const loadComments = async (postId: number) => {
    fetchCommentsFromPostId(postId)
      .then(setComments)
      .catch((err) => {
        console.error('Error loading comments', err);
      });
  };

  useEffect(() => {
    if (id) {
      const postId = Number(id);
      if (!isNaN(postId)) {
        fetchPostById(postId)
          .then(setPost)
          .catch((err) => {
            console.error('Error loading post', err);
          });
        loadComments(postId);
      }
    }
  }, [id]);

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <Layout>
      <div className="post-details flex-container">
        <Link href="/" className="nav-link">
          Back
        </Link>
        <p className="date">
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
            .format(new Date(post.createdAt))
            .toUpperCase()}
        </p>

        <h1>{post.title}</h1>
        <p className="paragraph">{post.content}</p>
        <div className="imageWrapper">
          <Image
            src={post.previewImage}
            alt="Preview image"
            width={1920}
            height={800}
            className="image"
          />
        </div>
      </div>
      <CommentSection
        comments={comments}
        postId={Number(id)}
        loadComments={loadComments}
      ></CommentSection>
    </Layout>
  );
};

export default PostDetails;
