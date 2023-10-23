import { styled } from "styled-components";

export const Wrapper = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 420px;
padding; 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
`;

export const Button = styled.button`
  background-color: white;
  padding: 10px 20px;
  border-radius: 50px;
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
  color: #e64343;
`;

export const Switcher = styled.span`
  margin-top: 10px;
  a {
    color: #4292b7;
  }
`;
