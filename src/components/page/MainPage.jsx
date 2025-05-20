import React from "react";
import styled from "styled-components";
import PostViewPage from "./PostViewPage";
import PostItem from "../PostItem";
import Button from "../button";
import PostWritePage from "./PostWritePage";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect} from "react";
import axios from "axios";

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  color: white;
  margin:0;
`;

const postList = [];

function MainPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // 로그인 상태, 로그아웃 함수
  const [posts, setPosts] = useState([]);


  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다.");
  };

  useEffect(() => {
    // const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("게시글 불러오기 실패", err);
      });
  }, []);

  return (
    <Wrapper>
      <Header>
        <Title>메인페이지입니다</Title>
        {user ? (
          <Button style={{ marginLeft: "auto" }} onClick={handleLogout}>
            로그아웃
          </Button>
        ) : (
          <Button style={{ marginLeft: "auto" }} onClick={() => navigate("/login")}>
            로그인
          </Button>
        )}
      </Header>
      <PostItem
        posts={posts}
      />
      <Button onClick={() => {
        if (user) { navigate(`/post-write`); } else {
          alert("글 작성을 위해 로그인 해주세요.");
          navigate("/login");
        }
      }}>새 글 작성하기</Button>
    </Wrapper>
  );
}

export default MainPage;