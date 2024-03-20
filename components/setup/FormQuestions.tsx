import React from 'react';
import { useState, useEffect } from 'react';

function FormQuestions(props) {
  const { formItems, setFormItems, questionNumber } = props;
  const [inputText, setInputText] = useState('');

  // methods
  const addAnswer = () => {
    if (!inputText) return;
    const newAnswers = [...formItems[questionNumber].answers, inputText];
    setFormItems((prevFormItems) => {
      const updatedFormItems = [...prevFormItems];
      updatedFormItems[questionNumber].answers = newAnswers;
      return updatedFormItems;
    });

    setInputText('');
  };

  const removeAnswer = (index) => {
    const newAnswers = formItems[questionNumber].answers;
    newAnswers.splice(index, 1);
    setFormItems((prevFormItems) => {
      const updatedFormItems = [...prevFormItems];
      updatedFormItems[questionNumber].answers = newAnswers;
      return updatedFormItems;
    });
  };

  return (
    <div>
      <h3 className="text-[30px] font-bold leading-none">
        {formItems[questionNumber].question}
      </h3>
      <p className="opacity-80 text-[12px] font-light mb-4">
        {formItems[questionNumber].description}
      </p>

      <div className="flex items-center my-2">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addAnswer();
            }
          }}
          type="text"
          placeholder="Type your answer here..."
          className="w-full my-1 h-[40px] p-2 pe-10 rounded-md shadow-md text-accent"
        />
        {inputText.length > 0 && (
          <div className="relative">
            <button
              onClick={addAnswer}
              className={
                'absolute translate-x-[-120%] translate-y-[-50%] bg-accent text-white px-2 py-2 text-[10px] rounded-md hover:brightness-150 shadow-sm ' +
                (!questionNumber && formItems[0].answers.length == 0
                  ? 'blink'
                  : '')
              }
            >
              <i className="bx bx-plus" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {formItems[questionNumber].answers.map((item, index) => (
          <div
            className="flex items-center gap-1 text-[12px] bg-white rounded-full px-2.5 py-1"
            key={index}
          >
            {item}
            <button
              onClick={() => removeAnswer(index)}
              className="flex items-center rounded-full hover:bg-red-300"
            >
              <i className="bx bx-x" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormQuestions;

