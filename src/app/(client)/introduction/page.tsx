'use client';

import React, { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import { Tabs, Tab } from '@nextui-org/react';

const page = () => {
  const [selected, setSelected] = useState('photos');
  return (
    <div className="flex flex-col justify-center items-center ">
      Trang giới thiệu
      <div className="w-full h-[800px] relative">
        <Image
          alt="introduction"
          src={`/introduction.png`}
          fill
          loading="lazy"
        />
      </div>
      <div className="w-[60%] h-[300px] relative">
        <Image
          alt="số liệu trung tâm"
          src={`/solieu.png`}
          fill
          loading="lazy"
        />
      </div>
      <div className="w-[60%] h-[300px] relative flex flex-col lg:flex-row justify-evenly font-bold bg-cyan-300 ">
        <div>
          <Image
            className="w-1/3 h-[300px]"
            alt="số liệu trung tâm"
            src={`/teacher_1.png`}
            fill
            loading="lazy"
          />
        </div>
        <div>
          <Image
            className="w-1/3 h-[300px]"
            alt="số liệu trung tâm"
            src={`/teacher_1.png`}
            fill
            loading="lazy"
          />
        </div>
        <div>
          <Image
            className="w-1/3 h-[300px]"
            alt="số liệu trung tâm"
            src={`/teacher_1.png`}
            fill
            loading="lazy"
          />
        </div>
      </div>
      <div className="w-[60%] h-[300px] relative justify-center items-center ">
        <div className="flex flex-col w-full lg:flex-row justify-evenly font-bold bg-cyan-300">
          <p>Cơ sở vật chất hiện đại</p>
          <p>Thu hút nhiều học viên</p>
          <p>Tài liệu đa dạng</p>
        </div>
      </div>
      <div className="flex flex-col w-full lg:flex-row space-between">
        <Image
          alt="cam kết"
          src={`/camket.png`}
          width={500}
          height={300}
          loading="lazy"
        />

        <div className="flex flex-col items-center">
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={setSelected}
            color="primary"
            variant="underlined"
            size="lg"
            classNames={{
              tabList:
                'gap-12 space-between text-6xl relative rounded-none p-0 font-bold',
              cursor: 'w-full bg-[#FAAF3A]',
              tab: 'max-w-fit px-0 h-12',
              tabContent: 'group-data-[selected=true]:text-[#000]',
            }}
          >
            <Tab key="quality" title="Chất lượng học tập">
              <div className="pl-20">
                <p className="text-sm sm:text-base lg:text-lg text-black">
                  <span className="text-[#050C26]">A&Z cam kết </span>
                  <span className="text-[#FF7426] font-bold">100%</span>
                  <span className="text-[#050C26]">
                    {' '}
                    học viên đạt kết quả như mong muốn. Học viên tại
                  </span>
                  <br className="lg:flex hidden" />
                  <span className="text-[#050C26]">
                    ZIM luôn an tâm với cam kết{' '}
                  </span>
                  <span className="text-[#FF7426] font-bold">Zero-risk</span>
                  <span className="text-[#050C26]">
                    : tài trợ 100% phí thi lại và học lại
                  </span>
                  <br className="lg:flex hidden" />
                  cho học viên không đạt kết quả như cam kết.{' '}
                </p>
              </div>
            </Tab>
            <Tab key="method" title="Phương pháp học">
              <div className="pl-20">
                <p className="max-w-fit px-0 h-12 text-sm sm:text-base lg:text-lg text-black">
                  Để học viên được trải nghiệm môi trường học tập tuyệt vời và
                  đạt được mục tiêu
                  <br className="lg:flex hidden" />
                  học tập, A&Z liên tục nghiên cứu phương pháp và kỹ thuật giảng
                  dạy tối ưu hơn
                  <br className="lg:flex hidden" />
                  <span className="text-[#050C26]">giúp học viên học tập </span>
                  <span className="text-[#FF7426] font-bold">hiệu quả </span>
                  <span className="text-[#050C26]">hơn.</span>
                </p>
              </div>
            </Tab>
            <Tab key="value" title="Giá trị đem lại">
              <div className="pl-20">
                <p className="max-w-fit px-0 h-12 text-sm sm:text-base lg:text-lg text-black">
                  ZIM xuất bản hệ thống tài nguyên học tiếng Anh chất lượng cao
                  và đa dạng
                  <br className="lg:flex hidden" />
                  chủ đề, được ứng dụng những kết quả nghiên cứu và phát triển
                  phương
                  <br className="lg:flex hidden" />
                  pháp học tốt hơn, giúp học viên học tập dễ dàng mọi lúc và mọi
                  nơi.{' '}
                </p>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default page;
