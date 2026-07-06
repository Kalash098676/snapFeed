import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "https://snapfeed-2q2i.onrender.com";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/posts`);
      console.log(res.data);
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
      alert("Failed to load posts");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/posts/${id}`);

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== id)
      );

      alert("Post deleted successfully");
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.message || "Error deleting post");
      } else {
        alert("Server is not responding");
      }
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
