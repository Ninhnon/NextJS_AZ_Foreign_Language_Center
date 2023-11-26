import { CircularProgress } from '@nextui-org/react';
import React from 'react';
import Image from 'next/image';
import { FaToiletPaper } from 'react-icons/fa6';
import { ScrollArea } from '../ui/scroll-area';

const ClassroomDetailCard = ({ data }) => {
  //Fetch data from DB
  //(This is just a sample data)
  const availableTimes = [
    { id: 1, time: '7:00 - 9:00' },
    { id: 2, time: '9:00 - 11:00' },
    { id: 3, time: '11:00 - 13:00' },
    { id: 4, time: '15:00 - 17:00' },
    { id: 5, time: '17:00 - 19:00' },
    { id: 6, time: '19:00 - 21:00' },
  ];
  //Function return whether a time is available or not
  //(check if this classroom has booked this time or not)
  const isTimeAvailable = (dataItem, dataItemTime) => {
    return dataItem?.availableTime.some((time) => time.id == dataItemTime.id);
  };
  return data ? (
    <div className="w-full h-fit flex flex-col items-center">
      {data.map((item) => (
        <div className="w-[80%] h-fit bg-old-lace rounded-lg flex flex-col gap-3 p-4 my-3">
          <div className="w-fit h-fit flex flex-row gap-3">
            <span className="font-bold">{item.name}</span>
            <span className="italic">{item.id}</span>
          </div>
          <div className="w-full h-fit flex flex-col lg:flex-row gap-8  justify-center lg:justify-between items-center">
            <CircularProgress
              classNames={{
                svg: 'w-36 h-36 drop-shadow-md',
                indicator: 'stroke-yellow-orange',

                track: 'stroke-gray-300',
                value: 'text-3xl font-semibold text-black',
              }}
              value={Math.round((item.attendance / item.capacity) * 100)}
              color="warning"
              showValueLabel={true}
            />
            <div className="w-fit h-fit flex flex-col gap-3">
              {item.capacity > item.attendance ? (
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
                      isTimeAvailable(item, time) ? 'bg-[#f8ba97]' : 'bg-orange'
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
                  <div className="font-bold">{item.attendance}</div>
                </div>
                <div className="h-24 w-24 flex flex-row justify-center items-center gap-2 bg-white rounded-lg">
                  <FaToiletPaper
                    size="15
                "
                  />
                  <div className="font-bold">{item.toilet}</div>
                </div>
              </div>
              <div className="w-fit h-fit flex flex-row gap-2">
                <div className="h-24 w-24 flex flex-col justify-center items-center gap-2 bg-white rounded-lg">
                  <span>Sức chứa</span>
                  <div className="font-bold">{item.capacity}</div>
                </div>
                <div className="h-24 w-24 flex flex-col justify-center items-center gap-2 bg-white rounded-lg">
                  <span>Tầng</span>
                  <div className="font-bold">{item.floor}</div>
                </div>
              </div>
            </div>
            <div className="h-full w-fit flex flex-col  gap-2 bg-white rounded-lg">
              <span>Nội thất</span>
              <ScrollArea className="h-[13rem] w-fit rounded-md border-0 p-2">
                <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
                  <span>Quạt trần</span>
                  <span className="font-bold">{item.furniture.ceilingFan}</span>
                </div>
                <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
                  <span>Bàn</span>
                  <span className="font-bold">{item.furniture.table}</span>
                </div>
                <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
                  <span>Ghế</span>
                  <span className="font-bold">{item.furniture.chair}</span>
                </div>
                <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
                  <span>Máy lọc nước</span>
                  <span className="font-bold">
                    {item.furniture.waterPurifier}
                  </span>
                </div>
                <div className="h-fit w-44 p-2 flex flex-row justify-between bg-old-lace rounded-md border-0 my-1">
                  <span>Chổi</span>
                  <span className="font-bold">{item.furniture.broom}</span>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default ClassroomDetailCard;
