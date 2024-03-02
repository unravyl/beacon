'use client';

import Spinner from '@/components/generics/Spinner';
import { useUserContext } from '@/context/UserContext';
import { handleSignIn } from '@/db/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { insertUpskillingNodes } from '@/utils/graphUtils';
import axios from 'axios';

export default function Home() {
  const { user, setUser } = useUserContext();
  const [hasAccount, setHasAccount] = useState(false);
  const [hasAccountData, setHasAccountData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginButtonClick = async () => {
    await handleSignIn(setUser, setHasAccount, setHasAccountData);
    setIsLoading(true);
  };

  const handleTestButton = async () => {
    const career = 'Machine Learning Engineer';
    const { data } = await axios.post(
      'http://127.0.0.1:8000/api/generate-upskilling/',
      { career: career }
    );
    console.log('LOGGG', data);
    const startingNodeIdNumber = 1;
    const currentStepNode = {
      id: 'Node 0',
      label: career,
      details: {
        description: 'Cool sht',
      },
      group: 2,
    };
    const nextStepNode = {
      id: 'Node 999',
      label: 'Legal Documents',
      details: {
        description: 'Legal sht',
      },
      group: 4,
    };
    const graphElements = insertUpskillingNodes(
      startingNodeIdNumber,
      data,
      currentStepNode,
      nextStepNode
    );
    console.log('LOGGG', graphElements);
  };

  useEffect(() => {
    if (hasAccountData) {
      router.push('/home');
    } else if (hasAccount) {
      router.push('/register');
    }
  }, [hasAccount, router, hasAccountData]);

  return (
    <main className="flex flex-col items-center h-full bg-center text-white">
      {isLoading && <Spinner />}
      <img src="/logo.png" className="w-[15rem] mt-24" />
      <h1 className="font-bold text-7xl mb-8">Welcome to Beacon!</h1>
      <button
        className="flex flex-row border-2 p-2 gap-x-2 hover:bg-slate-400"
        onClick={handleLoginButtonClick}
      >
        Log In with Google{' '}
        <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" />{' '}
      </button>
    </main>
  );
}
