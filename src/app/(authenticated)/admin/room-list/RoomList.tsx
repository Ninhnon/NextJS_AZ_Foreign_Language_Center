'use client';

import { Input } from '@/components/ui/input';
import { Button, Pagination, Spinner } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa6';
import OtherRoomList from './OtherRoomList';
import ClassRoomList from './ClassRoomList';
import { useRoom } from '@/hooks/useRoom';
import { useQuery } from '@tanstack/react-query';

const RoomList = () => {
  //Set selected option button
  const [selectedRoomListOption, setSelectedRoomListOption] = useState(1);
  const [search, setSearch] = useState('');
  //Get first n items of data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [totalPage, setTotalPage] = useState(10);
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
    return dataItem?.classShifts.some((time) => time.timeId == dataItemTime.id);
  };

  const { onGetRoom } = useRoom();
  //Get review data per page from API
  // Define a query key and fetch function for fetching review data
  const reviewDataQueryKey = ['room', currentPage];

  const fetchRoomListData = async () => {
    const roomList = await onGetRoom(
      currentPage,
      itemsPerPage,
      search,
      selectedRoomListOption
    );
    return roomList;
  };

  // Fetch review data
  const {
    data: roomListData,
    refetch,
    isFetching,
  } = useQuery(reviewDataQueryKey, fetchRoomListData, {
    staleTime: 1000 * 60 * 1,
    keepPreviousData: true,
  });

  //Handle event when option button is clicked
  //(Change type of room list)
  const handleOptionClick = async (buttonId) => {
    await setCurrentPage(1);
    await setSearch('');
    await setSelectedRoomListOption(buttonId);
    await refetch();
  };

  //Set total page when data is fetched
  useEffect(() => {
    if (roomListData) {
      setTotalPage(roomListData.totalPage);
    }
  }, [roomListData]);

  console.log(
    '🚀 ~ file: RoomList.tsx:58 ~ RoomList ~ roomListData:',
    roomListData
  );

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
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              refetch();
            }
          }}
        />
        <div className="relative w-fit h-fit flex flex-row mr-4 items-center">
          <Button
            className="bg-[#FDF8EE] h-10 text-black w-32"
            radius="sm"
            onClick={async () => {
              try {
                await refetch();
              } catch (error) {
                console.log('error');
              }
            }}
          >
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
            onClick={() => {
              handleOptionClick(button.id);
            }}
          >
            {button.text}
          </Button>
        ))}
      </div>
      <div className="w-full h-fit flex flex-col items-center justify-center">
        {roomListData ? (
          <>
            {' '}
            {isFetching ? (
              <Spinner
                className=""
                label="Đang tải..."
                color="warning"
                labelColor="warning"
              />
            ) : (
              <div className="w-full h-fit flex flex-col items-center">
                {selectedRoomListOption === 1 ? (
                  <ClassRoomList
                    data={roomListData.data}
                    availableTimes={availableTimes}
                    isTimeAvailable={isTimeAvailable}
                  />
                ) : (
                  <OtherRoomList data={roomListData.data} />
                )}
                <Pagination
                  color={'warning'}
                  showControls
                  total={totalPage}
                  initialPage={1}
                  onChange={(page) => {
                    onPageChange(page);
                  }}
                  page={currentPage}
                />
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default RoomList;
