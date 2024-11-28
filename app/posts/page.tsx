import Link from "next/link";
import React from "react";
import CreatePost from "./CreatePost";

interface Post {
  id: string;
  title: string;
  created: string;
}

const getPosts = async () => {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/posts/records",
    { cache: "no-store" } // 서버에서 데이터를 가져오는 것이 캐시 되는 것을 막고 매번 새롭게 가져오는 옵션
  );
  const data = await res.json();

  return data?.items as Post[];
};

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts</h1>
      {posts?.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
      <CreatePost />
    </div>
  );
};

export default PostsPage;

const PostItem = ({ post }: { post: Post }) => {
  const { id, title, created } = post;
  return (
    <div>
      <Link href={`/posts/${id}`}>
        <div>
          <h3>{title}</h3>
          <p>{created}</p>
        </div>
      </Link>
    </div>
  );
};
