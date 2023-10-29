'use client';

import React, { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import { Tabs, Tab } from '@nextui-org/react';
import { Button } from '@/components/ui/button';
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
      <div className="w-[60%] grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={`/p1.png`}
            height={300}
            width={500}
          />
          <span className="font-bold text-2xl">Cơ sở vật chất hiện đại</span>
          <span className="font-bold text-[#DD9438] text-7xl">10+</span>
          <span className="text-lg mb-5 text-clip font-medium">
            phòng học trang bị đầy đủ
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={`/p2.png`}
            height={300}
            width={500}
          />
          <span className="font-bold text-2xl">Thu hút nhiều học viên</span>
          <span className="font-bold text-[#DD9438] text-7xl">200+</span>
          <span className="text-lg mb-5 text-clip font-medium">
            Học viên mới hàng năm
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={`/p3.png`}
            height={300}
            width={500}
          />
          <span className="font-bold text-2xl">Tài liệu đa dạng</span>
          <span className="font-bold text-[#DD9438] text-7xl">40+</span>
          <span className="text-lg mb-5 text-clip font-medium">
            Bộ đề mới hàng năm
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full lg:flex-row space-between">
        <Image
          alt="cam kết"
          src={`/camket.png`}
          width={700}
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
                'gap-12 space-between text-8xl relative rounded-none p-0 font-bold',
              cursor: 'w-full bg-[#FAAF3A]',
              tab: 'max-w-fit px-0 h-12',
              tabContent: 'group-data-[selected=true]:text-[#000]',
            }}
          >
            <Tab key="quality" title="Chất lượng học tập">
              <div className="pl-20">
                <p className="text-sm sm:text-base lg:text-lg text-black font-medium">
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
      <div className="flex flex-col lg:flex-row justify-stretch w-full relative">
        <div className="flex flex-1 flex-col pl-20 ">
          <p className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
            Đăng Ký Ngay
          </p>
          <p className=" text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
            Trở thành một học viên của A&Z
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-black p-4">
            Chúng tôi tin tưởng và cùng lan toả giá trị cốt lõi của giáo dục:
            <span className="text-[#FF7426]"> Phát triển con</span>
            <br className="lg:flex hidden" />
            <span className="text-[#FF7426]">người</span>
            . A&Z cá nhân hoá học tập và cũng cá nhân hoá con đường phát triển
            của
            <br className="lg:flex hidden" />
            từng học viên. Mỗi học viên được tạo điều kiện và môi trường học tập
            phù hợp tối
            <br className="lg:flex hidden" />
            đa với năng lực, phát huy sở trường của bản thân. Tại A&Z, mỗi cá
            nhân sẽ phát
            <br className="lg:flex hidden" />
            triển theo cách và màu sắc riêng.
          </p>
          <div className="justify-items-center justify-self-center">
            <Button className="w-[150px] ml-8 h-4 text-white hover:bg-pink-700 bg-[#FF7426]">
              Đặt lịch thi thử
            </Button>
          </div>
        </div>
        <Image
          alt="Đăng ký ngay"
          src={`/bo.png`}
          width={400}
          height={200}
          loading="lazy"
        />
      </div>
    </div>
  );
};
export default page;
