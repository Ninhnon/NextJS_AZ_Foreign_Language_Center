import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
function Logo() {
  return (
    <Link className="w-[200px]" href={'/'}>
      <div className="items-center w-full flex flex-row gap-2">
        <Image
          alt="logo"
          src={
            'https://utfs.io/f/d48f1a6d-433c-428e-96d8-2f0ee6c7f0b0-8l81zi.png'
          }
          width={80}
          height={80}
        />

        {/* <div className="text-lg w-full font-bold tracking-tight">
          A&Z Center
        </div> */}
      </div>
    </Link>
  );
}

export default Logo;
