'use client';
import { Button } from '@nextui-org/react';
import React from 'react';
import { FaRegEye } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const StudentAssignmentCard = ({ data, route }) => {
  const router = useRouter();
  return (
    <div className="w-full h-24 flex flex-row justify-between p-3 rounded-xl border-3 ">
      <div className="w-full h-fit flex flex-col gap-2 text-lg">
        <span className="font-bold">ID: #{data.id}</span>
        <div>{data.assignment.name}</div>
      </div>

      <div className=" h-fit flex flex-col gap-2">
        {data.score || data.score === 0 ? (
          <div className="w-fit h-fit flex flex-row">
            <span>Điểm đạt được: </span>
            <span className="font-bold">
              {data.score === 0 ? '0' : data.score}
            </span>
          </div>
        ) : (
          <div className="w-fit h-fit flex flex-row text-red">
            <span>Nhanh làm thôi</span>
          </div>
        )}

        <div className="w-fit h-fit flex flex-row">
          <span>Deadline: </span>
          <span
            className={`font-bold 
          `}
          >
            {`12/12/2025`}
          </span>
        </div>
      </div>
      <Button
        className="border-1 rounded-3xl w-fit bg-bossanova text-white"
        startContent={<FaRegEye />}
        onClick={() => {
          router.push(route + data.assignment.id);
        }}
      >
        Xem bài tập
      </Button>
    </div>
  );
};

export default StudentAssignmentCard;
