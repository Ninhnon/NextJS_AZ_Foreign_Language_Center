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
          <span>Email: </span>
          <span className="font-bold">
            {!data.userId ? data.anonymousUserEmail : data.user.email}
          </span>
        </div>

        <div className="flex flex-row gap-3">
          <span>Tên: </span>
          <span className="font-bold">
            {!data.userId ? data.anonymousUserName : data.user.email}
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
              !data.userId ? `text-yellow-300` : `text-green-500`
            }
          `}
          >
            {!data.userId ? `chưa có tài khoản` : `đã có tài khoản`}
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
                THÔNG TIN ĐĂNG KÝ
              </div>

              <div className="w-full h-fit flex flex-col justify-start">
                <div className="w-full h-fit flex flex-row justify-between border-t-1 border-b-1 p-4">
                  <span className="font-bold ">ID: {data.id}</span>
                  <span className="font-bold">
                    Thời gian đăng ký:{' '}
                    {new Date(data.orderDate).toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-fit flex flex-col border-b-1 p-4 gap-3">
                  <span className="font-bold">THÔNG TIN HỌC VIÊN</span>

                  {data.userId ? (
                    <div className="w-full h-fit flex flex-row font-bold gap-3 items-center">
                      <Image
                        src={data.user.avatar}
                        width={150}
                        height={150}
                        alt="image"
                      />
                      <div className="w-full h-fit flex flex-col font-bold">
                        <span>ID học viên: {data.user.id}</span>
                        <span>Tên học viên: {data.user.name}</span>
                        <span>Email học viên: {data.user.email}</span>
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
                        <span className="font-bold">Học viên mới</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full h-fit flex flex-col border-b-1 p-4 gap-3">
                <span className="font-bold">CHI TIẾT ĐĂNG KÝ</span>
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
                          Số học viên tối đa: {data.orderItem.totalAttendance}
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
                  {!data.userId ? (
                    <span className="text-yellow-300">Chưa có tài khoản</span>
                  ) : (
                    <span className="text-green-300">Đã có tài khoản</span>
                  )}
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
