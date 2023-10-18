import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";

const Wrapper = styled.main`
  flex-grow: 3;
  border-left: 1px solid white;
  border-right: 1px solid white;
`;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
    </Wrapper>
  );
}
