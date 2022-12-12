import { useState, useEffect } from 'react';
import {
  getPosts,
  createPost,
  updatePost,
} from '../services/timeline-posts.js';
import { useUser } from '../state/UserContext.jsx';
import {
  createComment,
  updateComment,
} from '../services/timeline-post-comments.js';

export default function useTimeline() {
  const [posts, setPosts] = useState([]);
  const [loadingMode, setLoadingMode] = useState('none');
  const user = useUser();

  const fetchPost = () => {
    (async () => {
      try {
        setLoadingMode('loading');
        const posts = await getPosts();
        setPosts(posts);
        setLoadingMode('success');
      } catch (e) {
        console.error('Error fetching posts!', e);
        setLoadingMode('error');
      }
    })();
  };
  const onCreatePost = async (body) => {
    await createPost(user, body);
    fetchPost();
  };
  const onEditPost = async (postId, body) => {
    await updatePost(postId, body);
    fetchPost();
  };
  const onEditComment = async (commentId, body) => {
    await updateComment(commentId, user, body);
    fetchPost();
  };
  const onCreateComment = async (postId, body) => {
    await createComment(postId, user, body);
    fetchPost();
  };
  useEffect(fetchPost, []);
  return {
    posts,
    onCreatePost,
    onEditPost,
    onCreateComment,
    onEditComment,
    loadingMode,
  };
}
