'use client';
import { useAssignment } from '@/hooks/useAssignment';
import AssignmentFileList from '../AssignmentFileList';
import { Button, Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FaCircleQuestion } from 'react-icons/fa6';

export default function page({ params }: { params: { slug: any } }) {
  const { slug } = params;
  const router = useRouter();
  const { onGetAssignmentById } = useAssignment();

  // Define a query key and fetch function for fetching review rating data
  const fetchFileByIdKey = ['assignment file' + slug];
  const fetchFileByIdKeyData = async () => {
    const fetchedFileByIdData = await onGetAssignmentById(slug);
    return fetchedFileByIdData;
  };

  // Fetch review data
  const {
    data: assignmentData,
    isFetched,
    isFetching,
    refetch,
  } = useQuery(fetchFileByIdKey, fetchFileByIdKeyData, {
    staleTime: 1000 * 60 * 1,
    keepPreviousData: true,
  });
  console.log('🚀 ~ file: page.tsx:33 ~ page ~ data:', assignmentData);

  return (
    <div className="w-full h-full flex flex-col py-6 px-32 justify-center">
      <div className="w-full h-full flex flex-col gap-6">
        {assignmentData ? (
          <div className="w-full h-full flex flex-col gap-6">
            <div className="w-full h-fit flex flex-col px-4 gap-4">
              <div className="w-fit h-fit flex flex-row items-center">
                <span className="text-2xl font-bold">
                  {assignmentData.data.name}
                </span>
              </div>
              <div className="iw-fit flex md:flex-row flex-col gap-8">
                <div className="w-fit h-fit flex flex-row gap-3 items-center">
                  <span className="font-bold">Module: &nbsp; &nbsp;</span>
                  <span>{assignmentData.data.module.name}</span>
                </div>
                <div className="w-fit h-fit flex flex-row gap-3 items-center">
                  <span className="font-bold">Kỹ năng: &nbsp; &nbsp;</span>
                  <span>{assignmentData.data.skill.name}</span>
                </div>
                <div className="w-fit h-fit flex flex-row gap-3 items-center">
                  <span className="font-bold">Trình độ: &nbsp; &nbsp;</span>
                  <span>{assignmentData.data.bandScore.name}</span>
                </div>
              </div>
              <div className="w-fit h-fit flex flex-row">
                <span className="font-bold">Ngày khởi tạo: &nbsp; &nbsp;</span>
                <span>
                  {new Date(assignmentData.data.startTime).toLocaleString()}
                </span>
              </div>
              <Button
                className="font-bold text-orange flex flex-row w-fit end-4"
                variant="light"
                radius="sm"
                startContent={<FaCircleQuestion />}
                onClick={() => {
                  router.push(
                    `/admin/assignment/${assignmentData.data.id}/multiple-choice-question?id=${assignmentData.data.id}`
                  );
                }}
              >
                Làm câu hỏi trắc nghiệm
              </Button>
            </div>
            <div className="ml-4">
              <AssignmentFileList
                assignmentFileList={JSON.parse(assignmentData.data.files)}
              />
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
