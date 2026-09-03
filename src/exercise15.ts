import * as fs from "node:fs/promises";

export type CommentSummary = {
  postId: number;
  id: number;
  commenterEmail: string;
};

export async function processCommentsPipeline(
  targetPostId: number,
  outputPath: string,
): Promise<number> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${targetPostId}/comments`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch comments for post ${targetPostId}`);
  }

  const comments = (await response.json()) as Array<{
    postId: number;
    id: number;
    email: string;
  }>;

  const summaries: CommentSummary[] = comments.map((comment) => ({
    postId: comment.postId,
    id: comment.id,
    commenterEmail: comment.email.trim(),
  }));

  const filtered = summaries.filter(
    (comment) => !comment.commenterEmail.endsWith(".org"),
  );

  await fs.writeFile(
    outputPath,
    JSON.stringify(filtered),
    "utf-8",
  );

  return filtered.length;
}
