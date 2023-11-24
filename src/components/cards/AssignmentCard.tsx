import { Button } from '@nextui-org/react';
import React from 'react';
import { FaRegEye } from 'react-icons/fa6';

const AssignmentCard = ({ data }) => {
  return (
    <div
      className="relative rounded-xl p-4 bg-[#FDF8EE] w-fit h-fit m-8 mx-auto
  drop-shadow-xl overflow-visible border-2 border-[#FAAF3A]"
    >
      <div className="w-fit h-fit flex flex-col gap-2 font-bold">
        <div>{data.course}</div>
        <div>{data.title}</div>
        <div className="w-fit h-fit flex flex-row text-xs mt-1 gap-2">
          <div className="border-2 rounded-md bg-transparent border-[#FAAF3A]  text-[#FAAF3A] px-5 ">
            {data.courseDetail.module}
          </div>
          <div className="border-2 rounded-md bg-transparent border-[#FAAF3A] text-[#FAAF3A] px-5">
            {data.courseDetail.skill}
          </div>
          <div className="border-2 rounded-md bg-transparent border-[#FAAF3A] text-[#FAAF3A] px-5">
            {data.courseDetail.band}
          </div>
        </div>
        <div className="w-fit h-fit flex flex-row mt-12">
          <Button
            className="border-1 rounded-3xl bg-bossanova text-white"
            startContent={<FaRegEye />}
          >
            Xem bài tập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
