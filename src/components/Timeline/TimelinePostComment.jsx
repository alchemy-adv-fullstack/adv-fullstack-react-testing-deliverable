import { useState } from 'react';
import TimelinePostCommentForm from './TimelinePostCommentForm';
import { useUser } from '../../state/UserContext.jsx';
import styles from './TimelinePostComment.css';

export default function TimelinePostComment({ comment, onEditComment }) {
  const [editing, setEditing] = useState(false);
  const user = useUser();
  return (
    editing
      ? <TimelinePostCommentForm
        onClose={() => setEditing(false)}
        onSubmitComment={onEditComment.bind(null, comment.id)}
        postId={comment.timeline_post_id}
        comment={comment}
      />
      : <article className={styles.comment}>
        <div className={styles.body}>{comment.body}</div>
        { comment.user_id === user.id
          ? <div className={styles.buttonRow}>
            <button onClick={() => setEditing(true)}>edit</button>
          </div>
          : ''
        }
      </article>
  );
}
