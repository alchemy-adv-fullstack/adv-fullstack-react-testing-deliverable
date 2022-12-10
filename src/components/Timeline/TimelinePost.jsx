
export default function TimelinePost({post}) {
  return (
    <article>
      <img src={post.avatarUrl} />
      <div>{post.createAt}</div>
      <div>
        {post.body}
      </div>
      <ol>
        {post.comments.map(comment => {
          return <TimelinePostComment key={comment.id} comment={comment} />;
        })}
      </ol>
      <button>Comment</button>
      <button>React</button>
    </article>
  );
}
