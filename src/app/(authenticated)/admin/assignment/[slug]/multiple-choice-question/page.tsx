'use client';
import { Button, Pagination, Spinner } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { FaHouseChimney } from 'react-icons/fa6';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAssignment } from '@/hooks/useAssignment';
import { useQuery } from '@tanstack/react-query';
import MultipleChoiceQuestionCard from '@/components/cards/MultipleChoiceQuestionCard';

function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get('id') || '1');
  console.log('🚀 ~ file: page.tsx:13 ~ page ~ id:', id);

  //Get first n items of data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(10);
  const { onGetMultipleChoiceQuestion } = useAssignment();

  // Define a query key and fetch function for fetching review rating data
  const fetchQuestionByIdKey = ['multipleQuestion', id];
  const fetchQuestionByIdData = async () => {
    const fetchedAssignmentByIdData = await onGetMultipleChoiceQuestion(
      id,
      currentPage,
      itemsPerPage
    );
    return fetchedAssignmentByIdData;
  };

  // Fetch review data
  const { data, isFetched, isFetching, refetch } = useQuery(
    fetchQuestionByIdKey,
    fetchQuestionByIdData,
    {
      staleTime: 1000 * 60 * 1,
      keepPreviousData: true,
    }
  );
  console.log('🚀 ~ file: page.tsx:35 ~ page ~ refetch:', refetch);
  console.log('🚀 ~ file: page.tsx:35 ~ page ~ isFetched:', isFetched);

  //Set total page when data is fetched
  useEffect(() => {
    if (data) {
      setTotalPage(data.totalPage);
    }
  }, [data]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

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
              Câu hỏi trắc nghiệm
            </Button>
          </div>

          <div className="w-full h-fit flex flex-col items-center">
            {data ? (
              <>
                {' '}
                {isFetching ? (
                  <Spinner
                    className=""
                    label="Đang tải..."
                    color="warning"
                    labelColor="warning"
                  />
                ) : (
                  <div className="w-full h-fit flex flex-col items-center">
                    {data?.data.map((item) => (
                      <div
                        key={item.id}
                        className="w-full h-fit flex flex-row items-center justify-between px-16 my-2"
                      >
                        <MultipleChoiceQuestionCard data={item} />
                      </div>
                    ))}
                    <Pagination
                      color="warning"
                      showControls
                      total={totalPage}
                      initialPage={1}
                      onChange={(page) => {
                        onPageChange(page);
                      }}
                      page={currentPage}
                    />
                  </div>
                )}
              </>
            ) : null}
          </div>
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
