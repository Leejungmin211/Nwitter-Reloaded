import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  Button,
  Form,
  ErrorMessage,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import PasswordReset from "../components/password-reset";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (
      isLoading ||
      form.name === "" ||
      form.email === "" ||
      form.password === ""
    )
      return;
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, { displayName: form.name });
      navigate("/");
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
      <Title>Join x</Title>
      <Form onSubmit={handleFormSubmit}>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          type="text"
          required
        />
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
        <Button type="submit">
          {isLoading ? "Loading..." : "Create Account"}
        </Button>
      </Form>
      {error !== "" ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Switcher>
        Already have an account?
        <Link to="/login">Log in &rarr;</Link>
      </Switcher>
      <PasswordReset email={form.email} />
      <GithubButton />
    </Wrapper>
  );
}
