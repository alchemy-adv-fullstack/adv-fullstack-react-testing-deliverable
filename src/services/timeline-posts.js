import { client, checkError } from './client.js';

const URL = '/api/v1/timeline-posts';

export async function getPosts(userId) {
  const response = await client
    .from('timeline-posts')
    .select(`
*`)
    .match({ user_id: userId })
  ;
  return checkError(response);
}
// ,
// timeline-post-comments (name)


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

export async function createPostItem(id, item) {
  return await post(`${URL}/${id}/items`, item);
}

export async function deletePostItem(listId, itemId) {
  return await del(`${URL}/${listId}/items/${itemId}`);
}

export async function updatePostItem(listId, itemId, updates) {
  return await put(`${URL}/${listId}/items/${itemId}`, updates);
}
