import { useState, useEffect } from 'react';
import {
  getPost,
  createPost,
  updatePost,
} from '../services/timeline-posts.js';
import { useUser } from '../state/UserContext.jsx';
import {
  createComment,
  updateComment,
} from '../services/timeline-post-comments.js';

export default function usePost(postId) {
  const [post, setPost] = useState(null);
  const [loadingMode, setLoadingMode] = useState('none');
  const user = useUser();

  const fetchPosts = () => {
    (async () => {
      try {
        setLoadingMode('loading');
        const post = await getPost(postId);
        setPost(post);
        setLoadingMode('success');
      } catch (e) {
        console.error('Error fetching posts!', e);
        setLoadingMode('error');
      }
    })();
  };
  const onCreatePost = async (body) => {
    await createPost(user, body);
    fetchPosts();
  };
  const onEditPost = async (postId, body) => {
    await updatePost(postId, body);
    fetchPosts();
  };
  const onEditComment = async (commentId, body) => {
    await updateComment(commentId, user, body);
    fetchPosts();
  };
  const onCreateComment = async (postId, body) => {
    await createComment(postId, user, body);
    fetchPosts();
  };
  useEffect(fetchPosts, []);
  return {
    post,
    onCreatePost,
    onEditPost,
    onCreateComment,
    onEditComment,
    loadingMode,
  };
}
