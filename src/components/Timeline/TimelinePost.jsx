import { useState } from 'react';
import styles from './TimelinePost.css';
import TimelinePostComment from './TimelinePostComment.jsx';
import TimelinePostCommentForm from './TimelinePostCommentForm.jsx';
import { useUser } from '../../state/UserContext.jsx';
import TimelinePostForm from './TimelinePostForm';
import { NavLink } from 'react-router-dom';

export default function TimelinePost({
  post,
  onEditPost,
  onCreateComment,
  onEditComment,
}) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [editingPost, setEditingPost] = useState(false);
  const user = useUser();
  return (
    <article className={styles.post}>
      <img src={post.avatarUrl} />
      { window.location.toString().includes('/timeline/posts/')
        ? ''
        : <NavLink to={`/timeline/posts/${post.id}`}>🔗</NavLink>}
      <div>{post.createAt}</div>
      { editingPost
        ? <TimelinePostForm onSubmitPost={onEditPost.bind(null, post.id)} />
        : <div className={styles.postBody}>
          {post.body}
        </div>
      }
      <div className={styles.buttonRow}>
        <button onClick={() => setShowCommentForm(true)}>Comment</button>
        { user.id == post.user_id
          ? <button onClick={(e) => {
            e.preventDefault();
            setEditingPost(true);
          }}>
                Edit
          </button>
          : ''
        }
        <button>React</button>
      </div>
      {post.comments.length > 0
        ? <ol className={styles.comments}>
          {post.comments.map(comment => {
            return <TimelinePostComment
              key={comment.id}
              comment={comment}
              onEditComment={onEditComment}
            />;
          })}
        </ol>
        : ''
      }
      { showCommentForm
        ? <TimelinePostCommentForm
          onClose={() => setShowCommentForm(false)}
          onSubmitComment={onCreateComment.bind(null, post.id)}
        />
        : '' }
    </article>
  );
}
