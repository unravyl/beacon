'use client';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { IoMdInformationCircleOutline } from 'react-icons/io';

function Page() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  return (
    <section>
      <div className="flex flex-col items-center justify-center h-screen mx-auto">
        <div className="flex flex-col items-center justify-center w-[30rem] bg-[#C7D6E5] rounded-lg p-12 drop-shadow-lg">
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
            <div className="flex justify-center items-center gap-x-1  mb-2">
              <h3 className="text-xl font-semibold">OpenAI API Key</h3>
              <div
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
                className="relative"
              >
                <IoMdInformationCircleOutline
                  size={20}
                  className="cursor-pointer"
                />
                {tooltipVisible && (
                  <div className="absolute bottom-0 left-5 mt-2 p-3 w-96 bg-white border border-black text-justify rounded shadow-lg z-10 text-xs ">
                    <p className="text-sm mb-1">
                      <strong>How to Get Your OpenAI API Key:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Visit the{' '}
                        <a
                          href="https://www.openai.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          OpenAI website
                        </a>{' '}
                        and sign up for an account if you don't have one, or log
                        in if you already do.
                      </li>
                      <li>
                        Go to the API section by clicking on the dashboard in
                        the top-right corner and selecting "API keys" from the
                        sidebar.
                      </li>
                      <li>
                        Click on "Create new secret key" to generate a new API
                        key.
                      </li>
                      <li>
                        After generating, copy the key and paste it in the input
                        field to use beacon services.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <input
              className="w-full h-10 px-2 pe-10 rounded placeholder-[#C3C3C3]"
              placeholder="Enter your API Key to get started..."
            ></input>
            <div className="flex gap-2 my-4 items-center justify-between">
              <button className=" bg-white rounded-md shadow-md py-3 px-4  flex justify-between items-center hover:bg-opacity-50">
                Logout
              </button>
              <button className=" text-center bg-gradient-to-r from-accent via-accent to-secondary text-white rounded-md shadow-md py-3 px-4 over:brightness-150">
                Continue to Setup
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

export default Page;
