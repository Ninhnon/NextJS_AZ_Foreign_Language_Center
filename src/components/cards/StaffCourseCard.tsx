import React from 'react';
import Image from 'next/image';

import { Checkbox } from '@nextui-org/react';
import Link from 'next/link';
const StaffCourseCard = ({ data }) => {
  const href = '/staff/course-list/' + data.id;
  return (
    <Link
      aria-label="Products"
      href={href}
      className="w-full h-fit flex flex-row justify-between shadow-md rounded-md p-2 m-3 items-center"
    >
      <div className="w-fit h-full flex flex-row items-center">
        <Checkbox radius="sm" />
        <div
          className="relative rounded-xl bg-neutral-400 row-span-1"
          style={{ width: '75px', height: '75px' }}
        >
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={data.thumbnail}
            layout="fill"
            loading="lazy"
          />
        </div>
        <div className="w-fit h-full flex flex-col justify-center ml-3">
          <div className="font-bold">{data.name}</div>
          <div>ID:{data.id}</div>
        </div>
      </div>
      <div className="mr-8 font-bold">{data.BandScoreId}.0</div>
    </Link>
  );
};

export default StaffCourseCard;
