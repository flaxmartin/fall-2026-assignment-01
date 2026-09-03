export type PostItem = {
  id: number;
  title: string;
  body: string;
};

export async function fetchPostBatch(
  postIds: number[],
): Promise<PostItem[]> {
  const requests = postIds.map(async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch post ${id}`);
    }

    return (await response.json()) as PostItem;
  });

  return await Promise.all(requests);
}
