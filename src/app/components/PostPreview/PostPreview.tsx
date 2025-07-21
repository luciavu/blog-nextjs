import './PostPreview.scss';
import type { Post } from '../../types';
import React from 'react';

type PostPreviewProps = {
  post: Post;
  idx: number;
};

const PostPreview: React.FC<PostPreviewProps> = ({ post, idx }) => {
  return (
    <a
      key={idx}
      href={`./posts/${idx}`}
      className={`card ${idx === 1 ? 'large-card' : 'small-card'}`}
    >
      <div className="card-image" style={{ backgroundImage: `url(${post.previewImage})` }}></div>
      <div className="card-text">
        <p>
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
            .format(new Date(post.createdAt))
            .toUpperCase()}
        </p>
        <h3 className="card-title">{post.title}</h3>
      </div>
    </a>
  );
};

export default PostPreview;
