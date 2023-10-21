import styled from "styled-components";
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ImageFileIcon from "./image-file-icon";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  border-bottom: 1px solid white;
  padding: 20px;
  font-size: 15px;
  color: white;
  background-color: black;
  width: 100%;
  &::placeholder {
    font-size: 1px;
  }
`;

const AttachFileContainer = styled.div`
  flex-grow: 1;
  margin-right: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid white;
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

  const onTweetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (imageFile) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, imageFile);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setImageFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={onTweetSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        value={tweet}
        onChange={onTweetChange}
        placeholder="What is happening?!"
      />
      <ButtonContainer>
        <AttachFileContainer>
          <ImageFileIcon
            id="newForm"
            imageFile={imageFile}
            setImageFile={setImageFile}
          />
        </AttachFileContainer>
        <SubmitBtn type="submit">
          {isLoading ? "Posting..." : "Post Tweet"}
        </SubmitBtn>
      </ButtonContainer>
    </Form>
  );
}
