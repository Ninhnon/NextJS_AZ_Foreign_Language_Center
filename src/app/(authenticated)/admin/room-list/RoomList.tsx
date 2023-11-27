'use client';

import { Input } from '@/components/ui/input';
import { Button, Pagination } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa6';
import OtherRoomList from './OtherRoomList';
import ClassRoomList from './ClassRoomList';

const RoomList = ({ data }) => {
  //Set selected option button
  const [selectedRoomListOption, setSelectedRoomListOption] = useState(1);
  const roomListOptions = [
    { id: 1, text: 'Phòng học' },

    { id: 2, text: 'Phòng khác' },
  ];
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
    console.log(
      '🚀 ~ file: RoomList.tsx:32 ~ isTimeAvailable ~ dataItemTime:',
      dataItemTime
    );
    console.log(
      '🚀 ~ file: RoomList.tsx:32 ~ isTimeAvailable ~ dataItem:',
      dataItem
    );

    return dataItem?.availableTime.some((time) => time.id == dataItemTime.id);
  };
  //Get first n items of data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleOptionClick = (buttonId) => {
    setSelectedRoomListOption(buttonId);
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-full h-full flex flex-col py-6 px-20">
      <div className="font-bold">Danh sách phòng học</div>
      <div className="w-full h-fit flex flex-row gap-4 items-center">
        <Input
          className="bg-[#FDF8EE] h-10 text-black border-0 mr-4"
          placeholder="Tìm kiếm"
        />
        <div className="relative w-fit h-fit flex flex-row mr-4 items-center">
          <Button className="bg-[#FDF8EE] h-10 text-black w-32" radius="sm">
            Chọn
          </Button>
          <Button
            isIconOnly
            color="warning"
            variant="light"
            size="lg"
            className="text-black"
            aria-label="Take a photo"
          >
            <FaTrash />
          </Button>
        </div>
      </div>
      <div className="w-fit h-fit flex flex-row">
        {roomListOptions.map((button) => (
          <Button
            key={button.id}
            className={`${
              selectedRoomListOption === button.id
                ? 'bg-orange text-white'
                : 'bg-white text-orange'
            } border-orange w-32 mt-4 mr-4`}
            variant="bordered"
            radius="sm"
            onClick={() => handleOptionClick(button.id)}
          >
            {button.text}
          </Button>
        ))}
      </div>
      {selectedRoomListOption === 1 ? (
        <ClassRoomList
          data={currentItems}
          availableTimes={availableTimes}
          isTimeAvailable={isTimeAvailable}
        />
      ) : (
        <OtherRoomList data={currentItems} />
      )}

      <div className="w-full h-fit flex flex-col items-center">
        <Pagination
          color={'warning'}
          showControls
          total={10}
          initialPage={1}
          onChange={(page) => {
            onPageChange(page);
          }}
          page={currentPage}
        />
      </div>
    </div>
  );
};

export default RoomList;
