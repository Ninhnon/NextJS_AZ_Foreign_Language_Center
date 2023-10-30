import React from 'react';
import { Card, CardBody, Image } from '@nextui-org/react';

const ProfileCard = ({ data }) => {
  return (
    <div>
      <Card className="w-full h-fit" shadow="none">
        <CardBody className="overflow-visible">
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={data.image}
              width={200}
            />
            <span className="text-base">{data?.bandScore}</span>
            <span className="font-bold text-lg mb-5 text-clip">
              {data.name}
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfileCard;
