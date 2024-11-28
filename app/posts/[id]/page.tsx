import React from "react";

interface Post {
  id: string;
  title: string;
  created: string;
}

const getPost = async (id: string): Promise<Post> => {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/posts/records/${id}`,
    { next: { revalidate: 10 } }
  );

  if (!res.ok) throw new Error("Failed to fetch post");

  const data = await res.json();
  return data;
};

const PostDetailPage = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);
  return (
    <div>
      <h1>post/{post.id}</h1>
      <div>
        <h3>{post.title}</h3>
        <p>{post.created}</p>
      </div>
    </div>
  );
};

export default PostDetailPage;
