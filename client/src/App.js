import React, { useState } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

export default () => {
  const [reloadPost, setReloadPost] = useState(false);

  return (
    <div className="container">
      <h1>Post Create!</h1>
      <PostCreate
        onCreate={() => {
          console.log(reloadPost)
          setReloadPost(!reloadPost);
        }}
      />
      <hr />
      <h1>Posts</h1>
      <PostList onReload={reloadPost} />
    </div>
  );
};
