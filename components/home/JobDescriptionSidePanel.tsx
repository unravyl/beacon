'use client';
import React from 'react';

interface PropsInterface {
  close: () => void;
  details: {
    title: string;
    salary?: string;
    description: string;
    companies?: string[];
    qualifications?: string[];
  };
}

function JobDescriptionSidePanel({ details, close }: Readonly<PropsInterface>) {
  const description = [
    { title: 'Position Title', info: details.title },
    { title: 'Description', info: details.description },
    { title: 'Salary', info: details.salary },
    {
      title: 'Top Companies Hiring',
      info: details.companies ? details.companies.join(', ') : 'Unknown',
    },
    {
      title: 'Qualification',
      info: details.qualifications
        ? details.qualifications.join(', ')
        : 'Unknown',
    },
  ];

  return (
    <div className="absolute right-0 top-0 flex-1 flex flex-col shadow-lg h-dvh rounded-l-xl w-lvw sm:w-[500px]">
      <div className="flex items-center justify-between rounded-tl-xl bg-[#2a4175] text-white p-3">
        <p className="text-xl font-bold pl-2">Job Description</p>
        <button onClick={close}>
          <i className="bx bx-x text-3xl"></i>
        </button>
      </div>
      <div className="grow flex flex-1 flex-col p-3 overflow-y-auto h-full bg-white rounded-bl-xl text-[#0c1323]">
        {description.map((item, index) => (
          <div
            key={item.title.concat(index.toString())}
            className=" flex p-4 items-center border-b-2 border-[#c8d0e0]"
          >
            <h1 className="font-bold h-full w-[30%]">{item.title}:</h1>
            <p className="pl-2 text-2px w-[70%]">{item.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobDescriptionSidePanel;

