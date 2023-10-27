import { styled } from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AuthContainer = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  border: 1px solid var(--color-lightgray);
  border-radius: 5px;
  gap: 30px;
`;

export const Title = styled.h1`
  height: 30px;
  margin-bottom: 15px;
  font-size: 42px;
  img {
    height: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  border-top: 1px solid var(--color-linegray);
  padding-top: 30px;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border: 1px solid var(--color-lightgray);
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
`;

export const Button = styled.button`
  background-color: var(--color-brand);
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const ErrorMessage = styled.span`
  font-weight: 600;
  color: var(--color-rose);
`;

export const SwitcherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Switcher = styled.span`
  margin-top: 10px;
  a {
    color: var(--color-accent);
    margin-left: 5px;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: var(--color-darkblue);
      transition: color 0.3s ease-in-out;
    }
  }
`;
