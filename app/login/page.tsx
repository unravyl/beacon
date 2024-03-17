import React from 'react';
import Image from 'next/image';

function page() {
  return (
    <section>
      <div className="flex flex-col items-center justify-center h-screen mx-auto">
        <div className="flex flex-col items-center justify-center w-[26rem] h-3/4 bg-[#C7D6E5] rounded-lg px-12">
          <header className="flex flex-col items-center justify-center w-full">
            <Image
              src="/generics/logo.png"
              alt="beacon logo"
              className="w-[80px] h-[80px]"
              width={80}
              height={80}
            />
            <div className="flex flex-col">
              <h1 className="text-[32px] leading-none font-bold mb-0.5">
                Bea<span className="text-[#4D6FBD]">con</span>
              </h1>
            </div>
          </header>
          <main className="w-full mt-4">
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

            <button className="bg-gradient-to-r from-accent via-accent to-secondary text-white font-semibold px-4 rounded-md shadow-md mt-8 mb-1 px-6 h-10 w-full transition duration-500 ease-in-out hover:from-secondary hover:to-accent">
              Sign In
            </button>
            <button className="flex items-center justify-between bg-white text-black rounded-md shadow-md font-semibold px-4 my-1 h-10 w-full hover:bg-secondary hover:text-white">
              <Image
                src="/generics/google-logo.svg"
                alt="beacon logo"
                className="w-[26px] h-[26px]"
                width={20}
                height={20}
              />
              <span className="w-full align-center">Sign In with Google</span>
            </button>

            <span className="flex flex-row justify-between">
              <h3 className="text-[16px] font-bold text-[#7789B6]">
                Don't have an account?
              </h3>
              <h3 className="text-[16px] font-bold text-[#586482] hover:text-accent">
                <a href="\signup">Sign Up</a>
              </h3>
            </span>
          </main>
        </div>
      </div>
    </section>
  );
}

export default page;
