'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/generics/Input';
import { useUserContext } from '@/context/UserContext';
import { postUserInfo } from '@/db/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/generics/Spinner';
import { NodeInterface } from '@/interface/graphInterface';
import { insertCareerNodes } from '@/utils/graphUtils';
import { cleanUserProfile } from '@/utils/userUtils';

function Details() {
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const [interest, setInterest] = useState(['']);
  const [history, setHistory] = useState(['']);
  const [strength, setStrength] = useState(['']);
  const [weakness, setWeakness] = useState(['']);
  const [education, setEducation] = useState(['']);

  const [isLoading, setIsLoading] = useState(false);
  const [canSubmitUserData, setCanSubmitUserData] = useState(false);

  const submit = async () => {
    setIsLoading(true);
    const profile = {
      interest: interest,
      history: history,
      strength: strength,
      weakness: weakness,
      education: education,
    };
    const cleanedProfile = cleanUserProfile(profile);
    postUserInfo(user, cleanedProfile);
    const { data } = await axios.post(
      'http://127.0.0.1:8000/api/generate-top-careers/',
      { profile: cleanedProfile }
    );
    const rootNode: NodeInterface = {
      id: 'Node 1',
      label: 'You',
      details: {
        description: 'Root Node',
      },
      group: 1,
    };
    //create career nodes
    insertCareerNodes(user, setUser, data.careers, rootNode);
    router.push('/home');
  };

  useEffect(() => {
    console.log('LOG: User Profile', user.links);
    if (user.links?.length || !user.email) {
      setCanSubmitUserData(true);
    }
  }, []);

  return (
    <div className="w-[24rem] mt-4 flex flex-col items-center mx-auto item bg-[white] rounded-lg py-8">
      {isLoading && <Spinner />}
      <div className="text-2xl font-bold">Setup your Profile</div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <div className="inputs mt-5 gap-1 flex flex-col">
        <Input title="Interest" post={interest} setPost={setInterest} />
        <Input title="History" post={history} setPost={setHistory} />
        <Input title="Strengths" post={strength} setPost={setStrength} />
        <Input title="Weakness" post={weakness} setPost={setWeakness} />
        <Input title="Education" post={education} setPost={setEducation} />
      </div>
      <button
        className="bg-[#0c1323] mt-4 rounded-md text-white px-4 py-1"
        onClick={submit}
        disabled={canSubmitUserData}
      >
        Submit
      </button>
    </div>
  );
}

export default Details;

