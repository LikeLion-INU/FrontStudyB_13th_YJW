import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/page/MainPage";
import PostWritePage from "./components/page/PostWritePage";
import PostViewPage from "./components/page/PostViewPage";
import { useState, useEffect } from "react";
import LoginPage from "./components/page/LoginPage";
import SignUpPage from "./components/page/SignUpPage";
import axios from "axios";

function App() {
  // const [posts, setPosts] = useState(() => {
  //   const saved = localStorage.getItem("posts");
  //   return saved ? JSON.parse(saved) : [];
  // });

  // // posts가 바뀔 때마다 localStorage에 저장
  // useEffect(() => {
  //   localStorage.setItem("posts", JSON.stringify(posts));
  // }, [posts]);

  const [posts, setPosts] = useState([]);

useEffect(() => {
    axios
      .get("http://localhost:8000/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("게시글 불러오기 실패", err));
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage posts={posts} />} />
        <Route path="/post-write" element={<PostWritePage setPosts={setPosts} posts={posts} />} />
        <Route path="/post/:postId" element={<PostViewPage posts={posts} setPosts={setPosts}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
