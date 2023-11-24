'use client';
import { Button } from '@nextui-org/react';
import CourseList from './CourseList';
import { FaHouseChimney } from 'react-icons/fa6';

export default function page() {
  const courses = [
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_1.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_2.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_3.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_4.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_1.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_2.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_3.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_4.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_1.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_2.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_3.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_4.png',
      band: '4.5 - 5.0',
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
          Khóa học
        </Button>
      </div>
      <CourseList data={courses} />
    </div>
  );
}
