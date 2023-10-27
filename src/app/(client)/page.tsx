'use client';

import React, { useRef } from 'react';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';

import ReviewSwiper from '@/components/swipers/ReviewSwiper';

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
  console.log(teacherData);
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

      <div
        className="w-full h-[80rem] bg-[url(/bg-ellipse-left.png),_url(/bg-ellipse-right.png)] 
        bg-[length:20rem,_20rem] bg-[repeat:no-repeat,_no-repeat] 
      bg-[position:left__top_,_right_bottom]  bg-no-repeat px-4"
      >
        <div className="flex flex-row my-10 items-center justify-center font-semibold text-2xl">
          <span>Những câu chuyện thành công cùng &nbsp;</span>
          <span className="text-[#FF7426]"> IELTS Tại A&Z</span>
        </div>

        <div className="h-fit w-full flex items-center">
          <ReviewSwiper data={userData} />
        </div>
      </div>
      {/* <h1 className="px-1 text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          NEVER DONE RISING
        </h1>
        <Balancer className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
          Keep it classic in timeless, easy-to-wear kicks.
        </Balancer> */}

      {/* <ProfileCard
          data={{
            id: 1,
            image: '/teacher_1.png',
            bandScore: '7.5 IELTS',
            name: 'Nguyễn Văn A',
          }}
        /> */}

      {/* <div className="h-fit w-full">
          <ProfileSwiper data={teacherData} />
        </div> */}
      {/* <ReviewCard data={userData[0]} /> */}
    </div>
  );
};
export default page;
