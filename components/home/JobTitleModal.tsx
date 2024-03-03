'use client';

import React from 'react';

export default function JobTitleModal(props) {
  const { title, close, summary, expand, explore } = props;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-3 rounded-lg shadow-lg w-96 flex flex-col gap-3 justify-between">
        <div className="flex justify-between">
          <p className="text-xl font-bold">{title}</p>
          <button onClick={close}>
            <i className="bx bx-x text-md"></i>
          </button>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <button onClick={summary} className="flex-grow px-4 py-2 button-1">
            Career Summary
          </button>
          <button onClick={expand} className="flex-grow px-4 py-2 button-2">
            Expand Steps
          </button>
          <button onClick={explore} className="flex-grow px-4 py-2 button-2">
            Explore Related Careers
          </button>
        </div>
      </div>
    </div>
  );
}
