import { Card, CardBody, Image } from '@nextui-org/react';
import React from 'react';

const ReviewCard = ({ data }) => {
  return (
    <div>
      <Card className="w-fit h-fit bg-transparent shadow-inner">
        <CardBody className="overflow-visible">
          <div className="w-fit flex flex-col gap-2 sm:gap-3">
            <div className="text-[#ACACAC] text-sm break-normal max-w-[35ch]">
              {data.content}
            </div>
            <div className="flex flex-row gap-2 justify-start items-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={data.user.avatar}
                width={45}
              />
              <div className="flex flex-col gap-1 justify-center">
                <span className="font-bold text-xs text-clip">
                  {data.user.name}
                </span>
                <span className="text-xs">{data.user.skill}</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ReviewCard;
