import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className="bg-[#FDF8EE] text-[#606060] pt-14 pb-3">
      <div
        className="w-full px-5
  md:px-10 mx-auto flex justify-between flex-col md:flex-row gap-[50px] md:gap-0"
      >
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
          {/* MENU START */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="font-oswald font-bold uppercase text-sm cursor-pointer">
              A&Z
            </div>
            <Link aria-label="Products" href="/introduction">
              <div className="font-oswald font-medium text-sm cursor-pointer">
                Giới thiệu
              </div>
            </Link>
            <Link aria-label="Products" href="/entrance_examination">
              <div className="font-oswald font-medium text-sm cursor-pointer">
                Cách để đăng ký
              </div>
            </Link>
            <Link aria-label="Products" href="/course_details">
              <div className="font-oswald font-medium text-sm cursor-pointer">
                Các khóa học nổi bật
              </div>
            </Link>
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-bold uppercase text-sm">
                Khóa học
              </div>
              <div className="text-sm text-black hover:text-white cursor-pointer">
                Luyện thi IELTS
              </div>
              <div className="text-sm text-black hover:text-white cursor-pointer">
                Tiếng anh giao tiếp
              </div>
              <div className="text-sm text-black hover:text-white cursor-pointer">
                Chương trình Ielts Junior
              </div>
            </div>
            {/* MENU END */}

            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <Link aria-label="Products" href="/contact">
                <div className="font-oswald font-bold uppercase text-sm">
                  Hỗ trợ
                </div>
              </Link>
              <Link aria-label="Products" href="/contact">
                <div className="text-sm text-black hover:text-white cursor-pointer">
                  Trung tâm trợ giúp
                </div>
              </Link>
              <Link aria-label="Products" href="/contact">
                <div className="text-sm text-black hover:text-white cursor-pointer">
                  FAQ
                </div>
              </Link>
            </div>
            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-4 justify-center md:justify-start">
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-black cursor-pointer">
            <FaFacebookF size={20} />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-black cursor-pointer">
            <FaTwitter size={20} />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-black cursor-pointer">
            <FaYoutube size={20} />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-black cursor-pointer">
            <FaInstagram size={20} />
          </div>
        </div>
        {/* RIGHT END */}
      </div>
      <div
        className="w-full px-5
  md:px-10 mx-auto flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0"
      >
        {/* LEFT START */}
        <div className="text-[12px] text-black hover:text-white cursor-pointer text-center md:text-left">
          © A&Z. All Rights Reserved
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
          <div className="text-[12px] text-black hover:text-white cursor-pointer">
            Guides
          </div>
          <div className="text-[12px] text-black hover:text-white cursor-pointer">
            Terms of Sale
          </div>
          <div className="text-[12px] text-black hover:text-white cursor-pointer">
            Terms of Use
          </div>
          <div className="text-[12px] text-black hover:text-white cursor-pointer">
            Privacy Policy
          </div>
        </div>
        {/* RIGHT END */}
      </div>
    </footer>
  );
};

export default Footer;
