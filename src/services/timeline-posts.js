import { client, checkError } from './client.js';
import { getCommentsByPostId } from './timeline-post-comments.js';

const postWithComments = async (post) => {
  const comments = await getCommentsByPostId(post.id);
  return {
    ...post,
    comments,
  };
};

export async function getPosts() {
  // We were using this earlier to select comments:
  // comments:timeline-post-comments!left ( * )
  // However it includes _all_ comments on every post, which is not what we
  // want. Scoping appears to be something not directly supported by supabase,
  // so just do an n+1 query for now.
  const response = await client
    .from('timeline-posts')
    .select(`
      *
`)
    .order('created_at', { ascending: false })
  ;
  const rawPosts = checkError(response);
  const posts = await Promise.all(rawPosts.map(postWithComments));
  return posts;
}

export async function getPost(postId) {
  // We were using this earlier to select comments:
  // comments:timeline-post-comments!left ( * )
  // However it includes _all_ comments on every post, which is not what we
  // want. Scoping appears to be something not directly supported by supabase,
  // so just do an n+1 query for now.
  const response = await client
    .from('timeline-posts')
    .select(`
      *
`)
    .match({ id: postId })
    .single()
  ;
  return postWithComments(checkError(response));
}

export async function createPost(user, body) {
  const response = await client
    .from('timeline-posts')
    .insert({
      body,
      user_id: user.id,
    })
  ;
  return checkError(response);
}

export async function updatePost(postId, body) {
  const response = await client
    .from('timeline-posts')
    .update({
      body,
    })
    .eq('id', postId)
  ;
  return checkError(response);
}
