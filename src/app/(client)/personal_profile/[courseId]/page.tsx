import React from 'react';
import Scheduler from './Scheduler';
const page = ({ params: { courseId } }: { params: { courseId: string } }) => {
  return (
    <div>
      <Scheduler courseId={courseId} />
    </div>
  );
};

export default page;
