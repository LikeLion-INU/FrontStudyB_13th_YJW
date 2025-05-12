import React, { useState } from "react";
import styled from "styled-components";
import Button from "../button";
import { useNavigate, useLocation } from "react-router-dom";

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

  const editingPost = location.state?.post;

  const [title, setTitle] = useState(editingPost ? editingPost.title : ""); //삼항연산자, 
  const [contents, setContents] = useState(editingPost ? editingPost.contents : "");

  const handlePostSubmit = () => {
    if (editingPost) {
      const updatedPosts = posts.map((p) =>
        p.id === editingPost.id ? { ...p, title, contents } : p
      );
      setPosts(updatedPosts);
    } else {
      const newPost = {
        id: posts.length + 1,
        title,
        contents,
        date: new Date().toLocaleDateString()
      };
  
      setPosts([...posts, newPost]);
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
