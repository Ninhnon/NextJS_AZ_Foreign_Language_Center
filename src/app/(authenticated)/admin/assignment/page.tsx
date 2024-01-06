'use client';
import { Button, Spinner } from '@nextui-org/react';
import React, { useState } from 'react';
import { FaHouseChimney } from 'react-icons/fa6';
import AssignmentFilter from './AssignmentFilter';
import AssignmentList from './AssignmentList';
import { useAssignment } from '@/hooks/useAssignment';

const page = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log('🚀 ~ file: page.tsx:11 ~ page ~ data:', data);

  const [module, setModule] = useState(new Set([]));
  const [skill, setSkill] = useState(new Set([]));
  const [band, setBand] = useState(new Set([]));

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalPage, setTotalPage] = useState(1);

  const { onGetAssignment } = useAssignment();

  const fetchAssignmentListData = async (page) => {
    const assignmentList = await onGetAssignment(
      page,
      itemsPerPage,
      Array.from(module)[0],
      Array.from(skill)[0],
      Array.from(band)[0]
    );
    return assignmentList;
  };
  const onSubmit = async (page) => {
    setIsLoading(true);
    await setCurrentPage(page);
    const ret = await fetchAssignmentListData(page);
    await setTotalPage(ret.totalPage);
    await setData(ret);
    setIsLoading(false);
  };

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
        <AssignmentFilter
          module={module}
          setModule={setModule}
          skill={skill}
          setSkill={setSkill}
          band={band}
          setBand={setBand}
          onSubmit={onSubmit}
          setCurrentPage={setCurrentPage}
        />
        {data ? (
          <AssignmentList
            data={data.data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
            isLoading={isLoading}
            onSubmit={onSubmit}
            route={`/admin/assignment/`}
          />
        ) : (
          isLoading && (
            <Spinner
              className=""
              label="Đang tải..."
              color="warning"
              labelColor="warning"
            />
          )
        )}
      </div>
    </div>
  );
};

export default page;
