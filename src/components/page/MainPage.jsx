import React from "react";
import styled from "styled-components";
import PostViewPage from "./PostViewPage";
import PostItem from "../PostItem";
import Button from "../button";
import PostWritePage from "./PostWritePage";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  color: white;
  margin:0;
`;

const postList = [];

function MainPage({ posts }) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header>
        <Title>메인페이지입니다</Title>
      </Header>
      <PostItem
        posts={posts}
      />
      <Button onClick={() => { navigate(`/post-write`) }}>새 글 작성하기</Button>
    </Wrapper>
  );
}

export default MainPage;