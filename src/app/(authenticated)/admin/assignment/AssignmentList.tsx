import AssignmentCard from '@/components/cards/AssignmentCard';
import { Button, Pagination } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const AssignmentList = ({ data }) => {
  //Get first n items of data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full h-fit flex flex-row justify-between tems-center">
        <div className="relative w-fit h-fit flex flex-row gap-4">
          <Button className="bg-orange text-white w-32" radius="sm">
            Lọc dữ liệu
          </Button>
          <Button
            className="bg-transparent border-1 border-[#FAAF3A] text-[#FAAF3A]  w-32"
            radius="sm"
          >
            Chọn tất cả
          </Button>
        </div>

        <div className="relative w-fit h-fit flex flex-row gap-16">
          <Button className="bg-[#FDF8EE] text-black w-32" radius="sm">
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
      <div className="w-full h-fit grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {currentItems?.map((item) => (
          <div key={item.id}>
            <div>
              <AssignmentCard data={item} />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-fit flex justify-center items-center">
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
};

export default AssignmentList;
