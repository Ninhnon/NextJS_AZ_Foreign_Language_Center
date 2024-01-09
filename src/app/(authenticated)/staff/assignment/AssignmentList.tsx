import AssignmentCard from '@/components/cards/AssignmentCard';
import { Button, Pagination, Spinner } from '@nextui-org/react';
import React from 'react';
import { FaTrash } from 'react-icons/fa';

const AssignmentList = ({
  data,
  currentPage,
  setCurrentPage,
  totalPage,
  onSubmit,
  isLoading,
  route,
}) => {
  return (
    <>
      {data ? (
        <>
          {isLoading ? (
            <Spinner
              className=""
              label="Đang tải..."
              color="warning"
              labelColor="warning"
            />
          ) : (
            <div className="w-full h-full flex flex-col gap-4">
              <div className="w-full h-fit flex flex-row justify-between tems-center">
                <div className="relative w-fit h-fit flex flex-col md:flex-row gap-4">
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

                <div className="relative w-fit h-fit flex flex-col md:flex-row justify-center items-center">
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
                {data?.map((item) => (
                  <div key={item.id}>
                    <div>
                      <AssignmentCard data={item} route={route} />
                    </div>
                  </div>
                ))}
              </div>
              {data && data.length != 0 ? (
                <div className="w-full h-fit flex justify-center items-center">
                  <Pagination
                    color="warning"
                    showControls
                    total={totalPage}
                    initialPage={1}
                    onChange={async (page) => {
                      await setCurrentPage(page);
                      await onSubmit(page);
                    }}
                    page={currentPage}
                  />
                </div>
              ) : null}
            </div>
          )}
        </>
      ) : (
        // <Spinner
        //   className=""
        //   label="Đang tải..."
        //   color="warning"
        //   labelColor="warning"
        // />
        <div>bruh</div>
      )}
    </>
  );
};

export default AssignmentList;
