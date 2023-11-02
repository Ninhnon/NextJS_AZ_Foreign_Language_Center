'use client';
import Image from 'next/image';
import {
  AiOutlineClockCircle,
  AiOutlineCalendar,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { Label } from '@radix-ui/react-label';

const PurchasedCourseCard = () => {
  return (
    <div
      className="relative rounded-xl p-4 bg-white w-full min-h-0 m-8 mx-auto
    drop-shadow-xl grid-rows-2 gap-4 break-words overflow-auto"
    >
      {/* Start Description Image */}

      <div className=" rounded-xl bg-neutral-400 max-h-[50%] row-span-1">
        <Image
          className="object-cover rounded-xl"
          src={`/writing.png`}
          alt="hero banner"
          width={window.innerWidth / 2}
          height={window.innerWidth / 4}
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

            <div className="flex justify-end my-2">
              <Label className="rounded-sm text-white bg-orange font-medium p-1">
                Đang diễn ra
              </Label>
            </div>
          </div>

          <p>
            <span className="text-black text-base font-medium">
              Luyện thi Ielts 4.5
            </span>
            <br />
          </p>

          <div className="flex items-center space-x-1">
            <BsFillPatchCheckFill className="fill-orange" />
            <span className="text-orange font-medium text-sm">12/09/2023</span>
            <AiOutlineArrowRight className="fill-orange" />
            <span className="text-orange font-medium text-sm">13/10/2023</span>
          </div>
        </div>

        <hr className="border-t border-gray-400 border-dashed my-1" />

        <div className="flex sm:space-x-2 flex-wrap">
          <div className="flex flex-wrap flex-shrink-0 min-w-[30%] items-center space-x-1">
            <AiOutlineClockCircle />
            <span className=" text-silver-chalice text-sm font-light">
              1h30p/buổi
            </span>
          </div>

          <div className="flex flex-wrap flex-shrink-0 min-w-[30%] items-center space-x-1">
            <AiOutlineCalendar />
            <span className="text-silver-chalice text-sm font-light">
              34 buổi
            </span>
          </div>
        </div>
      </div>
      {/* Stop Description Text */}
    </div>
  );
};

export default PurchasedCourseCard;
