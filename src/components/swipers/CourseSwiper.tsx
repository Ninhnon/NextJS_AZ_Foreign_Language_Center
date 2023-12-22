import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Loader from '../Loader';
import CourseCard from '../cards/CourseCard';

const CourseSwiper = ({ data }) => {
  return (
    <div className="h-full w-[75%] flex justify-center items-center shadow-none">
      <Swiper
        style={
          {
            '--swiper-pagination-bullet-inactive-color': '#999999',
            '--swiper-pagination-color': '#000000',
            '--swiper-pagination-bullet-size': '12px',
            '--swiper-pagination-bullet-inactive-opacity': '0.2',
            '--swiper-pagination-bullet-opacity': '1',
            '--swiper-pagination-bullet-vertical-gap': '0px',
            '--swiper-pagination-bullet-horizontal-gap': '6px',
          } as React.CSSProperties
        }
        direction="horizontal"
        navigation={false}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          450: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className="w-full h-auto overflow-visible relative flex"
      >
        {data ? (
          data?.map((course) => (
            <SwiperSlide key={course.id} className="mb-8">
              <CourseCard data={course} />
            </SwiperSlide>
          ))
        ) : (
          <Loader />
        )}
      </Swiper>
    </div>
  );
};

export default CourseSwiper;
