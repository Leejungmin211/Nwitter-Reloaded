import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { styled } from 'styled-components';
import { auth } from '../firebase';
import { ErrorMessage } from './auth-components';

const Link = styled.span`
  color: var(--color-accent);
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: var(--color-darkblue);
    transition: color 0.3s ease-in-out;
  }
`;

export default function PasswordReset({ email }: { email: string }) {
  const [error, setError] = useState('');
  const resetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    }
  };
  return (
    <>
      <Link onClick={resetEmail}>Forgot your password?</Link>
      {error !== '' ? <ErrorMessage>{error}</ErrorMessage> : null}
    </>
  );
}
