import PurchasedCourseCard from '@/components/PurchasedCourseCard';
import React from 'react';

const page = () => {
  return (
    <div className="grid grid-cols-3 gap-10">
      <PurchasedCourseCard />
      <PurchasedCourseCard />
      <PurchasedCourseCard />
      <PurchasedCourseCard />
      <PurchasedCourseCard />
    </div>
  );
};

export default page;
