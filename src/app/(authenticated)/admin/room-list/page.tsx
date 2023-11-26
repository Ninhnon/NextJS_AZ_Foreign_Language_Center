'use client';
import { Button } from '@nextui-org/react';
import React from 'react';
import { FaHouseChimney } from 'react-icons/fa6';
import RoomList from './RoomList';

export default function page() {
  const data = [
    {
      id: '#P123',
      name: 'Phòng 123',
      floor: 1,
      availableTime: [
        { id: 2, time: '9:00 - 11:00' },
        { id: 4, time: '15:00 - 17:00' },
        { id: 6, time: '19:00 - 21:00' },
      ],
      attendance: 458,
      capacity: 500,
      toilet: 1,
      furniture: {
        ceilingFan: 50,
        table: 12,
        chair: 123,
        waterPurifier: 6,
        broom: 12,
      },
    },
    {
      id: '#P456',
      name: 'Phòng 456',
      floor: 4,
      availableTime: [
        { id: 1, time: '7:00 - 9:00' },
        { id: 3, time: '11:00 - 13:00' },
        { id: 5, time: '17:00 - 19:00' },
      ],
      attendance: 500,
      capacity: 500,
      toilet: 1,
      furniture: {
        ceilingFan: 50,
        table: 12,
        chair: 123,
        waterPurifier: 6,
        broom: 12,
      },
    },
    {
      id: '#P789',
      name: 'Phòng 789',
      floor: 7,
      availableTime: [
        { id: 2, time: '9:00 - 11:00' },
        { id: 3, time: '11:00 - 13:00' },
        { id: 4, time: '15:00 - 17:00' },
        { id: 6, time: '19:00 - 21:00' },
      ],
      attendance: 354,
      capacity: 500,
      toilet: 1,
      furniture: {
        ceilingFan: 50,
        table: 12,
        chair: 123,
        waterPurifier: 6,
        broom: 12,
      },
    },
  ];
  return (
    <div className="w-full h-full flex flex-col py-6 px-20">
      <div className="w-fit h-fit flex flex-col">
        <Button
          className="font-bold text-orange "
          variant="light"
          radius="sm"
          startContent={<FaHouseChimney />}
        >
          Phòng học
        </Button>
      </div>
      <div className="w-full h-fit flex flex-col items-center">
        <RoomList data={data} />
      </div>
    </div>
  );
}
