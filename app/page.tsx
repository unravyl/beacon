'use client'

import { useUserContext } from '@/context/UserContext';
import { useAuthContext } from '@/context/AuthContext';
import { handleSignIn } from '@/db/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, setUser } = useUserContext();
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const router = useRouter()

  const handleLoginButtonClick = async () => {
    handleSignIn(setUser, setIsLoggedIn)
  }

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/register');
    }
  }, [isLoggedIn, router])

  return (
    <main className="flex flex-col justify-center items-center h-full bg-center text-white bg-[url('../assets/icons/LandPageBG.svg')] " >
      <h1 className="font-bold text-7xl mb-8">Welcome to Beacon</h1>
      <button className="flex flex-row border-2 p-2 gap-x-2" onClick={handleLoginButtonClick}>Log In with Google <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" /> </button >
    </main >
  );
}
