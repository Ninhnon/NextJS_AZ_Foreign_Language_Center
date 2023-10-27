import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import ReviewCard from '../cards/ReviewCard';
import Loader from '../Loader';

const ReviewSwiper = ({ data }) => {
  return (
    <div className="h-full w-full">
      <Swiper
        style={
          {
            '--swiper-pagination-bullet-inactive-color': '#999999',
            '--swiper-pagination-color': '#000000',
            '--swiper-pagination-bullet-size': '12px',
            '--swiper-pagination-bullet-inactive-opacity': '0',
            '--swiper-pagination-bullet-opacity': '0',
            '--swiper-pagination-bullet-vertical-gap': '0px',
            '--swiper-pagination-bullet-horizontal-gap': '6px',
          } as React.CSSProperties
        }
        direction="horizontal"
        pagination={{
          clickable: true,
        }}
        spaceBetween={10}
        loop={true}
        autoplay={{ delay: 3000 }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          450: {
            slidesPerView: 1,
          },
          700: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          },
        }}
        className="w-full h-auto overflow-visible relative items-center justify-center"
      >
        {data ? (
          data?.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard data={review} />
            </SwiperSlide>
          ))
        ) : (
          <Loader />
        )}
      </Swiper>
    </div>
  );
};

export default ReviewSwiper;
