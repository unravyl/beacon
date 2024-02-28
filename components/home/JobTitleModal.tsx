'use client';

import React from 'react'

export default function JobTitleModal(props) {
    const {title="job title", width="300px", height="200px", close} = props;
    const modalStyle = {
        width: width,
        height: height
      };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-3 rounded-lg shadow-lg max-w-sm w-full flex flex-col justify-between" style={modalStyle}>
                <div className="flex justify-between">
                    <p className="text-xl font-bold">{title}</p>
                    <button onClick={close}>
                        <i className="bx bx-x text-md"></i>
                    </button>
                </div>
                <div className="flex justify-center space-x-2">
                    <button className="flex-grow px-4 py-2 button-1">Summary</button>
                    <button className="flex-grow px-4 py-2 button-2">Expand</button>
                </div>
            </div>
        </div>
    )
}