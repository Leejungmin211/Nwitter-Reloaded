import styled from 'styled-components';
import PostTweetForm from '../components/post-tweet-form';
import Timeline from '../components/timeline';

const Wrapper = styled.main`
  flex-grow: 3;
  border-left: 1px solid var(--color-lightgray);
  border-right: 1px solid var(--color-lightgray);
`;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}
