import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import React from 'react';
import ProfileCard from '../cards/ProfileCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Loader from '../Loader';

const ProfileSwiper = ({ data }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
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
            spaceBetween: 10,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1100: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        className="w-full h-auto overflow-visible relative flex items-center justify-center"
      >
        {data ? (
          data?.map((teacher) => (
            <SwiperSlide key={teacher.id}>
              <ProfileCard data={teacher} />
            </SwiperSlide>
          ))
        ) : (
          <Loader />
        )}
      </Swiper>
    </div>
  );
};

export default ProfileSwiper;
