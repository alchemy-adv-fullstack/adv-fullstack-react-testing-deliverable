import { useState } from 'react';
import styles from './TimelinePostCommentForm.css';

export default function TimelinePostCommentForm({
  onClose,
  onSubmitComment,
  comment,
}) {
  const [body, setBody] = useState(comment?.body || '');
  const submit = (e) => {
    e.preventDefault();
    onSubmitComment(body);
    onClose();
  };
  const cancel = () => {
    onClose();
  };
  return (
    <form className={styles.form} onSubmit={submit}>
      <textarea value={body} onChange={e => setBody(e.target.value)}/>
      <div>
        <button>comment</button>
        <button onClick={cancel}>cancel</button>
      </div>
    </form>
  );
}
