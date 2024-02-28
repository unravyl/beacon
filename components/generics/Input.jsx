"use client";
import { React } from "react";

function Input({ title, post, setPost }) {
  const addInput = () => {
    setPost([...post, ""]);
  };

  const removeInput = (index) => {
    const updatedInputs = [...post];
    updatedInputs.splice(index, 1);
    setPost(updatedInputs);
  };

  const handleInputChange = (index, value) => {
    const updatedPost = [...post];
    updatedPost[index] = value;
    setPost(updatedPost);
  };

  return (
    <div>
      <div className="flex flex-col w-[18rem]">
        <label htmlFor={title} className="text-lg pb-[0.2rem]">
          {title}
        </label>

        <div className="w-full flex flex-col gap-2 items-center justify-center">
          {post.map((element, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-center"
            >
              <input
                type="text"
                className="rounded-md w-full border-[#DAE0EC] bg-[#D6DEF0] shadow-sm border-2 text-black text-lg"
                value={element}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <button onClick={() => removeInput(index)} className="border-[0.001rem] border-transparent flex items-center justify-center h-[1rem] rounded-full hover:border-[#0c1323]">
                <i className="bx bx-x text-md"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {post.length < 5 && (
        <button onClick={addInput} >
          <div className=" flex items-center justify-center h-[1rem] ">
            <i className="bx bx-plus border-[0.001rem] rounded-full mt-2 border-transparent hover:border-[#0c1323]"></i>
          </div>
        </button>
      )}
    </div>
  );
}

export default Input;
