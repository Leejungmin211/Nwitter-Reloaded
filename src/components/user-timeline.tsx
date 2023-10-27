import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { Tweet } from './timeline';
import TweetCard from './tweet';

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid var(--color-lightgray);
  margin: 20px 0;
`;

export default function UserTimeline() {
  const user = auth.currentUser;
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, 'tweets'),
      where('userId', '==', user?.uid),
      orderBy('createdAt', 'desc'),
      limit(25),
    );
    const snapshot = await getDocs(tweetsQuery);
    const tweets = snapshot.docs.map(doc => {
      const { photo, tweet, userId, username, createdAt } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      {tweets.map(tweet => (
        <TweetCard key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
