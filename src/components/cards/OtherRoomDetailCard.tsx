import React from 'react';
import Image from 'next/image';
import { FaToiletPaper } from 'react-icons/fa6';
import { ScrollArea } from '../ui/scroll-area';

const OtherRoomDetailCard = ({ data }) => {
  return (
    <div className="w-fit h-fit bg-old-lace rounded-lg flex flex-col gap-3 p-4 my-3">
      <div className="w-fit h-fit flex flex-row gap-3">
        <span className="font-bold">{data.name}</span>
        <span className="italic">#{data.id}</span>
      </div>
      <div className="w-full h-fit flex flex-row gap-4  justify-center items-center">
        <div className="w-fit h-fit flex flex-col gap-3">
          {data.status === 'FREE' ? (
            <div className="w-fit h-[13rem] px-4 bg-[#21B573] text-white font-bold rounded-lg flex justify-center items-center">
              Trống
            </div>
          ) : (
            <div className="w-fit h-[13rem] px-4 bg-red-500 text-white font-bold rounded-lg flex justify-center items-center">
              Đã đầy
            </div>
          )}
        </div>
        <div className="w-fit h-fit flex flex-col gap-2">
          <div className="w-fit h-fit flex flex-row gap-2">
            <div className="h-24 w-24 flex flex-row justify-center items-center gap-2 bg-white rounded-lg">
              <Image
                src={'/student.png'}
                alt="student"
                width={15}
                height={15}
              />
              <div className="font-bold">{data.attendance}</div>
            </div>
            <div className="h-24 w-24 flex flex-row justify-center items-center gap-2 bg-white rounded-lg">
              <FaToiletPaper
                size="15
              "
              />
              <div className="font-bold">{data.toilet}</div>
            </div>
          </div>
          <div className="w-fit h-fit flex flex-row gap-2">
            <div className="h-24 w-24 flex flex-col justify-center items-center gap-2 bg-white rounded-lg">
              <span>Sức chứa</span>
              <div className="font-bold">{data.capacity}</div>
            </div>
            <div className="h-24 w-24 flex flex-col justify-center items-center gap-2 bg-white rounded-lg">
              <span>Tầng</span>
              <div className="font-bold">{data.floor}</div>
            </div>
          </div>
        </div>
        <div className="h-full w-fit flex flex-col gap-2 bg-white rounded-lg">
          <span>Nội thất</span>
          <ScrollArea className="h-[13rem] w-fit rounded-md border-0 p-2">
            <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
              <span>Quạt trần</span>
              <span className="font-bold">{data.facilities[0].ceilingFan}</span>
            </div>
            <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
              <span>Bàn</span>
              <span className="font-bold">{data.facilities[0].table}</span>
            </div>
            <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
              <span>Ghế</span>
              <span className="font-bold">{data.facilities[0].chair}</span>
            </div>
            <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
              <span>Máy lọc nước</span>
              <span className="font-bold">
                {data.facilities[0].waterPurifier}
              </span>
            </div>
            <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
              <span>Chổi</span>
              <span className="font-bold">{data.facilities[0].broom}</span>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default OtherRoomDetailCard;
