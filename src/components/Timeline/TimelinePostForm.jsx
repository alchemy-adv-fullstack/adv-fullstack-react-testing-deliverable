import { useState } from 'react';
import styles from './TimelinePostForm.css';

export default function TimelinePostForm({ onSubmitPost }) {
  const [body, setBody] = useState('');
  return <form className={styles.form} onSubmit={(e) => {
    e.preventDefault();
    setBody('');
    onSubmitPost(body);
  }}>
    <textarea value={body} onChange={(e) => setBody(e.target.value)}/>
    <div className={styles.buttonRow}>
      <button type="submit">post</button>
    </div>
  </form>;
}
