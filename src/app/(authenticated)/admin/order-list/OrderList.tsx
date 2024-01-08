import OrderCard from '@/components/cards/OrderCard';
import { Input } from '@/components/ui/input';
import { useOrder } from '@/hooks/useOrder';
import { Button, Pagination, Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa6';

const OrderList = () => {
  //Set selected option button

  const [search, setSearch] = useState('');
  //Get first n items of data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [totalPage, setTotalPage] = useState(10);

  const { onGetOrders } = useOrder();
  //Get review data per page from API-
  // Define a query key and fetch function for fetching review data
  const orderDataQueryKey = ['orderPage', currentPage];

  const fetchOrderListData = async () => {
    const orderList = await onGetOrders(currentPage, itemsPerPage, search);
    return orderList;
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
    '🚀 ~ file: RoomList.tsx:58 ~ RoomList ~ roomListData:',
    orderListData
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-full h-full flex flex-col py-6 px-20">
      <div className="font-bold">Danh sách đơn hàng</div>
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
              <div className="w-full h-fit grid grid-cols-1 gap-2 items-center">
                {orderListData.data.map((order) => {
                  return (
                    <div key={order.id}>
                      <OrderCard data={order}></OrderCard>
                    </div>
                  );
                })}
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

export default OrderList;
