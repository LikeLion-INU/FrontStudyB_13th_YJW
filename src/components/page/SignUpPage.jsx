import Header from "../Header";
import styled from "styled-components";
import Button from "../button";
import { useState } from "react";
import axios from "axios";

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

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const res = await axios.post('http://localhost:8000/register', {
                email,
                password
            });
            alert("회원가입 성공! 이제 로그인하세요.");
            console.log(res.data); // { accessToken, user }
        } catch (err) {
            console.error(err);
            alert("회원가입 실패! 이미 존재하는 이메일일 수도 있어요.");
        }
    };

    return (
        <Wrapper>
            <Header>
                <Title>회원가입 페이지입니다.</Title>
            </Header>
            <LoginForm>
                <br></br>
                <div>
                    <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일 입력" />
                    <br></br>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 입력" />
                </div>
                <Button onClick={handleSignup}>회원가입하기</Button>
            </LoginForm>
        </Wrapper>
    );
}

export default SignUpPage;