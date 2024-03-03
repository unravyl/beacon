'use client';
import { useEffect, useState } from 'react';
import { useUserContext } from '@/context/UserContext';
import { refreshUserData, updateUserProfile } from '@/db/store';
import Image from 'next/image';
import Spinner from '@/components/generics/Spinner';
import { useRouter } from 'next/navigation';
import { ProfileInterface } from '@/interface/authInterface';


interface FieldInterface {
  [key: string]: string;
}

interface EditModeInterface {
  [key: string]: boolean;
}

const inputFields = [
  'Interests',
  'Career History',
  'Strengths',
  'Weaknesses',
  'Educational Background',
];

const userFields = [
  'interest',
  'history',
  'strength',
  'weakness',
  'education',
]

function Details() {
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const [editMode, setEditMode] = useState({} as EditModeInterface);
  const [fieldValues, setFieldValues] = useState({} as ProfileInterface);
  const [submit, toSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = (field: string) => {
    setEditMode((prevEditMode) => ({ ...prevEditMode, [field]: true }));
    toSubmit(true)
  };

  
  const handleInputChange = (field: string, value: string | string[]) => {
    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
      [field]: Array.isArray(value) ? value : [value],
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true)
    const updatedProfile: ProfileInterface = {
      interest: fieldValues.interest || [],
      history: fieldValues.history || [],
      strength: fieldValues.strength || [],
      weakness: fieldValues.weakness || [],
      education: fieldValues.education || [],
    };


    await updateUserProfile(user, setUser, updatedProfile);
    await refreshUserData(user, setUser);
    setIsLoading(false)

    // Reset edit mode and field values

    router.push('home');
  };

  useEffect(() => {
    setFieldValues({
      interest: user.profile?.interest || [],
      history: user.profile?.history || [],
      strength: user.profile?.strength || [],
      weakness: user.profile?.weakness || [],
      education: user.profile?.education || [],
    });
  }, [user]);
  return (
    <div className="w-[33rem] mt-2 flex flex-col items-center mx-auto item bg-[white] rounded-lg py-8">
      {isLoading && <Spinner />}
      <div className="text-2xl font-bold">PROFILE</div>
      <div className="h-[10rem] aspect-square relative">
        <Image
          src="https://www.svgrepo.com/show/345418/account-circle.svg"
          alt="profle picture"
          className="object-cover"
          fill
        />
      </div>
      <div className="text-base font-bold">{'Name'.toUpperCase()}</div>
      <div className="text-xs mt-[-6px]">Email</div>

      <div className="w-[20rem] mt-8">
        {inputFields.map((input: string, index) => (
          <div key={input} className="flex flex-col">
            <div className="flex flex-row justify-between text-xs items-center">
              <h1>{input.toUpperCase()}</h1>
            </div>
            <div className="flex justify-between p-2">
                  <input
                    type="text"
                    value={fieldValues[userFields[index]] || 's'}
                    onChange={(e) => handleInputChange(userFields[index], e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                    disabled={!editMode[input]}
                  />
                  <button
                    onClick={() => handleEditClick(input)}
                    className="relative w-[20px] h-[20px]"
                  >
                    <Image
                      src="https://img.icons8.com/?size=24&id=86372&format=png"
                      alt="Edit"
                      className="object-cover"
                      fill
                    />
                  </button>
            </div>
            <hr className="mb-2"></hr>
          </div>
        ))}
        <div className='mt-6 flex items-center justify-center w-full'>
        {submit && (
          <button onClick={handleSubmit} className=' bg-gray-800 text-lg font-semibold text-white px-4 py-2 '>
            Submit
          </button>
        )}
        </div>
      </div>
    </div>
  );
}

export default Details;


