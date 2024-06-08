import React from 'react';
import Image from 'next/image';

function page() {
  return (
    <section>
      <div className="flex flex-col items-center justify-center h-screen mx-auto">
        <div className="flex flex-col items-center justify-center w-[26rem] bg-[#C7D6E5] rounded-lg p-12 drop-shadow-lg">
          <header className="flex flex-col items-center justify-center w-full mb-6">
            <Image
              src="/generics/logo.png"
              alt="beacon logo"
              className="w-[80px] h-[80px] drop-shadow-lg"
              width={80}
              height={80}
            />
            <div className="flex flex-col">
              <h1 className="text-[32px] leading-none font-bold mb-0.5">
                Bea<span className="text-[#4D6FBD]">con</span>
              </h1>
            </div>
          </header>
          <main className="w-full">
            <h3 className="text-[16px] font-semibold">Username</h3>
            <input
              className="w-full h-10 p-2 pe-10 rounded placeholder-[#C3C3C3]"
              placeholder="Enter your username..."
            ></input>
            <h3 className="text-[16px] font-semibold mt-2">Password</h3>
            <input
              type="password"
              className="w-full h-10 p-2 pe-10 rounded placeholder-[#C3C3C3]"
              placeholder="Enter your password..."
            ></input>

            <div className="flex flex-col gap-2 my-5 items-center">
              <button className="w-full text-center bg-gradient-to-r from-accent via-accent to-secondary text-white rounded-md shadow-md px-4 py-3 hover:brightness-150">
                Sign In
              </button>
              <button className="w-full bg-white rounded-md shadow-md px-4 py-3 flex justify-between items-center hover:bg-opacity-50">
                <Image
                  src="/generics/google-logo.svg"
                  alt="beacon logo"
                  className="w-[26px] h-[26px]"
                  width={20}
                  height={20}
                />
                <span className="w-full align-center">Sign In with Google</span>
              </button>
            </div>

            <div className="flex flex-row justify-between">
              <h3 className="text-[16px] text-[#7789B6]">
                Don&apos;t have an account?
              </h3>
              <h3 className="text-[16px] font-semibold text-[#586482] hover:text-accent">
                <a href="\signup">Sign Up</a>
              </h3>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

export default page;

