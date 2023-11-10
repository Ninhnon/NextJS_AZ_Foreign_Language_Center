import React from 'react';
import { Checkbox, Image } from '@nextui-org/react';

const AdminCourseCard = ({ data }) => {
  return (
    <div className="w-full h-fit flex flex-row justify-between shadow-md rounded-md p-2 m-3 items-center">
      <div className="w-fit h-full flex flex-row items-center">
        <Checkbox radius="sm" />
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={data.thumbnail}
          width={75}
          height={75}
        />
        <div className="w-fit h-full flex flex-col justify-center ml-3">
          <div className="font-bold">{data.title}</div>
          <div>ID:{data.id}</div>
        </div>
      </div>
      <div className="mr-8 font-bold">{data.band}</div>
    </div>
  );
};

export default AdminCourseCard;
