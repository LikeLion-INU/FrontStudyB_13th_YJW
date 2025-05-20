import Button from "../button";
import Header from "../Header";
import styled from "styled-components";
import { useState } from 'react';
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
text-align: center;
`;

const Title = styled.h2`
font-size: 1.4rem;
color: white;
margin:0;
`;

const Input = styled.input`
    padding: 5px;
    margin-top: 5px;
    width: 250px;
`

const LoginForm = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 20px;
margin: auto;
justify-content: center;
margin-top: 50px;
`

function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:8000/login', { email, password });
            localStorage.setItem('token', res.data.accessToken);
            login(res.data.user);
            alert('로그인 성공');
            navigate(`/`);
        } catch (err) {
            alert('로그인 실패');
        }
    };

    return (

        <Wrapper>
            <Header>
                <Title>로그인 화면입니다.</Title>
            </Header>
            <LoginForm>
                <br></br>
                <div>
                    <Input value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="아이디 혹은 전화번호"></Input>
                    <br></br>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호"></Input>
                </div>
                <Button onClick={handleLogin}>로그인</Button>
            </LoginForm>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px", justifyContent: "center" }}>
                <p>회원이 아니시라면?</p>
                <Button onClick={() => navigate(`/signup`)}>회원가입</Button>
            </div>


        </Wrapper>

    );
}
export default LoginPage;