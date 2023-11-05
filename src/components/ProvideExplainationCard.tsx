import { Button, Input } from '@nextui-org/react';
import React from 'react';

const ProvideExplainationCard = () => {
  return (
    <div
      className="flex flex-col w-full h-full bg-[url('/bg-explaination-card.png')]
    bg-cover bg-no-repeat min-h-full overflow-hidden rounded-lg"
    >
      <div className="text-center mt-10">
        <span className="text-white text-2xl font-bold">
          Giải đáp thắc mắc chi tiết về khóa học
        </span>
      </div>

      <div className="flex justify-center items-center mt-10">
        <div className="relative w-1/2">
          <Input
            className="w-full max-w-lg"
            placeholder="Email"
            radius="full"
          />
          <Button
            className="absolute h-[80%] right-1 top-1/2 transform 
          -translate-y-1/2 rounded-full cursor-pointer bg-orange"
          >
            <span className="text-white font-normal">Gửi</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProvideExplainationCard;
