'use client';
import { Button } from '@nextui-org/react';
import React from 'react';
import { FaHouseChimney } from 'react-icons/fa6';
import StudentAssignmentList from './StudentAssignmentList';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
export default function page() {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get('id') || '10');
  const session = useSession();
  const userId = session.data?.user?.id || 6;
  return (
    <div className="w-full h-full flex flex-col py-6 px-20">
      <div className="w-fit h-fit flex flex-col">
        <Button
          className="font-bold text-orange "
          variant="light"
          radius="sm"
          startContent={<FaHouseChimney />}
        >
          Danh sách bài tập
        </Button>
      </div>
      <div className="w-full h-fit flex flex-col items-center">
        <StudentAssignmentList id={id} userId={userId} />
      </div>
    </div>
  );
}
