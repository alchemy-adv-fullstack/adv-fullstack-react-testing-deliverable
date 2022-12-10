import { del, get, post, put } from './request.js';

const URL = '/api/v1/timeline-post-comments';

export async function getComments() {
  return []
}

export async function createComment(list) {
  return await post(URL, list);
}

export async function createCommentItem(id, item) {
  return await post(`${URL}/${id}/items`, item);
}

export async function deleteCommentItem(listId, itemId) {
  return await del(`${URL}/${listId}/items/${itemId}`);
}

export async function updateCommentItem(listId, itemId, updates) {
  return await put(`${URL}/${listId}/items/${itemId}`, updates);
}
