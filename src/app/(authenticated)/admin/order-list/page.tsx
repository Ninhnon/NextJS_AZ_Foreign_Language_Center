'use client';
import { Button } from '@nextui-org/react';
import React from 'react';
import { FaHouseChimney } from 'react-icons/fa6';
import OrderList from './OrderList';

export default function page() {
  return (
    <div className="w-full h-full flex flex-col py-6 px-20">
      <div className="w-fit h-fit flex flex-col">
        <Button
          className="font-bold text-orange "
          variant="light"
          radius="sm"
          startContent={<FaHouseChimney />}
        >
          Danh sách đăng ký
        </Button>
      </div>
      <div className="w-full h-fit flex flex-col items-center">
        <OrderList></OrderList>
      </div>
    </div>
  );
}
