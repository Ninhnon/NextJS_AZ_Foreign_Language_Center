'use client';
import React from 'react';
import { Label } from '@radix-ui/react-label';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center space-y-4">
      <Label className="font-semibold">Khóa học đã được tạo thành công</Label>
      <Image
        className="object-cover rounded-xl"
        src={`/tick_icon.png`}
        alt="hero banner"
        width={100}
        height={50}
        loading="lazy"
      />
      <div className="row-span-1 flex justify-center space-x-4 mt-4">
        <Button
          color="primary"
          variant="ghost"
          className="w-[60%]"
          onClick={() => {
            router.push(`/staff/add_courses/`);
            router.refresh();
          }}
        >
          Quay lại
        </Button>

        <Button
          color="primary"
          variant="ghost"
          className="w-[60%]"
          onClick={() => {
            router.push(`/staff/course-list/`);
            router.refresh();
          }}
        >
          DS khóa học
        </Button>
      </div>
    </div>
  );
}
