'use client';
import Image from 'next/image';
import {
  AiOutlineClockCircle,
  AiOutlineCalendar,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { format } from 'date-fns';

const PurchasedCourseCard = ({ data }) => {
  // const href = '/staff/course-list/' + data.id;
  return (
    // <Link
    //   aria-label="Products"
    //   href={href}
    //   className="w-fit h-fit flex flex-row justify-between shadow-md rounded-md p-2 m-3 items-center"
    // >
    <div
      className="relative rounded-xl p-4 bg-white w-full min-h-0 m-8 mx-auto
    drop-shadow-xl grid-rows-2 gap-4 break-words overflow-auto"
    >
      {/* Start Description Image */}

      <div
        className="relative rounded-xl bg-neutral-400 row-span-1"
        style={{ width: '200px', height: '120px' }}
      >
        <Image
          className="object-cover rounded-xl"
          src={data.thumbnail}
          alt="hero banner"
          layout="fill"
          loading="lazy"
        />
      </div>

      {/* Stop Description Image */}

      {/* Start Description Text */}
      <div className="row-span-1">
        <div>
          <div className="flex justify-between items-center mt-8">
            <div>
              <span className="text-silver-chalice text-lg font-medium">
                Beginner
              </span>
            </div>
          </div>

          <p>
            <span className="text-black text-base font-medium">
              {data.name}
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
    </div>
    // </Link>
  );
};

export default PurchasedCourseCard;
