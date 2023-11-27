import OtherRoomDetailCard from '@/components/cards/OtherRoomDetailCard';
import React from 'react';

const OtherRoomList = ({ data }) => {
  return data ? (
    <div className="w-full h-fit xl:grid xl:grid-cols-2 flex flex-col items-center">
      {data.map((item) => (
        <OtherRoomDetailCard data={item} />
      ))}
    </div>
  ) : null;
};

export default OtherRoomList;
