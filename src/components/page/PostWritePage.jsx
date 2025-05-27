import React, { useState } from "react";
import styled from "styled-components";
import Button from "../button";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #2d6cdf;
`;

const TextBoxSet = styled.textarea`
display: block;
margin: 18px auto 17px;
width: 80%;
border: none;
color: #202020;
font-family: Pretendard-Regular, AppleSDGothicNeo-Regular, "Malgun Gothic", dotum, sans-serif;
resize: none;
outline: 0 none;
line-height: 40px;
letter-spacing: -0.4px;
`

const TitleBox = styled(TextBoxSet)`
  height: 56px;
  font-size: 1.875rem;
  overflow: hidden;
`
const ContentsBox = styled(TextBoxSet)`
  height: 400px;
  font-size: 1rem;
  overflow: auto;
`

function PostWritePage({ setPosts, posts }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {user} = useAuth();

  const editingPost = location.state?.post;

  const [title, setTitle] = useState(editingPost ? editingPost.title : ""); //삼항연산자, 
  const [contents, setContents] = useState(editingPost ? editingPost.contents : "");

  const handlePostSubmit = async () => {
     if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    if (editingPost) {
      if (editingPost.authorId !== user?.id) {
        alert("작성자만 수정할 수 있습니다.");
        return;
      }
      try {
        const res = await axios.put(
          `http://localhost:8000/660/posts/${editingPost.id}`,
          { ...editingPost, title, contents },
          config
        );
        const updated = posts.map(p => p.id === editingPost.id ? res.data : p);
        setPosts(updated);
        navigate("/");
      } catch (error) {
        console.error("수정 실패:", error);
        alert("수정 중 문제가 발생했습니다.");
      }
      // const updatedPosts = posts.map((p) =>
      //   p.id === editingPost.id ? { ...p, title, contents } : p
      // );
      // setPosts(updatedPosts);
    } else {
      const newPost = {
        // id: posts.length + 1,
        title,
        contents,
        authorId: user?.id,
        authorName: user?.name || user?.email,
        date: new Date().toLocaleDateString()
      };
      try {
         const res = await axios.post("http://localhost:8000/660/posts", newPost, config);
        setPosts([...posts, res.data]);
        navigate("/");
      } catch (error) {
        console.error("작성 실패:", error);
        alert("글 작성 중 문제가 발생했습니다.");
      }

  
      // setPosts([...posts, newPost]);
    }
    
    navigate("/");
  };

  return (
    <Wrapper>
      <Title>글 작성 페이지입니다</Title>
      <TitleBox placeholder="제목을 입력해 주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}>
      </TitleBox>
      <ContentsBox placeholder="내용을 입력해 주세요."
        value={contents}
        onChange={(e) => setContents(e.target.value)}>
      </ContentsBox>
      <Button onClick={handlePostSubmit}>올리기</Button>
    </Wrapper>
  );
}

export default PostWritePage;
