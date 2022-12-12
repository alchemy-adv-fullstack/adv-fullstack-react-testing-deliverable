import Timeline from '../Timeline/Timeline.jsx';
import TimelinePostForm from '../Timeline/TimelinePostForm.jsx';
import useTimeline from '../../hooks/useTimeline.js';

export const postListDisplay = (
  onEditPost,
  onCreateComment,
  onEditComment,
  loadingMode,
  posts,
) => {
  switch(loadingMode) {
    case 'loading':
      return <span>Loading posts...</span>;
    case 'success':
      return <Timeline
        onEditPost={onEditPost}
        onCreateComment={onCreateComment}
        onEditComment={onEditComment}
        posts={posts}
      />;
    case 'error':
      return <span>Error loading posts! Contact yourself!</span>;
  }
};

export default function TimelinePage() {
  const {
    posts,
    onCreatePost,
    onEditPost,
    onCreateComment,
    onEditComment,
    loadingMode,
  } = useTimeline();
  return <div>
    <TimelinePostForm
      onSubmitPost={onCreatePost}
    />
    {postListDisplay(
      onEditPost,
      onCreateComment,
      onEditComment,
      loadingMode,
      posts,
    )}
  </div>;
}
