import { client, checkError } from './client.js';

export async function getCommentsByPostId(postId) {
  const response = await client
    .from('timeline-post-comments')
    .select(`
*`)
    .match({ timeline_post_id: postId })
    // Ever notice comments are ascending while timelines are descending...?
    .order('created_at', { ascending: true })
  ;
  return checkError(response);
}

export async function createComment(postId, user, body) {
  const response = await client
    .from('timeline-post-comments')
    .insert({
      body,
      user_id: user.id,
      timeline_post_id: postId,
    })
  ;
  return checkError(response);
}

export async function updateComment(commentId, user, body) {
  const response = await client
    .from('timeline-post-comments')
    .update({
      body,
      user_id: user.id,
    })
    .eq('id', commentId)
  ;
  return checkError(response);
}
