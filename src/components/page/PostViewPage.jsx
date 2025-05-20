import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../button";
import styled from "styled-components";
import Header from "../Header";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  color: white;
  margin:0;
`;

const Post = styled.div`
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  width: 80%;
  margin: auto;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  height: 40px;
  align-items : center;
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const PostContents = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: left;
`;

const Comment = styled.div`
  margin-top: 40px;
`;


function PostViewPage({ setPosts, posts }) {
  const navigate = useNavigate();
  const {user} = useAuth();

  const { postId } = useParams(); // URL에서 postId를 가져옵니다.
  const post = posts.find((p) => p.id === Number(postId));

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const updatePost = () => {
    if (post.authorId !== user?.id) {
      alert("작성자만 수정할 수 있습니다.");
      return;
    }
    navigate("/post-write", { state: { post } });
  };

  const removePost = () => {
    if (post.authorId !== user?.id) {
      alert("작성자만 삭제할 수 있습니다.");
      return;
    }
    // const updated = posts.filter((p) => p.id !== Number(postId));
    // setPosts(updated);
     axios.delete(`http://localhost:8000/posts/${post.id}`)
      .then(() => {
        const updated = posts.filter((p) => p.id !== post.id);
        setPosts(updated);
        navigate("/");
      })
      .catch((error) => {
        alert("삭제 실패했습니다.");
        console.error(error);
      });
  };

  return (
    <Wrapper>
      <Header>
        <Title>글 상세보기 페이지입니다</Title>
      </Header>
      <Post>
        <TopBar>
          <PostTitle>{post.title}</PostTitle>
          <ButtonGroup>
            {post.authorId === user?.id && (
              <>
                <Button onClick={updatePost}>수정하기</Button>
                <Button onClick={removePost}>삭제하기</Button>
              </>
            )}
          </ButtonGroup>
        </TopBar>
        <PostContents>{post.contents}</PostContents>
      </Post>
    </Wrapper>
  );
}

export default PostViewPage;