'use client';
import { Label } from '@radix-ui/react-label';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';

const RegisterForm = () => {
  const { control } = useForm({
    mode: 'onChange',
  });
  return (
    <div
      className="relative rounded-3xl p-4 bg-white w-full min-h-0 mx-auto
        drop-shadow-xl overflow-visible grid-rows-2 break-words space-y-4 lg:h-auto sm:h-[330px]"
    >
      <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-1">
        <Label className="font-semibold text-[10px] sm:text-[14px]">
          Họ và tên
        </Label>
        <Controller
          control={control}
          defaultValue={''}
          name="name"
          render={({ field }) => {
            return (
              <div>
                <Input
                  radius="lg"
                  type="text"
                  size="sm"
                  placeholder="Bui Cuong dep trai"
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            );
          }}
        />
      </div>

      <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-1">
        <Label className="font-semibold text-[10px] sm:text-[14px]">
          Email
        </Label>
        <Controller
          control={control}
          defaultValue={''}
          name="gmail"
          render={({ field }) => {
            return (
              <div>
                <Input
                  radius="lg"
                  type="text"
                  size="sm"
                  placeholder="abc@gmail.com"
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            );
          }}
        />
      </div>

      <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-1">
        <Label className="font-semibold text-[10px] sm:text-[14px]">
          Số điện thoại
        </Label>
        <Controller
          control={control}
          defaultValue={''}
          name="phone"
          render={({ field }) => {
            return (
              <div>
                <Input
                  radius="lg"
                  type="text"
                  size="sm"
                  placeholder="0123-456-789"
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            );
          }}
        />
      </div>

      <div
        className="row-span-1 flex justify-between py-4
       px-1 space-x-2"
      >
        <Button
          className="rounded-2xl bg-orange text-white
         h-12 lg:w-[40%] outline-orange p-2 md:w-28"
        >
          <div className="w-25 text-center">Đăng ký thi thử</div>
        </Button>
        <Button
          className="rounded-2xl bg-white text-orange
         outline-orange h-12 lg:w-[40%] p-2 md:w-28"
        >
          <div className="w-25 text-center">Tư vấn</div>
        </Button>
      </div>
      {/*  */}
    </div>
  );
};

export default RegisterForm;
