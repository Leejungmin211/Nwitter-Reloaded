import styled from "styled-components";
import { BsImage } from "react-icons/bs";
import React, { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  border-bottom: 1px solid white;
  padding: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  &::placeholder {
    font-size: 16px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid white;
`;

const AttachFileLabel = styled.label`
  flex-grow: 1;
  margin-right: 15px;
`;

const FileIcon = styled.div`
  width: 23px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const FileName = styled.div`
  font-size: 13px;
  overflow: hidden;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.button`
  padding: 10px 15px;
  border-radius: 30px;
  background-color: #6060c9;
  color: white;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const { files } = e.target;
    if (files && files.length === 1) {
      setImageFile(files[0]);
    }
  };

  return (
    <Form>
      <TextArea
        rows={5}
        maxLength={180}
        value={tweet}
        onChange={onTweetChange}
        placeholder="What is happening?!"
      />
      <ButtonContainer>
        <AttachFileLabel htmlFor="file">
          {imageFile ? (
            <FileName>{imageFile.name}</FileName>
          ) : (
            <FileIcon>
              <BsImage />
            </FileIcon>
          )}
        </AttachFileLabel>
        <AttachFileInput
          onChange={onFileChange}
          id="file"
          type="file"
          accept="image/*"
        />
        <SubmitBtn type="submit">
          {isLoading ? "Posting..." : "Post Tweet"}
        </SubmitBtn>
      </ButtonContainer>
    </Form>
  );
}
