'use client';
import React, { useState } from 'react';
import type { Comment } from '../../types';
import './CommentSection.scss';
import { BiSolidInvader } from 'react-icons/bi';
import { useAuth } from '../../context/AuthContext';
import { createComment } from '../../api/comments';
import Link from 'next/link';

type CommentSectionProps = {
  comments: Comment[];
  postId: number;
  loadComments: (postId: number) => void;
};

const CommentSection: React.FC<CommentSectionProps> = ({ comments, postId, loadComments }) => {
  const { isLoggedIn, username } = useAuth();
  const [newComment, setNewComment] = useState('');

  return (
    <div className="comment-section">
      <h1>Comments</h1>
      {isLoggedIn ? (
        <div className="new-comment-div flex-container">
          <BiSolidInvader size={50} className="profile-picture" />
          <div className="new-comment-details">
            <p>Add a comment ({username})</p>
            <div className="flex-container">
              <input
                type="text"
                name="new-comment"
                id="new-comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts"
              ></input>
              <button
                onClick={async () => {
                  await createComment(postId, { text: newComment });
                  setNewComment('');
                  loadComments(postId);
                }}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>
          <Link href="/login" className="nav-link">
            Login
          </Link>{' '}
          to comment on posts on this blog.
        </p>
      )}
      {comments.map((comment) => (
        <div className="comment flex-container" key={comment.id}>
          <BiSolidInvader size={50} className="profile-picture" />
          <div className="comment-details">
            <div className="user-details flex-container">
              <p>{comment.author.username}</p>
              {comment.author.isAdmin && <p className="author">Author</p>}
            </div>
            <p className="date">{new Date(comment.createdAt).toLocaleString()}</p>
            <p className="text">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
