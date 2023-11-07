'use client';
import Image from 'next/image';

const EntranceExaminationCard = ({
  text = 'Hello',
  src = '/writing.png',
  backgroundColor = '#FFAE42',
}) => {
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className="relative rounded-xl w-[35%] sm:w-[70%] h-[150px] md:h-[200px]
 m-8 mx-auto drop-shadow-xl overflow-hidden grid-rows-3 cursor-pointer"
    >
      <div
        className="row-span-1 font-bold text-normal text-white
       mx-4 my-2 h-1/3 truncate"
      >
        {text}
      </div>
      {/* Start Description Image */}

      <div id="hello" className="rounded-b-xl row-span-2">
        <Image
          className="object-cover rounded-b-xl absolute bottom-0"
          src={src}
          alt="hero banner"
          width={window.innerWidth / 2}
          height={window.innerWidth / 4}
          loading="lazy"
        />
      </div>

      {/* Stop Description Image */}
    </div>
  );
};

export default EntranceExaminationCard;
