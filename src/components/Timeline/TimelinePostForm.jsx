import { useState } from 'react';

export default function TimelinePostForm({onCreatePost}) {
  const [ body, setBody ] = useState('')
  return <form onSubmit={(e) => onCreatePost(e, body)}>
    <textarea value={body} onChange={(e) => setBody(e.target.value)}/>
    <button type="submit">post</button>
  </form>
}
