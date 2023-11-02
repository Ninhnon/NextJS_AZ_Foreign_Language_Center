'use client';

import React, { useRef } from 'react';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import CourseCard from '@/components/CourseCard';

import ReviewSwiper from '@/components/swipers/ReviewSwiper';
import ProfileSwiper from '@/components/swipers/ProfileSwiper';
import SummaryCard from '@/components/cards/SummaryCard';

const page = () => {
  const windowWidth = useRef(window?.innerWidth);
  const teacherData = [
    {
      id: 1,
      image: '/teacher_1.png',
      bandScore: '7.5 IELTS',
      name: 'Nguyễn Văn A',
    },
    {
      id: 2,
      image: '/teacher_2.png',
      bandScore: '7.0 IELTS',
      name: 'Nguyễn Văn B',
    },
    {
      id: 3,
      image: '/teacher_3.png',
      bandScore: '7.5 IELTS',
      name: 'Nguyễn Văn C',
    },
    {
      id: 4,
      image: '/teacher_4.png',
      bandScore: '8 IELTS',
      name: 'Nguyễn Văn D',
    },
    {
      id: 5,
      image: '/teacher_4.png',
      bandScore: '8 IELTS',
      name: 'Nguyễn Văn D',
    },
    {
      id: 6,
      image: '/teacher_4.png',
      bandScore: '8 IELTS',
      name: 'Nguyễn Văn D',
    },
    {
      id: 7,
      image: '/teacher_4.png',
      bandScore: '8 IELTS',
      name: 'Nguyễn Văn D',
    },
    {
      id: 8,
      image: '/teacher_4.png',
      bandScore: '8 IELTS',
      name: 'Nguyễn Văn D',
    },
    {
      id: 9,
      image: '/teacher_4.png',
      bandScore: '8 IELTS',
      name: 'Nguyễn Văn D',
    },
    {
      id: 10,
      image: '/teacher_4.png',
      bandScore: '8 IELTS',
      name: 'Nguyễn Văn D',
    },
  ];

  const userData = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'Clara R.Altman',
        skill: 'Intermediate',
        avatar: '/user_1.png',
      },
      content:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    },
    {
      id: 2,
      user: {
        id: 1,
        name: 'Clara R.Altman',
        skill: 'Intermediate',
        avatar: '/user_1.png',
      },
      content:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    },
    {
      id: 3,
      user: {
        id: 1,
        name: 'Clara R.Altman',
        skill: 'Intermediate',
        avatar: '/user_1.png',
      },
      content:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    },
    {
      id: 4,
      user: {
        id: 1,
        name: 'Clara R.Altman',
        skill: 'Intermediate',
        avatar: '/user_1.png',
      },
      content:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    },
    {
      id: 5,
      user: {
        id: 1,
        name: 'Clara R.Altman',
        skill: 'Intermediate',
        avatar: '/user_1.png',
      },
      content:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    },
  ];
  const summaryData = [
    {
      id: 1,
      image: '/test.png',
      title: 'Phương pháp học tập',
      content:
        'Học tập cá nhân hoá, lộ trình và giáo trình riêng. Luôn cập nhật theo từng năm.',
    },
    {
      id: 2,
      image: '/exam.png',
      title: 'Kiến thức',
      content:
        'Ngân hàng giáo trình và tài liệu do A&Z biên soạn hoàn thiện và cập nhập mới nhất theo cấu trúc đề thi IELTS 2023',
    },
    {
      id: 3,
      image: '/money.png',
      title: 'Cam kết đầu ra',
      content:
        'Bảo vệ tối đa quyền lợi của học viên, A&Z cam kết tài trợ học lại và phí thi lại nếu học viên không đạt kết quả mong muốn.',
    },
  ];
  return (
    <div className="flex flex-col h-full w-full">
      <div
        className="flex flex-col lg:flex-row space-between
       h-[700px] w-full bg-no-repeat bg-cover bg-hero-pattern"
      >
        <div className="flex flex-1 flex-col space-between items-center px-5">
          <p className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">
            <span className="text-[#050C26]">Lựa Chọn </span>
            <span className="text-[#FF7426]">Đúng</span>
            <br className="lg:flex hidden" />
            <span className="text-[#050C26]">Cho </span>
            <span className="text-[#FF7426]">Tương Lai</span>
            <br className="lg:flex hidden" />
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-black p-4">
            Tại A&Z, học viên học tập và phát triển theo phương
            <br className="lg:flex hidden" />
            pháp riêng phù hợp với sự khác biệt của bản thân, tài
            <br className="lg:flex hidden" />
            nguyên học tập cá nhân hoá, bài giảng trọng tâm dễ
            <br className="lg:flex hidden" />
            hiểu và đạt mục tiêu trong thời gian mong muốn.
          </p>
        </div>
        <Image
          alt="hero banner"
          src={`/hero-banner.png`}
          width={windowWidth.current / 2}
          height={windowWidth.current / 4}
          loading="lazy"
        />
      </div>

      <CourseCard />

      <div className="bg-[#FDF8EE]">
        <Image
          src={
            'https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_974,c_limit/79cf6b2d-1216-4d22-a3cd-e9fca50ddebe/nike-just-do-it.png'
          }
          className="relative"
          width={windowWidth.current}
          height={windowWidth.current / 2}
          priority
          quality={100}
          objectFit="cover"
          alt="hero image"
        />
        <div>TT</div>
      </div>

      <div className="w-full h-[50rem]  overflow-hidden bg-gray-50 relative flex flex-col items-center justify-center">
        <div className="w-fit h-fit flex flex-col md:flex-row rounded-md bg-[#4D2C5E] m-16 p-16 items-center gap-y-6 md:gap-x-6">
          <SummaryCard data={summaryData[0]} />
          <SummaryCard data={summaryData[1]} />
          <SummaryCard data={summaryData[2]} />
        </div>
      </div>
      <div
        className="w-full h-[80rem] bg-[url(/bg-ellipse-left.png),_url(/bg-ellipse-right.png)] 
        bg-[length:20rem,_20rem] bg-[repeat:no-repeat,_no-repeat] 
      bg-[position:left__top_,_right_bottom]  bg-no-repeat overflow-hidden bg-gray-50 relative flex flex-col items-center justify-center"
      >
        <div className="flex flex-row my-10 items-center justify-center font-semibold text-2xl font-PlaypenSans">
          <span>Những câu chuyện thành công cùng &nbsp;</span>
          <span className="text-[#FF7426]"> IELTS Tại A&Z</span>
        </div>

        <div className="w-full h-fit">
          <div className="h-fit w-full flex items-center">
            <ReviewSwiper data={userData} reverseDirection={true} />
          </div>
          <div className="h-fit w-full flex items-center mx-10">
            <ReviewSwiper data={userData} reverseDirection={false} />
          </div>
        </div>
        <div className="w-full h-fit flex flex-row justify-around items-center mt-8">
          <Image
            alt="curved arrow"
            src="/curved-arrow.png"
            width={150}
            height={150}
          />
          <span className="font-semibold text-2xl">Giảng Viên</span>
          <Image alt="planet" src="/planet.png" width={120} height={120} />
        </div>
        <div className="w-[75%] flex flex-row items-center justify-center">
          <ProfileSwiper data={teacherData} />
        </div>
      </div>

      {/* <ProfileCard
          data={{
            id: 1,
            image: '/teacher_1.png',
            bandScore: '7.5 IELTS',
            name: 'Nguyễn Văn A',
          }}
        /> */}
    </div>
  );
};
export default page;
