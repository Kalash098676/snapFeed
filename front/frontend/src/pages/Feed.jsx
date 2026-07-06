import React, { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.posts);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);

      setPosts(posts.filter((post) => post._id !== id));

      alert("Post deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Error deleting post");
    }
  };

  return (
    <section className="feed-section">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <img src={post.image} alt={post.caption} />
            <p>{post.caption}</p>

            <button
              onClick={() => handleDelete(post._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <h1>No posts available</h1>
      )}
    </section>
  );
};

export default Feed;