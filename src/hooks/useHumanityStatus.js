import { useEffect, useState } from 'react';
import { getPosts } from '../services/timeline-posts.js';

export default function useHmanityStatus() {
  const [postCount, setPostCount] = useState(0);
  const [humanityPercent, setHumanityPercent] = useState(0);
  const [humansFlagged, setHumansFlagged] = useState(0);
  const effect = async () => {
    const posts = await getPosts();
    setPostCount(posts.length);
    setHumanityPercent(
      posts.filter(p => p.body.toLowerCase().includes('human')).length
        / posts.length,
    );
    setHumansFlagged(
      posts
        .filter(p => p.comments.find(c => c.flagged))
        .length
    );
  };
  useEffect(() => {
    effect();
  });

  return {
    postCount,
    humanityPercent,
    humansFlagged,
  };
}
