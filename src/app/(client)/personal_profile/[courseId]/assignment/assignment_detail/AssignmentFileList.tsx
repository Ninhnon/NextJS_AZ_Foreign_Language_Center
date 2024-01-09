import FileCard from '@/components/FileCard';
import React from 'react';

const AssignmentFileList = ({ assignmentFileList }) => {
  return (
    <div className="w-full h-fit flex flex-col  justify-center gap-4 font-bold">
      <span>Bài tập</span>
      <div className="h-fit flex flex-col lg:flex-row gap-5">
        {assignmentFileList?.length
          ? assignmentFileList?.map((file, i) => (
              <FileCard
                key={i}
                i={i}
                files={assignmentFileList}
                setFiles={assignmentFileList}
                file={file}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default AssignmentFileList;
