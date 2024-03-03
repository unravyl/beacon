'use client';

import React from 'react';

interface PropsInterface {
  close: () => void;
  details: {
    title: string;
    description: string;
    link?: string;
  };
}

function SimpleSidePanel({ details, close }: Readonly<PropsInterface>) {
  const { title, description, link } = details;

  return (
    // Adjusted classes for full viewport height and right edge positioning
    <div className="fixed top-0 right-0 h-full flex justify-end items-start">
      <div className="bg-white shadow-lg h-full flex flex-col w-[25rem] rounded-l-xl overflow-hidden">
        <div className="flex items-center justify-between bg-[#2a4175] text-white p-5">
          <p className="text-xl font-bold">{title}</p>
          <button className="text-3xl" onClick={close}>
            <i className="bx bx-x"></i>
          </button>
        </div>
        <div className="p-5 overflow-y-auto">
          <p className="text-md text-black">{description}</p>
        </div>
        {link && (
          <div className="w-full flex px-5 pb-5">
            <a
              className="px-4 py-3 bg-[#2a4175] text-white text-sm rounded-md w-fit"
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              Explore More
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default SimpleSidePanel;
