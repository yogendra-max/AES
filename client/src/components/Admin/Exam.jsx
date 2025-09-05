import React, { useState } from 'react';
// import "./Admin.css"
import { Link } from 'react-router-dom';
const Exam = () => {
  const [temp, setTemp] = useState({
    semester1: { mid:{ isComplete: true }, internal: { isComplete: true }, sem: { isComplete: false } },
    semester2: { mid:{ isComplete: true }, internal: { isComplete: false }, sem: { isComplete: false } },
    semester3: { mid:{ isComplete: false }, internal: { isComplete: false }, sem: { isComplete: false } },
    semester4: { mid:{ isComplete: true }, internal: { isComplete: true }, sem: { isComplete: false } },
    semester5: {
         mid:{ isComplete: false }, internal: { isComplete: false}, sem: { isComplete: false } },
    semester6: { mid:{ isComplete: true }, internal: { isComplete: true }, sem: { isComplete: false } },
  });
  return (
    <div>
      <div className='absolute left-[50%] translate-x-[-50%] w-full text-center'>
        <h2>Exams</h2>

        {Object.entries(temp).map(([semesterKey, exams]) => (
        <Link to={`/admin/Exam/${semesterKey}`}>
        <div
            key={semesterKey}
            className='mt-2 w-[80%] bg-gray-300 h-32 rounded-md relative left-[50%] translate-x-[-50%]'
          >
            <h3 className='capitalize'>{semesterKey}</h3>
            <div className='flex gap-5 justify-center absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%]'>
              <strong className={exams.mid.isComplete ?"etypst":"etypsf"}>MidExam </strong>
              <strong className={exams.internal.isComplete ?"etypst":"etypsf"}>Internals</strong>
              <strong className={exams.sem.isComplete ?"etypst":"etypsf"}>Semester</strong>
            </div>
          </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Exam;
