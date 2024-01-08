'use client';

import axios from 'axios';

export const useEmail = () => {
  const onConfirmationEmail = async (
    fullName: any,
    email: any,
    password: any
  ) => {
    const res = await axios.post(`/api/user/registration_email`, {
      fullName: fullName,
      email: email,
      password: password,
    });
    return res;
  };

  return { onConfirmationEmail };
};
