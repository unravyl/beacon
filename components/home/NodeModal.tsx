import React from 'react';

interface PropsInterface {
  title: string;
  actions: {
    name: string;
    action: () => void;
  }[];
  close: () => void;
}

const NodeModal = (props: PropsInterface) => {
  const { actions, title, close } = props;
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
          {actions.map((a, index) => {
            return (
              <button
                key={index}
                onClick={a.action}
                className="flex-grow px-4 py-2 button-1"
              >
                {a.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NodeModal;
