'use client';
import Image from 'next/image';
import {
  AiOutlineClockCircle,
  AiOutlineCalendar,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { format } from 'date-fns';
import Link from 'next/link';
const PurchasedCourseCard = ({ data }) => {
  // const href = '/staff/course-list/' + data.id;
  return (
    // <Link
    //   aria-label="Products"
    //   href={href}
    //   className="w-fit h-fit flex flex-row justify-between shadow-md rounded-md p-2 m-3 items-center"
    // >
    <Link
      href={'/personal_profile/' + data.id}
      className="w-full h-fit flex flex-col justify-between shadow-md rounded-md p-2 m-3 items-center gap-4 break-words"
    >
      {/* Start Description Image */}

      <div
        className="relative rounded-xl row-span-1"
        style={{ width: '220px', height: '150px' }}
      >
        <Image
          className="object-cover rounded-xl"
          src={data.thumbnail}
          alt=""
          layout="fill"
          loading="lazy"
        />
      </div>

      {/* Stop Description Image */}

      {/* Start Description Text */}
      <div className="w-full row-span-1 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mt-8">
            <div>
              <span className="text-silver-chalice text-lg font-medium">
                {data.name}
              </span>
            </div>
          </div>

          <p>
            <span className="text-black text-base font-medium">
              {data.totalCost.toLocaleString('vi-VN')}VNĐ
            </span>
            <br />
          </p>

          <div className="flex items-center space-x-1">
            <BsFillPatchCheckFill className="fill-orange" />
            <span className="text-orange font-medium text-sm">
              {format(new Date(data.startTime), 'M/d/yy')}
            </span>
            <AiOutlineArrowRight className="fill-orange" />
            <span className="text-orange font-medium text-sm">
              {format(new Date(data.endTime), 'M/d/yy')}
            </span>
          </div>
        </div>

        <hr className="border-t border-gray-400 border-dashed my-1" />

        <div className="flex sm:space-x-2 flex-wrap">
          <div className="flex flex-wrap flex-shrink-0 min-w-[30%] items-center space-x-1">
            <AiOutlineClockCircle />
            <span className=" text-silver-chalice text-sm font-light">
              2h/buổi
            </span>
          </div>

          <div className="flex flex-wrap flex-shrink-0 min-w-[30%] items-center space-x-1">
            <AiOutlineCalendar />
            <span className="text-silver-chalice text-sm font-light">
              {data.TotalSession}
            </span>
          </div>
        </div>
      </div>
      {/* Stop Description Text */}
    </Link>
    // </Link>
  );
};

export default PurchasedCourseCard;
