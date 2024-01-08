'use client';

import axios from 'axios';

export const useEmail = () => {
  const onConfirmationEmail = async (
    fullname: any,
    email: any,
    password: any
  ) => {
    const res = await axios.post(`/api/user/registration_email`, {
      fullname: fullname,
      email: email,
      password: password,
    });
    return res;
  };

  return { onConfirmationEmail };
};
