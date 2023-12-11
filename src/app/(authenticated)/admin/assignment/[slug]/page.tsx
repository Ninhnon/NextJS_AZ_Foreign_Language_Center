'use client';
import { Button, Spinner } from '@nextui-org/react';
import React from 'react';
import { FaHouseChimney } from 'react-icons/fa6';
import AssignmentDetails from './AssignmentDetails';
import AssignmentFilePicker from '@/components/AssignmentFilePicker';
import { useRouter } from 'next/navigation';
import { useAssignment } from '@/hooks/useAssignment';
import { useQuery } from '@tanstack/react-query';

function page({ params }: { params: { slug: any } }) {
  const { slug } = params;
  const router = useRouter();

  const { onGetAssignmentById } = useAssignment();

  // Define a query key and fetch function for fetching review rating data
  const fetchAssignmentByIdKey = ['assignmentId', slug];
  const fetchAssignmentByIdData = async () => {
    const fetchedAssignmentByIdData = await onGetAssignmentById(slug);
    return fetchedAssignmentByIdData;
  };

  // Fetch review data
  const { data, isFetched, refetch } = useQuery(
    fetchAssignmentByIdKey,
    fetchAssignmentByIdData,
    {
      staleTime: 1000 * 60 * 1,
      keepPreviousData: true,
    }
  );

  console.log('🚀 ~ file: page.tsx:26 ~ page ~ refetch:', refetch);
  console.log('🚀 ~ file: page.tsx:26 ~ page ~ isFetched:', isFetched);
  console.log('🚀 ~ file: page.tsx:8 ~ page ~ slug:', slug);
  console.log('🚀 ~ file: page.tsx:25 ~ page ~ data:', data);

  return (
    <>
      {data ? (
        <div className="w-full h-full flex flex-col py-6 px-32 justify-center gap-8">
          <div className="w-fit h-fit flex flex-col">
            <Button
              className="font-bold text-orange flex flex-row end-4"
              variant="light"
              radius="sm"
              startContent={<FaHouseChimney />}
              onClick={() => {
                router.back();
              }}
            >
              Bài tập / {data.data.name}
            </Button>
          </div>
          <AssignmentDetails data={data.data} />
          <AssignmentFilePicker data={data.data} />
        </div>
      ) : (
        <Spinner
          className="w-full h-full flex justify-center items-center"
          label="Đang tải..."
          color="warning"
          labelColor="warning"
        />
      )}
    </>
  );
}

export default page;
