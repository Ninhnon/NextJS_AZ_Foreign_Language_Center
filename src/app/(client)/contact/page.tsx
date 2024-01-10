'use client';
import React, { useRef } from 'react';
import Image from 'next/image';

const page = () => {
  const windowWidth = useRef(window?.innerWidth);
  return (
    <div className="w-full h-full">
      <div
        className="flex flex-row-reverse bg-[url('/background_course_details.png')] 
      bg-cover bg-no-repeat min-h-full overflow-hidden p-4 space-x-4"
      >
        {/* Start Text */}
        <div
          className="flex flex-col flex-initial p-4 space-y-10
        md:w-3/5"
        >
          <span className="text-5xl font-bold ml-20 mt-20">
            Trung tâm hỗ trợ trực tuyến AZ
          </span>

          <span className="text-base font-normal ml-20">
            Tại A&Z, học viên học tập và phát triển theo phương pháp riêng phù
            hợp với sự khác biệt của bản thân, tài nguyên học tập cá nhân hoá,
            bài giảng trọng tâm dễ hiểu và đạt mục tiêu trong thời gian mong
            muốn.
          </span>
          <span className="text-base font-bold ml-20 mt-20">
            Liên hệ email: uitieltscenter@gmail.com
          </span>
          <span className="text-base font-bold ml-20 mt-20">
            SĐT: 0969 999 999 gặp tư vấn viên Nguyễn Ngọc Tín
          </span>
        </div>
        {/* End Text */}

        <div className="flex flex-1">
          <Image
            className="object-cover"
            src={`/female-model.png`}
            alt="female-model"
            width={windowWidth.current / 2}
            height={windowWidth.current / 4}
            loading="lazy"
          />
        </div>
      </div>

      <div className="bg-old-lace flex-l">
        <div className="flex flex-cols flex-initial w-full height-100 bg-red-500">
          {/* <div className="bg-red-500">Hello</div> */}
        </div>

        {/* <div className=""></div> */}
      </div>
    </div>
  );
};

export default page;
