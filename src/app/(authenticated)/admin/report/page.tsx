'use client';
import { Button } from '@nextui-org/react';
import React from 'react';
import { FaHouseChimney } from 'react-icons/fa6';
import Report from './Report';

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
          Báo cáo
        </Button>
      </div>
      <div className="w-full h-fit flex flex-col items-center">
        <Report></Report>
      </div>
    </div>
  );
}
