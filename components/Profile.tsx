"use client";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";

interface FieldInterface {
    [key: string]: string   
}

interface EditModeInterface {
    [key: string]: boolean
}

const inputFields = ["Interests", "Career History", "Educational Background", "Strengths", "Weaknesses"]

function Details() {
    const { setUser } = useUserContext();
    const [editMode, setEditMode] = useState({} as EditModeInterface);
    const [fieldValues, setFieldValues] = useState({} as FieldInterface);

    const handleEditClick = (field: string) => {
        setEditMode(prevEditMode => ({ ...prevEditMode, [field]: true }));
    };

    const handleInputChange = (field: string, value: string) => {
        setFieldValues(prevFieldValues => ({ ...prevFieldValues, [field]: value }));
    };

    const handleSaveClick = (field:string) => {
        // Update the user data with the new value
        setUser(prevUser => ({ ...prevUser, [field]: fieldValues[field] }));
        // Set edit mode to false
        setEditMode(prevEditMode => ({ ...prevEditMode, [field]: false }));
    };

    return (
        <div className="w-[42rem] mt-2 flex flex-col items-center mx-auto item bg-[white] rounded-lg py-8">
            <div className="text-2xl font-bold">PROFILE</div>
            <img src="https://www.svgrepo.com/show/345418/account-circle.svg" className="w-[10rem]" />
            <div className="text-base font-bold">{"Name".toUpperCase()}</div>
            <div className="text-xs mt-[-6px]">Email</div>

            <div className="w-[20rem] mt-8">
                {inputFields.map((input:string, index) => (
                    <div key={input} className="flex flex-col">
                        <div className="flex flex-row justify-between text-xs items-center">
                            <h1>{input.toUpperCase()}</h1>
                        </div>
                        <div className="flex justify-between p-2">
                            {editMode[input] ? (
                                <>
                                    <input
                                        type="text"
                                        value={fieldValues[input] || ''}
                                        onChange={(e) => handleInputChange(input, e.target.value)}
                                        className="border border-gray-300 rounded px-2 py-1"
                                    />
                                    <button onClick={() => handleSaveClick(input)}>Save</button>
                                </>
                            ) : (<>
                                <div className="justify-start overflow-x-auto  w-[17rem]">
                                    {fieldValues[input]}
                                </div>
                                <button onClick={() => handleEditClick(input)}>
                                    <img src="https://img.icons8.com/?size=24&id=86372&format=png" className="w-[20px] h-[20px]" alt="Edit" />
                                </button>
                            </>

                            )}
                        </div>
                        <hr className="mb-2"></hr>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Details;
