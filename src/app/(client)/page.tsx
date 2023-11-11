'use client';

import React, { useRef } from 'react';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';

import ReviewSwiper from '@/components/swipers/ReviewSwiper';
import ProfileSwiper from '@/components/swipers/ProfileSwiper';
import SummaryCard from '@/components/cards/SummaryCard';
import CourseSwiper from '@/components/swipers/CourseSwiper';
import QuestionBox from '@/components/ui/QuestionBox';
import { Button } from '@nextui-org/react';

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
    {
      id: 4,
      image: '/heart.png',
      title: 'Đội ngũ giảng viên chuyên môn sâu',
      content: 'Giảng viên tại A&Z có trình độ IELTS 7.5 -> 8.5.',
    },
    {
      id: 5,
      image: '/puzzle.png',
      title: 'Hệ thống bài thi đánh giá chính xác trình độ',
      content:
        'Học viên luôn có thể biết chính xác trình độ bản thân thông qua hệ thống bài thi thử IELTS do A&Z tổ chức.',
    },
  ];

  const courseData = [
    {
      id: 1,
      image: '/course_writing.png',
      level: 'Beginner',
      title: 'Luyện thi Ielts 4.5',
      enrolled: '250.000+',
      length: '1h30p/buổi',
      duration: '34 buổi',
    },
    {
      id: 2,
      image: '/course_group.png',
      level: 'Intermediate',
      title: 'Luyện thi Ielts 5.5',
      enrolled: '250.000+',
      length: '1h30p/buổi',
      duration: '34 buổi',
    },
    {
      id: 3,
      image: '/course_learn.png',
      level: 'Advanced',
      title: 'Luyện thi Ielts 6.5',
      enrolled: '250.000+',
      length: '1h30p/buổi',
      duration: '34 buổi',
    },
  ];
  return (
    <div className="flex flex-col h-full w-full">
      <div
        className="flex flex-col lg:flex-row space-between
      h-fit w-full bg-no-repeat bg-cover bg-hero-pattern bg-[#FDF8EE]"
      >
        <div className="flex flex-1 flex-col space-between items-center justify-start px-5 gap-6">
          <p className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-[#050C26]">Lựa Chọn </span>
            <span className="text-[#FF7426]">Đúng</span>
            <div className="my-2 md:my-4"></div>
            <span className="text-[#050C26]">Cho </span>
            <span className="text-[#FF7426]">Tương Lai</span>
            <br className="lg:flex hidden" />
          </p>
          <p className="text-sm sm:text-base lg:text-lg font-bold text-justify text-black p-4 max-w-[40ch]">
            Tại A&Z, học viên học tập và phát triển theo phương pháp riêng phù
            hợp với sự khác biệt của bản thân, tài nguyên học tập cá nhân hoá,
            bài giảng trọng tâm dễ hiểu và đạt mục tiêu trong thời gian mong
            muốn.
          </p>
          <Button radius="full" size="lg" className="bg-[#FDB21A] text-white">
            Khám phá tại đây
          </Button>
        </div>
        <Image
          alt="hero banner"
          src={`/hero-banner.png`}
          width={windowWidth.current / 2}
          height={windowWidth.current / 4}
          loading="lazy"
        />
      </div>

      <div className="w-full h-fit overflow-hidden bg-transparent relative flex flex-col items-center">
        <div className="w-fit h-fit flex flex-col md:flex-row rounded-md bg-[#4D2C5E] m-16 p-10 items-center gap-y-6 md:gap-x-6">
          <SummaryCard data={summaryData[0]} />
          <SummaryCard data={summaryData[1]} />
          <SummaryCard data={summaryData[2]} />
        </div>
      </div>

      <div
        className="w-full h-fit flex flex-col justify-center items-center bg-[url(/lightbulb.png),_url(/curved_arrow.png)] 
        bg-[length:6rem,_6rem] bg-[repeat:no-repeat,_no-repeat] 
      bg-[position:left_5rem_top,_right_3rem_top]  bg-no-repeat mb-32"
      >
        <div className="text-3xl font-bold">Các Khóa Học Nổi Bật</div>
        <div className="text-sm text-gray-500">
          Top 3 khóa học được đăng ký nhiều nhất tại A&Z{' '}
        </div>
        <CourseSwiper data={courseData} />
      </div>

      <div className="w-full h-fit flex flex-col lg:flex-row bg-[#FDF8EE] p-8 items-center">
        <div
          className="w-full h-full bg-[#FDF8EE]"
          style={{ position: 'relative', width: '50%', paddingBottom: '20%' }}
        >
          <Image
            alt="Image Alt"
            src={'/studying_girl.png'}
            layout="fill"
            objectFit="contain" // Scale your image down to fit into the container
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-y-4">
          <div className="text-3xl font-bold gap-y-2 flex flex-col justify-center items-start">
            <div>Cam kết</div>
            <div>
              {' '}
              <span className="text-orange">chất lượng</span>
              <span>&nbsp;học</span>
            </div>
          </div>

          <SummaryCard
            data={summaryData[3]}
            iconBg="bg-[#4D2C5E]"
            titleColor="text-[#000000]"
          />
          <SummaryCard
            data={summaryData[4]}
            iconBg="bg-[#4D2C5E]"
            titleColor="text-[#000000]"
          />
        </div>
      </div>

      <div
        className="w-full h-[80rem] bg-[url(/bg_ellipse_left.png),_url(/bg_ellipse_right.png)] 
        bg-[length:20rem,_20rem] bg-[repeat:no-repeat,_no-repeat] 
      bg-[position:left__top_,_right_bottom]  bg-no-repeat overflow-hidden bg-gray-50 relative flex flex-col items-center justify-center"
      >
        <div className="flex flex-col md:flex-row my-10 items-center justify-center font-semibold text-2xl font-PlaypenSans">
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

      <div className="w-full h-fit flex justify-center items-center mb-32 bg-gray-50">
        <QuestionBox handleSubmit={() => {}} />
      </div>
    </div>
  );
};
export default page;
