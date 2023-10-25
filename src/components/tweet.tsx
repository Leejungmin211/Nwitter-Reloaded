import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, db, storage } from '../firebase';
import ImageFileIcon from './image-file-icon';
import { Tweet } from './timeline';
import { BsTrash } from 'react-icons/bs';
import { GoPencil } from 'react-icons/go';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const Wrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid var(--color-lightgray);
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

const Payload = styled.p`
  margin: 12px 0;
  font-size: 15px;
`;

const TextArea = styled.textarea`
  font-size: 15px;
  padding-top: 13px;
  width: 100%;
`;

const Image = styled.img`
  max-height: 300px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.div`
  color: var(--color-gray5);
  width: 23px;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export default function TweetCard({
  username,
  photo,
  tweet,
  userId,
  id,
}: Tweet) {
  const user = auth.currentUser;
  const [isEdit, setIsEdit] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onChangeTweet = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value);
  };

  const onEditTweet = async () => {
    setIsEdit(true);
  };

  const onCompleteTweet = async () => {
    if (!user || tweet === '' || tweet.length > 180) return;
    try {
      const preTweet = doc(db, 'tweets', id);
      console.log(preTweet);
      await updateDoc(preTweet, {
        tweet: editTweet,
      });
      if (imageFile) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        const result = await uploadBytes(photoRef, imageFile);
        const url = await getDownloadURL(result.ref);
        await updateDoc(preTweet, {
          photo: url,
        });
      }
      setImageFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setIsEdit(false);
    }
  };

  const onDeleteTweet = async () => {
    const ok = confirm('Are you sure you want to delete this tweet?');
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, 'tweets', id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <div>
        <Username>{username}</Username>
        {isEdit ? (
          <div>
            <TextArea
              value={editTweet}
              maxLength={180}
              onChange={onChangeTweet}
              required
            />
          </div>
        ) : (
          <Payload>{tweet}</Payload>
        )}
      </div>
      {photo ? <Image src={photo} /> : null}
      <div>
        {user?.uid === userId ? (
          <ButtonWrapper>
            {isEdit ? (
              <>
                <ImageFileIcon
                  id={id}
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                />
                <Button onClick={onCompleteTweet}>
                  <AiOutlineCheckCircle />
                </Button>
              </>
            ) : (
              <Button onClick={onEditTweet}>
                <GoPencil />
              </Button>
            )}
            <Button onClick={onDeleteTweet}>
              <BsTrash />
            </Button>
          </ButtonWrapper>
        ) : null}
      </div>
    </Wrapper>
  );
}
