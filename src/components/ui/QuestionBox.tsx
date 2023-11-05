import { Button } from '@nextui-org/react';
import React from 'react';

const QuestionBox = ({ handleSubmit }) => {
  return (
    <div
      className="w-[80%] h-[20rem] bg-[#4D2C5E] flex flex-col justify-evenly items-center rounded-lg 
      bg-[url(/double_circles.png),_url(/double_circles_reversed.png),_url(/orange_arrow.png),_url(/lightbulb.png)] 
    bg-[length:8rem,_8rem,_8rem,_8rem] bg-[repeat:no-repeat,_no-repeat,_no-repeat,_no-repeat] 
  bg-[position:left_-1rem__top_-3rem_,_right_-1rem_top_-2rem,_left_6rem_bottom_1rem,_right_3rem_bottom_1rem]  bg-no-repeat"
    >
      <span className="text-white text-lg md:text-3xl font-bold text-center">
        Giải đáp thắc mắc chi tiết về các khoá học
      </span>
      <div className="w-[75%] md:w-[40%] h-16 top-[60%] left-[50%] flex flex-row items-center p-1 bg-white rounded-full">
        <input
          type="text"
          className="w-[75%] h-full rounded-full outline-none pl-4"
          placeholder="Tìm kiếm"
        />
        <Button
          className="bg-orange text-white rounded-full h-full w-[25%]"
          onClick={handleSubmit}
        >
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default QuestionBox;
