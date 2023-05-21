import { getUserPosts } from './posts-service';
import { getLikeCount } from './likes-service';
import { getCommentCount } from './comments-service';

export async function getUserStats(userId) {
  const userPosts = await getUserPosts(userId);
  const postIds = userPosts.map((post) => post.postId);
  const postCount = userPosts.length;
  const likeCount = await getLikeCount(postIds);
  const commentCount = await getCommentCount(postIds);

  return { postCount, likeCount, commentCount };
}
