import Image from 'next/image';
import React from 'react';

const SummaryCard = ({
  data,
  titleColor,
  iconBg,
}: {
  data: any;
  iconBg?: string;
  titleColor?: string;
}) => {
  const iconBgColor = iconBg ? iconBg : 'bg-purple-400';
  const titleTextColor = titleColor ? titleColor : 'text-white';
  return (
    <div>
      <div className="w-fit h-fit bg-transparent border-none rounded-sm text-white">
        <div className="overflow-visible">
          <div className="w-fit flex flex-row gap-2 sm:gap-3 justify-center items-center">
            <div
              className={`h-[60px] w-[60px] rounded-2xl relative flex items-center justify-center ${iconBgColor}`}
            >
              <Image alt="image" src={data.image} width={40} height={40} />
            </div>
            <div className="flex flex-col gap-1">
              <span className={`text-lg font-bold ${titleTextColor}`}>
                {data.title}
              </span>
              <span className="text-xs break-normal max-w-[35ch] text-gray-400">
                {data.content}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
