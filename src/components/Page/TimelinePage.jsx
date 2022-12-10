import { useState, useEffect } from 'react';
import { useUser } from '../../state/UserContext.jsx'
import { getPosts, createPost } from '../../services/timeline-posts.js'
import { getComments } from '../../services/timeline-post-comments.js'
import Timeline from '../Timeline/Timeline.jsx';
import TimelinePostForm from '../Timeline/TimelinePostForm.jsx';

export const postListDisplay = (loadingMode, posts) => {
  switch(loadingMode) {
    case 'loading':
      return <span>Loading posts...</span>
    case 'success':
      return <Timeline posts={posts} />
    case 'error':
      return <span>Error loading posts! Contact yourself!</span>
  }
}

export default function TimelinePage() {
  const [ posts, setPosts ] = useState([]);
  const [ loadingMode, setLoadingMode ] = useState('none');
  const user = useUser();

  const fetchPosts = () => {
    (async () => {
      console.log('user in fetchPosts', user)
      if(user == null) return;
      try {
        setLoadingMode('loading');
        const rawPosts = await getPosts(user.id)
        const posts = await Promise.all(rawPosts.map(async post => {
          const comments = await getComments(post.id);
          console.log('comments', comments)
          return {
            ...post,
            comments,
          }
        }));
        console.log('posts', posts)
        setPosts(posts);
        setLoadingMode('success');
      } catch (e) {
        console.error('Error fetching posts!', e);
        setLoadingMode('error');
      }
    })();
  }
  const onCreatePost = async (e, body) => {
    console.log('e', e)
    e.preventDefault();
    await createPost(user, body)
    fetchPosts()
  }
  useEffect(fetchPosts, [user])
  return <>
    <TimelinePostForm onCreatePost={onCreatePost} />
    {postListDisplay(loadingMode, posts)}
  </>
}
