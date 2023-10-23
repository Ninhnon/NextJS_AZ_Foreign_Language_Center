'use client';

import React, { useRef } from 'react';
import { Balancer } from 'react-wrap-balancer';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';

const page = () => {
  const windowWidth = useRef(window?.innerWidth);
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
      <div>TT</div>
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

      <Image
        src={
          'https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1531,c_limit/bb4458f0-855c-4548-a745-97aefec048ea/nike-just-do-it.jpg'
        }
        className="relative"
        width={windowWidth.current}
        height={windowWidth.current / 2}
        priority
        quality={100}
        objectFit="cover"
        alt="hero image"
      />
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
      >
        <h1 className="px-1 text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          NEVER DONE RISING
        </h1>
        <Balancer className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
          Keep it classic in timeless, easy-to-wear kicks.
        </Balancer>
      </section>
    </div>
  );
};
export default page;
