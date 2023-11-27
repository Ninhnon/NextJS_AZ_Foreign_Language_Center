import { CircularProgress } from '@nextui-org/react';
import React from 'react';
import Image from 'next/image';
import { FaToiletPaper } from 'react-icons/fa6';
import { ScrollArea } from '../ui/scroll-area';

const ClassroomDetailCard = ({
  data,
  availableTimes,
  isTimeAvailable,
}: {
  data: any;
  availableTimes: any;
  isTimeAvailable: (any, any) => boolean;
}) => {
  return (
    <div className="w-[80%] h-fit bg-old-lace rounded-lg flex flex-col gap-3 p-4 my-3">
      <div className="w-fit h-fit flex lg:flex-row gap-3">
        <span className="font-bold">{data.name}</span>
        <span className="italic">{data.id}</span>
      </div>
      <div className="w-full h-fit flex flex-col xl:flex-row gap-8  justify-center lg:justify-between items-center">
        <CircularProgress
          classNames={{
            svg: 'w-36 h-36 drop-shadow-md',
            indicator: 'stroke-yellow-orange',

            track: 'stroke-gray-300',
            value: 'text-3xl font-semibold text-black',
          }}
          value={Math.round((data.attendance / data.capacity) * 100)}
          color="warning"
          showValueLabel={true}
        />
        <div className="w-fit h-fit flex flex-col gap-3">
          {data.capacity > data.attendance ? (
            <div className="w-full h-fit py-6 px-16 bg-[#21B573] text-white font-bold rounded-lg flex justify-center">
              Trống
            </div>
          ) : (
            <div className="w-full h-fit  py-6 px-16 bg-red-500 text-white font-bold rounded-lg flex justify-center">
              Đã đầy
            </div>
          )}
          <div className="w-full h-fit grid md:grid-cols-2 grid-cols-1 gap-2">
            {availableTimes.map((time) => (
              <div
                key={time.id}
                className={`${
                  isTimeAvailable(data, time) ? 'bg-[#f8ba97]' : 'bg-orange'
                } rounded-lg p-3 justify-center flex text-white text-sm`}
              >
                {time.time}
              </div>
            ))}
          </div>
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
        <div className="h-full w-fit flex flex-col  gap-2 bg-white rounded-lg">
          <span>Nội thất</span>
          <ScrollArea className="h-[13rem] w-fit rounded-md border-0 p-2">
            <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
              <span>Quạt trần</span>
              <span className="font-bold">{data.furniture.ceilingFan}</span>
            </div>
            <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
              <span>Bàn</span>
              <span className="font-bold">{data.furniture.table}</span>
            </div>
            <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
              <span>Ghế</span>
              <span className="font-bold">{data.furniture.chair}</span>
            </div>
            <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
              <span>Máy lọc nước</span>
              <span className="font-bold">{data.furniture.waterPurifier}</span>
            </div>
            <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
              <span>Chổi</span>
              <span className="font-bold">{data.furniture.broom}</span>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ClassroomDetailCard;
