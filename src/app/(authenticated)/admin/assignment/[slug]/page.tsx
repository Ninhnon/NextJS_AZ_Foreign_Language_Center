'use client';
import { Button } from '@nextui-org/react';
import React from 'react';
import { FaHouseChimney } from 'react-icons/fa6';
import AssignmentDetails from './AssignmentDetails';
import AssignmentFilePicker from '@/components/AssignmentFilePicker';

function page({ params }: { params: { slug: any } }) {
  const { slug } = params;
  console.log('🚀 ~ file: page.tsx:8 ~ page ~ slug:', slug);

  //Fetch data from API
  //For UI design, we will use mock data
  const data = {
    id: 1,
    title: 'Matching Headings Lesson 1',
    course: 'IELTS Reading 4.5 - 5.5',
    courseDetail: {
      module: 'IELTS',
      skill: 'Reading',
      band: '5.5',
    },
    createdAt: '2023-09-12T14:00:00.000Z',
    lastModifiedAt: '2023-09-12T14:00:00.000Z',
  };

  return (
    <div className="w-full h-full flex flex-col py-6 px-32 justify-center gap-8">
      <div className="w-fit h-fit flex flex-col">
        <Button
          className="font-bold text-orange flex flex-row end-4"
          variant="light"
          radius="sm"
          startContent={<FaHouseChimney />}
        >
          Bài tập / {data.title}
        </Button>
      </div>
      <AssignmentDetails data={data} />
      <AssignmentFilePicker data={data} />
    </div>
  );
}

export default page;
