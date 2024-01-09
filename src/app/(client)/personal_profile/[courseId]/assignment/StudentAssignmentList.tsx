'use client';
import StudentAssignmentCard from '@/components/cards/StudentAssignmentCard';
import { Input } from '@/components/ui/input';
import { useAssignment } from '@/hooks/useAssignment';
import { Button, Pagination, Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
const StudentAssignmentList = ({ id, userId }) => {
  const [search, setSearch] = useState('');
  //Get first n items of data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [totalPage, setTotalPage] = useState(10);
  const [filterByUserIdNull, setFilterByUserIdNull] = useState(false); // New state for filter

  const { onGetAssignmentFromUserIdAndCourseId } = useAssignment();
  //Get review data per page from API-
  // Define a query key and fetch function for fetching review data
  const orderDataQueryKey = ['orderPage', currentPage];

  const fetchOrderListData = async () => {
    const orderList = await onGetAssignmentFromUserIdAndCourseId(
      currentPage,
      itemsPerPage,
      search,
      parseInt(userId),
      id
    );
    return orderList;
  };
  const onFilterByUserIdNull = () => {
    setFilterByUserIdNull((prevState) => !prevState); // Toggle the filter state
  };
  // Fetch review data
  const {
    data: orderListData,
    refetch,
    isFetching,
  } = useQuery(orderDataQueryKey, fetchOrderListData, {
    staleTime: 1000 * 60 * 1,
    keepPreviousData: true,
  });

  //Set total page when data is fetched
  useEffect(() => {
    if (orderListData) {
      setTotalPage(orderListData.totalPage);
    }
  }, [orderListData]);
  console.log(
    '🚀 ~ file: StudentAssignmentList.tsx:52 ~ StudentAssignmentList ~ orderListData:',
    orderListData
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-full h-full flex flex-col py-6 px-20">
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
            className="bg-[#FDF8EE] h-10 text-black w-64"
            radius="sm"
            onClick={onFilterByUserIdNull} // Call the function to toggle the filter
          >
            {filterByUserIdNull ? 'Hủy lọc' : 'Chưa làm'}
          </Button>
        </div>
      </div>

      <div className="w-full h-fit flex flex-col items-center justify-center py-3">
        {orderListData ? (
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
              <div className="w-full h-fit grid grid-cols-1 gap-1 items-center">
                {orderListData.data
                  .filter(
                    (order) => !filterByUserIdNull || order.score === null
                  )
                  .map((order) => (
                    <div key={order.id}>
                      <StudentAssignmentCard
                        data={order}
                        route={'/entrance_examination/assignment_detail/'}
                      ></StudentAssignmentCard>
                    </div>
                  ))}
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

export default StudentAssignmentList;
