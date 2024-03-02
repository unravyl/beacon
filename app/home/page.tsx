'use client';

import { useState, useEffect } from 'react';
import { refreshUserData } from '@/db/store';
import { useUserContext } from '@/context/UserContext';
import Image from 'next/image';

import Graph from '@/components/home/Graph';

function Page() {
  const { user, setUser } = useUserContext();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleUserRefresh = async () => {
    await refreshUserData(user, setUser);
  };

  useEffect(() => {
    if (user.links?.length) {
      handleUserRefresh();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="canvas-container">
      <div className="absolute top-0 left-0 p-5 flex items-center">
        <Image
          src="/generics/logo.png"
          alt="beacon logo"
          className="w-[80px] h-[80px]"
        />
        <p className="text-white text-5xl font-semibold">Beacon</p>
      </div>
      <button className="absolute right-0 top-0 p-5">
        <i className="bx bx-face text-white text-5xl"></i>
      </button>
      <Graph width={windowSize.width} height={windowSize.height} />
    </div>
  );
}

export default Page;

