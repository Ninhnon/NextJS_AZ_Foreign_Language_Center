/* eslint-disable no-undef */
'use client';

import React, { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import './styles.css';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AuthSvg from '@/assets/AuthSvg';
import { MobileNav } from './MobileNavBar';
import { CommonSvg } from '@/assets/CommonSvg';
import Logo from '../logo';
const NavigationMenuDemo = ({ session }) => {
  const [user] = useState(session?.user);
  const [show, setShow] = useState('translate-y-0');
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  });
  const controlNavbar = () => {
    if (window.scrollY > 100) {
      if (window.scrollY > lastScrollY) {
        setShow('-translate-y-[82px]');
      } else {
        setShow('shadow-sm');
      }
    } else {
      setShow('translate-y-0');
    }
    setLastScrollY(window.scrollY);
  };
  return (
    <div
      className={`w-full h-[50px] md:h-[80px] 
      bg-[#FDF8EE]  items-center justify-between z-20
    sticky transition-transform duration-300 px-14  
    ${show}
    `}
    >
      <MobileNav />
      <div className="hidden lg:flex py-5  ">
        <div className="flex flex-row gap-5 items-center justify-center">
          <DropdownMenu className="bg-[#FDF8EE]">
            <DropdownMenuTrigger>
              {' '}
              <Button
                variant="ghost"
                className="mr-2 px-0 pt-0 text-base hover:bg-transparent
           focus-visible:bg-transparent focus-visible:ring-0 
           focus-visible:ring-offset-0"
              >
                {CommonSvg.menuBurger()}
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="  gap-2 bg-[#FDF8EE] hover:text-[#FF7426]">
                <Link href="/personal_profile">
                  <div className="">{AuthSvg.book()}</div>
                  Danh sách khóa học
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="   gap-2 bg-[#FDF8EE] hover:text-[#FF7426]">
                <Link href="/personal_assignments">
                  <div className="">{AuthSvg.exercise()}</div>
                  Bài tập
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="  gap-2 bg-[#FDF8EE] hover:text-[#FF7426]">
                <Link href="/chat">
                  <div className="">{AuthSvg.chat()}</div>
                  Hỏi đáp
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="  gap-2 bg-[#FDF8EE] hover:text-[#FF7426]">
                <Link href="/tkb">
                  <div className="">{AuthSvg.date()}</div>
                  Thời khóa biểu
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>{' '}
        <div className="m-2" />
        <Logo />
        <NavigationMenu.Root className="NavigationMenuRoot">
          <NavigationMenu.List className="NavigationMenuList">
            <NavigationMenu.Item>
              <NavigationMenu.Link className="NavigationMenuLink" href={'/'}>
                Trang Chủ
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="NavigationMenuLink"
                href={'/introduction'}
              >
                Giới thiệu
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="NavigationMenuLink"
                href={'/course_details'}
              >
                Khóa học
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="NavigationMenuLink"
                href={'/entrance_examination'}
              >
                Thi thử
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="NavigationMenuLink"
                href={'/contact'}
              >
                Liên hệ
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className="NavigationMenuIndicator">
              <div className="Arrow" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="ViewportPosition">
            <NavigationMenu.Viewport className="NavigationMenuViewport" />
          </div>
        </NavigationMenu.Root>
        {user ? (
          <div className="flex flex-row gap-5 items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {' '}
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/user/profile">Hồ sơ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={'/' + user.role}>{user.role}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/auth/login' })}
                  className="border-solid border-t-2 mt-2  gap-2"
                >
                  <div className="">{AuthSvg.signIn()}</div>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button className="w-[150px] ml-8 h-8 text-white hover:bg-pink-700 bg-[#4D2C5E]">
            <Link href={'/auth/login'}>Đăng nhập</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationMenuDemo;
