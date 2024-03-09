'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// components
import FormQuestions from './FormQuestions';
import Spinner from '@/components/generics/Spinner';

// utils
import { cleanUserProfile } from '@/utils/userUtils';
import { postUserInfo } from '@/db/store';
import { insertCareerNodes } from '@/utils/graphUtils';
import { NodeInterface } from '@/interface/graphInterface';

function SetupForm() {
  const instructionList = [
    {
      title: 'Set Up Your Data',
      description: "Input all necessary information for Beacon's AI analysis",
    },
    {
      title: 'Generate Career Graph',
      description:
        'Beacon will craft a visual career roadmap tailored specifically to you',
    },
    {
      title: 'Explore Job Descriptions',
      description:
        'Interact with job description nodes to get detailed insights into different roles',
    },
    {
      title: 'Expand Nodes',
      description:
        'By expanding a job description node, Beacon provides solutions on how to reach that specific job title',
    },
  ];

  const [formItems, setFormItems] = useState([
    {
      question: 'Interest',
      description:
        'Briefly describe your interests, passions, and what motivates you in your career',
      answers: [],
    },
    {
      question: 'History',
      description:
        'Summarize your past work experiences, projects, and any significant milestones in your career journey.',
      answers: [],
    },
    {
      question: 'Strengths',
      description:
        'Identify your key strengths, skills, and attributes that contribute to your professional success',
      answers: [],
    },
    {
      question: 'Weaknesses',
      description:
        'Reflect on areas where you feel you may need improvement or development',
      answers: [],
    },
    {
      question: 'Education',
      description:
        'Outline your educational background, including degrees, certifications, and relevant courses',
      answers: [],
    },
  ]);

  const [questionNumber, setQuestionNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { user, setUser } = useUserContext();

  // computed
  const isLastStep = questionNumber == formItems.length - 1;

  // methods
  const moveNext = () => {
    setQuestionNumber(questionNumber + 1);
  };

  const movePrev = () => {
    setQuestionNumber(questionNumber - 1);
  };

  const submit = async () => {
    setIsLoading(true);

    const profile: { [key: string]: any } = {};
    formItems.forEach((question) => {
      profile[question.question] = question.answers;
    });
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-dvh text-white">
      <main className="flex flex-col px-10 py-6">
        <header className="flex">
          <Image
            src="/generics/logo.png"
            alt="beacon logo"
            className="w-[80px] h-[80px] "
            width={80}
            height={80}
          />
          <div className="flex flex-col">
            <h1 className="text-[48px] leading-none font-semibold mb-0.5">
              Bea<span className="text-[#A2C5E8]">con</span>
            </h1>
            <p className="text-[16px] leading-none">
              Your AI Career Guidance Application
            </p>
            <p className="text-[12px] leading-none font-extralight">
              Creating Personalized Career Roadmaps for Everyone
            </p>
          </div>
        </header>
        <section className="flex flex-col flex-grow justify-center pb-[80px] gap-6 pl-6">
          {instructionList.map((item, index) => (
            <div className="flex gap-4 items-center" key={'item-' + index}>
              <div className="w-[25px] h-[25px] min-w-[25px] min-h-[25px] flex justify-center bg-[#C7D6E5] rounded-full">
                <div className="flex flex-col justify-center">
                  <p className="text-[#0C1323] text-[16px] font-bold">
                    {index + 1}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-[#C7D6E5] text-[20px] font-bold">
                  {item.title}
                </h2>
                <p className="text-[14px]">{item.description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <aside className="text-[#0F172A] bg-[#DBEDFF] flex flex-col gap-5 p-20">
        <div>
          <h2 className="text-[40px] font-bold leading-none mb-1">
            Setup your profile!
          </h2>
          <p className="text-[16px] font-medium leading-none opacity-80">
            Name: {user.name} | Email: {user.email}
          </p>
        </div>
        <div className="flex-grow flex flex-col justify-center pb-20 gap-5">
          <FormQuestions
            formItems={formItems}
            setFormItems={setFormItems}
            questionNumber={questionNumber}
          />
          <div className="flex gap-1">
            {questionNumber > 0 && (
              <button
                onClick={movePrev}
                className="bg-white rounded-md shadow-md px-4 py-3 flex items-center hover:bg-opacity-50"
              >
                <i className="bx bx-chevrons-left" />
                back
              </button>
            )}
            {questionNumber < formItems.length - 1 ? (
              <button
                onClick={moveNext}
                className="bg-gradient-to-r from-accent via-accent to-secondary text-white py-2 px-4 rounded-md shadow-md px-4 py-3 flex items-center hover:brightness-150"
              >
                next
                <i className="bx bx-chevrons-right" />
              </button>
            ) : (
              <button
                onClick={submit}
                className="bg-gradient-to-r from-accent via-accent to-secondary text-white py-2 px-4 rounded-md shadow-md px-6 py-3 blink"
              >
                Generate Custom Roadmap
              </button>
            )}
          </div>
        </div>
      </aside>
      {isLoading && <Spinner />}
    </div>
  );
}

export default SetupForm;

