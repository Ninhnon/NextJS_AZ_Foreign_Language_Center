import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaRegEye } from 'react-icons/fa6';

const AssignmentCard = ({ data }) => {
  console.log('🚀 ~ file: AssignmentCard.tsx:7 ~ AssignmentCard ~ data:', data);

  const router = useRouter();
  return (
    <div
      className="relative rounded-xl p-8 bg-[#FDF8EE] w-fit h-fit m-8 mx-auto
  drop-shadow-xl overflow-visible border-2 border-[#FAAF3A]"
    >
      <div className="w-fit h-fit flex flex-col gap-2 font-bold">
        <div className="italic font-light">#{data.id}</div>
        <div>{data.name}</div>

        <div className="w-fit h-fit flex lg:flex-row flex-col text-xs mt-1 gap-2">
          <div className="border-2 rounded-md bg-transparent border-[#FAAF3A]  text-[#FAAF3A] px-5">
            {data.module.name}
          </div>
          <div className="border-2 rounded-md bg-transparent border-[#FAAF3A] text-[#FAAF3A] px-5">
            {data.skill.name}
          </div>
          <div className="border-2 w-24 rounded-md bg-transparent border-[#FAAF3A] text-[#FAAF3A] px-5 flex justify-center">
            {data.bandScore.name}
          </div>
        </div>
        <div className="w-fit h-fit flex flex-row mt-12">
          <Button
            className="border-1 rounded-3xl bg-bossanova text-white"
            startContent={<FaRegEye />}
            onClick={() => {
              router.push(`/admin/assignment/${data.id}`);
            }}
          >
            Xem bài tập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
