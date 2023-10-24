import { styled } from "styled-components";
import { auth, storage } from "../firebase";
import { FaUserCircle } from "react-icons/fa";
import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import UserTimeline from "../components/user-timeline";

const Wrapper = styled.section`
  flex-grow: 3;
  padding: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const AvatarUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid white;
  cursor: pointer;
  .profile-icon {
    width: 100%;
    height: 100%;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarInput = styled.input`
  display: none;
`;
const UserName = styled.span`
  font-size: 22px;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const { files } = e.target;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `profile/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const url = await getDownloadURL(result.ref);
      setAvatar(url);
      await updateProfile(user, {
        photoURL: url,
      });
    }
    console.log(files);
  };

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
          <FaUserCircle className="profile-icon" />
        )}
      </AvatarUpload>
      <AvatarInput
        id="avatar"
        type="file"
        accept="image/*"
        onChange={onChangeImage}
      />
      <UserName>{user?.displayName ? user.displayName : "Anonymous"} </UserName>
      <UserTimeline />
    </Wrapper>
  );
}
