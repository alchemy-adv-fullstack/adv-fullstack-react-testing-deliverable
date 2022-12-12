import TimelinePost from './TimelinePost.jsx';

export default function Timeline(props) {
  return (
    <ol>
      {props.posts.map(post => <TimelinePost
        key={post.id}
        onEditPost={props.onEditPost}
        onCreateComment={props.onCreateComment}
        onEditComment={props.onEditComment}
        post={post}
      />)}
    </ol>
  );
}
