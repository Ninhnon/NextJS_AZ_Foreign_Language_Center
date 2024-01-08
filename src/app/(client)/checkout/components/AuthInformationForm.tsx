'use client';

import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

const AuthInformationForm = ({
  setPage,
  user,
  setUserFullname,
  setUserEmail,
}) => {
  const [fullName] = useState(user?.name);
  const [email] = useState(user?.email);
  return user ? (
    <div className="flex flex-col h-full justify-between">
      <div className="w-[95%] h-full flex flex-col gap-y-6">
        <Input
          placeholder="Nhập đầy đủ họ tên"
          value={fullName}
          onChange={(e) => {
            setUserFullname(e.target.value);
          }}
          label="Họ Tên"
        />
        <Input
          placeholder="Nhập email"
          value={email}
          disabled
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          label="Email"
        />
      </div>
      <div className="mt-20 w-full flex justify-center">
        <Button
          className="w-32"
          onClick={() => {
            setPage('2');
          }}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default AuthInformationForm;
