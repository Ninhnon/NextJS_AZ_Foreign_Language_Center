import { Button } from '@nextui-org/react';
import React from 'react';
import { FaAlignJustify } from 'react-icons/fa6';
import { Image } from '@nextui-org/react';

import DialogCustom from '../ui/dialogCustom';

const OrderCard = ({ data }) => {
  const [isOpenDetailDialog, setIsOpenDetailDialog] = React.useState(false);
  return (
    <div className="w-full h-fit flex flex-row justify-between p-3 rounded-xl border-3 ">
      <div className="w-full h-fit flex flex-col gap-2 text-lg">
        <span className="font-bold">ID: #{data.id}</span>
        <div className="flex flex-row gap-3">
          <span>Email Khách hàng: </span>
          <span className="font-bold">
            {data.userId ? data.anonymousUserEmail : `Khách vãng lai`}
          </span>
        </div>

        <div className="flex flex-row gap-3">
          <span>Thời gian: </span>
          <span className="font-bold">
            {new Date(data.orderDate).toLocaleString()}
          </span>
        </div>

        <div className="flex flex-row gap-3">
          <span>Tổng tiền: </span>
          <span className="font-bold">
            {data.total?.toLocaleString('vi-VN')} VNĐ
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <span>Khóa học: </span>
          <div className="flex flex-row gap-3 items-center">
            <Image
              className="rounded-xl"
              src={data.orderItem.thumbnail}
              alt="thumbnail"
              width={85}
              height={85}
            />

            <span className="font-bold">{data.orderItem.name}</span>
          </div>
        </div>

        <div className="w-fit h-fit flex flex-row gap-3">
          <span>Tình trạng: </span>
          <span
            className={`font-bold ${
              data.status === 'Pending'
                ? `text-yellow-300`
                : data.status === 'resolved'
                ? `text-green-500`
                : `text-red-600`
            }
          `}
          >
            {data.status === 'Pending'
              ? `Đang chờ`
              : data.status === 'resolved'
              ? `Đã xử lý`
              : `Đã hủy`}
          </span>
        </div>
      </div>

      <Button
        isIconOnly
        className="bg-transparent"
        onClick={() => {
          setIsOpenDetailDialog(true);
        }}
      >
        <FaAlignJustify />
      </Button>

      <div>
        {isOpenDetailDialog ? (
          <DialogCustom
            className="w-[95%]  h-[95%] lg:w-[65%] lg:h-[80%]"
            isModalOpen={isOpenDetailDialog}
            warningOnClose={true}
            callBack={() => {
              setIsOpenDetailDialog(false);
            }}
          >
            <div className="flex flex-col gap-y-6 w-full h-full px-1">
              <div className="flex flex-row justify-center items-center text-lg font-bold">
                THÔNG TIN ĐƠN HÀNG
              </div>

              <div className="w-full h-fit flex flex-col justify-start">
                <div className="w-full h-fit flex flex-row justify-between border-t-1 border-b-1 p-4">
                  <span className="font-bold ">ID: {data.id}</span>
                  <span className="font-bold">
                    Thời gian đặt: {new Date(data.orderDate).toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-fit flex flex-col border-b-1 p-4 gap-3">
                  <span className="font-bold">THÔNG TIN KHÁCH HÀNG</span>

                  {data.userId ? (
                    <div className="w-full h-fit flex flex-row font-bold gap-3 items-center">
                      <Image
                        src={data.user.avatar}
                        width={150}
                        height={150}
                        alt="image"
                      />
                      <div className="w-full h-fit flex flex-col font-bold">
                        <span>ID khách hàng: {data.user.id}</span>
                        <span>Tên khách hàng: {data.user.name}</span>
                        <span>Email khách hàng: {data.user.email}</span>
                        <span className="max-w-[70ch]">
                          Địa chỉ: {data.user.address}
                        </span>
                        <span className="max-w-[70ch]">
                          SĐT: {data.user.phoneNumber}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-fit flex flex-row font-bold gap-3 items-center">
                      <Image
                        src={'../../../../person.png'}
                        width={150}
                        height={150}
                        alt="avatar"
                      />
                      <div className="w-full h-fit flex flex-col">
                        <span className="font-bold">Khách vãng lai</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full h-fit flex flex-col border-b-1 p-4 gap-3">
                <span className="font-bold">CHI TIẾT ĐƠN HÀNG</span>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-3 items-center">
                    <Image
                      className="rounded-xl"
                      src={data.orderItem.thumbnail}
                      alt="thumbnail"
                      width={150}
                      height={150}
                    />

                    <div className="flex flex-col gap-3 font-bold">
                      <span className="font-bold">{data.orderItem.name}</span>
                      <div className="flex flex-col gap-1 text-sm text-gray-600">
                        <span className="">
                          Số lượng đăng ký: {data.orderItem.totalAttendance}
                        </span>
                        <span className="text-sm text-gray-600">
                          Học phí:{' '}
                          {data.orderItem.tuitionFee.toLocaleString('vi-VN')}
                          VNĐ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-fit flex flex-row justify-between font-bold text-lg">
                <div className="w-fit h-fit flex flex-row gap-3 font-bold">
                  <span>Trạng thái:</span>
                  {data.status === 'Pending' ? (
                    <span className="text-yellow-300">Đang chờ</span>
                  ) : data.status === 'Resolved' ? (
                    <span className="text-green-300">Hoàn thành</span>
                  ) : data.status === 'Resolved' ? (
                    <span className="text-red-600">Bị hủy</span>
                  ) : null}
                </div>

                <div className="w-fit h-fit flex flex-row gap-3 font-bold">
                  <span>Tổng tiền:</span>
                  <span className="text-green-400">
                    {data.total?.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
              </div>
            </div>
          </DialogCustom>
        ) : null}
      </div>
    </div>
  );
};

export default OrderCard;
