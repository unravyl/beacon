'use client';

import React from 'react'

export default function JobTitleModal(props) {
    const {title="job title", width="300px", height="200px"} = props;
    const modalStyle = {
        width: width,
        height: height
      };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full" style={modalStyle}>
                <h3>{title}</h3>
                <button>Summary</button>
                <button>Expand</button>
            </div>
        </div>
    )
}