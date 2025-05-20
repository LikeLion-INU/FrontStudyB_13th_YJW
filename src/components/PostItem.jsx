import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const Table = styled.table`
width: 85%;
border-collapse: collapse;
margin : 30px auto;
`;

const ColGroup = styled.colgroup`
col.title {
    width: 70%;
    text-align: left;
}
col.date {
    width: 30%;
    text-align: right;
}
`;

const Row = styled.tr`
border-bottom: 1px solid #ddd;
&:hover {
    background-color: #f9f9f9;
}
`;

const TitleCell = styled.td`
padding: 10px;
text-align: left;
`;

const DateCell = styled.td`
padding: 10px;
text-align: right;
color: gray;
font-size: 0.9rem;
`;

const StyledLink = styled(RouterLink)`
  color: black;
  text-decoration: none;
  font-family: "나눔고딕", sans-serif;
`;

function PostItem({ posts }) {
    return (
        <Table>
            <ColGroup>
                <col className="title" />
                <col className="date" />
            </ColGroup>
            <tbody>
                {posts.map((post) => (
                    <Row key={post.id}>
                        <TitleCell>
                            <StyledLink to={`/post/${post.id}`}>{post.title}</StyledLink>
                        </TitleCell>
                        <DateCell>{post.date}</DateCell>
                    </Row>
                ))}
            </tbody>
        </Table>
    );
}

export default PostItem;
