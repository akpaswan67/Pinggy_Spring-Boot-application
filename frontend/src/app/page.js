"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const authHeader = authCode || "your-auth-token";

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(""); 
    try {
      const response = await fetch("http://localhost:8080/api/list", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "PinggyAuthHeader": authHeader,
        },
      });
      if (!response.ok) throw new Error(`Failed to fetch posts: ${response.status}`);
      
      const data = await response.json();

      setTimeout(() => {
        setPosts(data);
        setLoading(false);
      }, 3000); // 3 seconds delay
    } catch (error) {
      setError("Error fetching posts. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 
    try {
      const response = await fetch("http://localhost:8080/api/post", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "PinggyAuthHeader": authHeader,
        },
        body: JSON.stringify({ title, body }),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      fetchPosts();
      setTitle("");
      setBody("");
      setAuthCode("");
    } catch (error) {
      setError("Error creating post. Please check your Auth Code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Pinggy Posts</h1>

      {/* Error Message */}
      {error && <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4 w-full max-w-lg text-center">{error}</p>}

      {/* Post Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-blue-500"
          required
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Auth Code"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
          className="w-full p-3 mb-3 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-300 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Post"}
        </button>
      </form>

      {/* Post List */}
      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Posts</h2>
        {loading ? (
          <p className="text-center text-gray-600 animate-pulse">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts available.</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="bg-white p-4 mb-3 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">{post.title}</h3>
              <p className="text-gray-700">{post.body}</p>
              <small className="text-gray-500">Auth: {post.authHeader}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
