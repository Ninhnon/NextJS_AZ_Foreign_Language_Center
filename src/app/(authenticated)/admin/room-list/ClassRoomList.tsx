import ClassroomDetailCard from '@/components/cards/ClassroomDetailCard';
import React from 'react';

const ClassRoomList = ({ data, availableTimes, isTimeAvailable }) => {
  return data ? (
    <div className="w-full h-fit flex flex-col items-center">
      {data.map((item) => (
        <ClassroomDetailCard
          data={item}
          availableTimes={availableTimes}
          isTimeAvailable={isTimeAvailable}
        />
      ))}
    </div>
  ) : null;
};

export default ClassRoomList;
