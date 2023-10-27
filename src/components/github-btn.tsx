import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';

const Button = styled.button`
  background-color: var(--color-brand);
  width: 100%;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 5px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  &:hover {
    opacity: 0.8;
  }
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const githubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={githubLogin}>
      <Logo src="github-logo.svg" />
      Continue with Github
    </Button>
  );
}
