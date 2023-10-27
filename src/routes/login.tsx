import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Button,
  Form,
  ErrorMessage,
  Input,
  Switcher,
  Title,
  AuthContainer,
  SwitcherContainer,
  Wrapper,
} from '../components/auth-components';
import GithubButton from '../components/github-btn';
import PasswordReset from '../components/password-reset';
import MeYou from '../../public/MeYou.svg';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading || form.email === '' || form.password === '') return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <AuthContainer>
        <Title>
          <img src={MeYou} alt="logo" />
        </Title>
        <GithubButton />
        <Form onSubmit={handleFormSubmit}>
          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            required
          />
          <Button type="submit">{isLoading ? 'Loading...' : 'Login'}</Button>
        </Form>
        {error !== '' ? <ErrorMessage>{error}</ErrorMessage> : null}
        <SwitcherContainer>
          <Switcher>
            Don't have an account?
            <Link to="/create-account">Create one &rarr;</Link>
          </Switcher>
          <PasswordReset email={form.email} />
        </SwitcherContainer>
      </AuthContainer>
    </Wrapper>
  );
}
