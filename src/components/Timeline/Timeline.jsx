import TimelinePost from './TimelinePost.jsx'

export default function Timeline({posts}) {
  return (
    <ol>
      {posts.map(post => <TimelinePost key={post.id} post={post} /> )}
    </ol>
  );
}
