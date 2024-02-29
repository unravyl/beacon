"use client"
import React from 'react'
import Description from '@/components/generics/Description'

interface PropsInterface {
    close: () => void;
    details:{
        title: string;
        description: string
    };
}

function Details({details, close}: Readonly<PropsInterface>) {

    return (
        <div className="relative flex justify-center items-center rounded-l-xl w-[65rem]">
            <div className=" bg-white flex-1 shadow-lg h-full flex flex-col  w-full rounded-l-xl overflow-hidden overflow-y-auto" >
                <div className="flex relative items-center justify-between rounded-l-lg">
                    <p className="text-xl font-bold rounded-l-sm pl-5 bg-[#2a4175] text-white pt-2 pb-5 w-full">Path Description</p>
                    <button className='absolute right-2 top-1' onClick={close}>
                        <i className=" bx bx-x text-md text-3xl text-white"></i>
                    </button>
                </div>
                < Description details={details}/>
            </div>
        </div>
    )
}

export default Details;
