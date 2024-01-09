'use client';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
function AuthCarousel() {
  return (
    <div className="relative hidden h-screen w-1/2 flex-col bg-muted text-white dark:border-r lg:flex">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        <div className="h-screen w-full">
          <Image
            src="https://utfs.io/f/108d4057-8e86-4662-86aa-19b5552cc6fd-3locdn.jpg"
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
          />

          <div className="absolute bottom-20 z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Do the difficult things while they are easy and do the
                great things while they are small. A journey of a thousand miles
                begins with a single step.&rdquo;
              </p>
              <footer className="text-sm">Lao Tzu</footer>
            </blockquote>
          </div>
          <div className="absolute inset-0 bg-black opacity-10" />
        </div>
        <div>
          <Image
            src="https://utfs.io/f/82f5f85e-060f-4580-9c32-ab50ee729faa-xnew8.jpg"
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-10" />
          <div className="absolute bottom-20 z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Do the difficult things while they are easy and do the
                great things while they are small. A journey of a thousand miles
                begins with a single step.&rdquo;
              </p>
              <footer className="text-sm">Lao Tzu</footer>
            </blockquote>
          </div>
        </div>
        <div>
          <Image
            src="https://utfs.io/f/c8399328-2c5b-41df-beab-fcf30baac477-my3dt3.jpg"
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-10" />
          <div className="absolute bottom-20 z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Do the difficult things while they are easy and do the
                great things while they are small. A journey of a thousand miles
                begins with a single step.&rdquo;
              </p>
              <footer className="text-sm">Lao Tzu</footer>
            </blockquote>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default AuthCarousel;
