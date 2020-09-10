import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default ({ onReload }) => {
  const [posts, setPosts] = useState({});
  const [comment, setComment] = useState(false);

  const fetchPosts = async () => {
    const res = await axios.get("http://posts.com/posts");

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [onReload, comment]);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate
            postId={post.id}
            onCreate={() => {
              setComment(!comment);
            }}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
