'use client';
import { Button } from '@nextui-org/react';
import React from 'react';
import { FaHouseChimney } from 'react-icons/fa6';
import AssignmentFilter from './AssignmentFilter';
import AssignmentList from './AssignmentList';

const page = () => {
  const assignmentData = [
    {
      id: 1,
      course: 'IELTS Reading 4.5 - 5.5',
      courseDetail: {
        module: 'IELTS',
        skill: 'Reading',
        band: '4.5 - 5.5',
      },
      title: 'Matching Headings Lesson 1',
    },
    {
      id: 2,
      course: 'IELTS Reading 4.5 - 5.5',
      courseDetail: {
        module: 'IELTS',
        skill: 'Reading',
        band: '4.5 - 5.5',
      },
      title: 'Matching Headings Lesson 1',
    },
    {
      id: 3,
      course: 'IELTS Reading 4.5 - 5.5',
      courseDetail: {
        module: 'IELTS',
        skill: 'Reading',
        band: '4.5 - 5.5',
      },
      title: 'Matching Headings Lesson 1',
    },
    {
      id: 4,
      course: 'IELTS Reading 4.5 - 5.5',
      courseDetail: {
        module: 'IELTS',
        skill: 'Reading',
        band: '4.5 - 5.5',
      },
      title: 'Matching Headings Lesson 1',
    },
    {
      id: 5,
      course: 'IELTS Reading 4.5 - 5.5',
      courseDetail: {
        module: 'IELTS',
        skill: 'Reading',
        band: '4.5 - 5.5',
      },
      title: 'Matching Headings Lesson 1',
    },
    {
      id: 6,
      course: 'IELTS Reading 4.5 - 5.5',
      courseDetail: {
        module: 'IELTS',
        skill: 'Reading',
        band: '4.5 - 5.5',
      },
      title: 'Matching Headings Lesson 1',
    },
    {
      id: 7,
      course: 'IELTS Reading 4.5 - 5.5',
      courseDetail: {
        module: 'IELTS',
        skill: 'Reading',
        band: '4.5 - 5.5',
      },
      title: 'Matching Headings Lesson 1',
    },
    {
      id: 8,
      course: 'IELTS Reading 4.5 - 5.5',
      courseDetail: {
        module: 'IELTS',
        skill: 'Reading',
        band: '4.5 - 5.5',
      },
      title: 'Matching Headings Lesson 1',
    },
  ];
  return (
    <div className="w-full h-full flex flex-col py-6 px-32 justify-center">
      <div className="w-fit h-fit flex flex-col">
        <Button
          className="font-bold text-orange flex flex-row end-4"
          variant="light"
          radius="sm"
          startContent={<FaHouseChimney />}
        >
          Bài tập
        </Button>
      </div>
      <div className="w-full h-full flex flex-col gap-6">
        <AssignmentFilter />
        <AssignmentList data={assignmentData} />
      </div>
    </div>
  );
};

export default page;
