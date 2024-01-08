'use client';
import { Button } from '@nextui-org/react';
import CourseList from './CourseList';
import { FaHouseChimney } from 'react-icons/fa6';

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
          Khóa học
        </Button>
      </div>
      <CourseList />
    </div>
  );
}
