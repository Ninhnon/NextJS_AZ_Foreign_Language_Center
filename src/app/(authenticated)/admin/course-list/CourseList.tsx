'use client';
import AdminCourseCard from '@/components/cards/AdminCourseCard';
import { Button, Pagination } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaHouseChimney } from 'react-icons/fa6';

export default function CourseList({ data }) {
  //Set selected option button
  const [activeButton, setActiveButton] = useState(null);
  //Get first n items of data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const buttons = [
    { id: 1, text: 'Đang diễn ra' },

    { id: 2, text: 'Đã kết thúc' },
    { id: 3, text: 'Sắp tới' },
  ];

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col w-full h-full py-6 px-32">
      <div className="w-fit h-fit flex flex-col">
        <Button
          className="font-bold text-orange "
          variant="light"
          radius="sm"
          startContent={<FaHouseChimney />}
        >
          Khóa học
        </Button>
      </div>
      <div className="w-full h-fit flex flex-col px-16 pt-2">
        <div className="ml-4 font-bold text-2xl">Danh sách khóa học</div>
        <div className="w-full h-fit flex flex-row items-center justify-between">
          <div className="w-fit h-fit flex flex-row">
            {buttons.map((button) => (
              <Button
                key={button.id}
                className={`${
                  activeButton === button.id
                    ? 'bg-orange text-white'
                    : 'bg-white text-orange'
                } border-x-neutral-950 w-32 m-4`}
                variant="bordered"
                radius="sm"
                onClick={() => handleButtonClick(button.id)}
              >
                {button.text}
              </Button>
            ))}
          </div>
          <div className="relative w-fit h-fit mr-4">
            <Button className="bg-[#FDF8EE] text-black w-32 m-4" radius="sm">
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
      </div>
      <div className="w-full h-fit flex flex-col items-center">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="w-full h-32 flex flex-row items-center justify-between px-16"
          >
            <AdminCourseCard data={item} />
          </div>
        ))}
        <Pagination
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
}
