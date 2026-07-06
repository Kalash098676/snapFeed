import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://snapfeed-2q2i.onrender.com";

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const res = await axios.post(
        `${API}/create-post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      alert("Post created successfully!");

      e.target.reset();
      navigate("/feed");
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.message || "Error creating post");
      } else {
        alert("Server is not responding");
      }
    }
  };

  return (
    <section className="create-post-section">
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          accept="image/*"
          required
        />

        <input
          type="text"
          name="caption"
          placeholder="Enter caption"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default CreatePost;
