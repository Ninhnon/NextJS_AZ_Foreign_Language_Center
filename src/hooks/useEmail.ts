'use client';

import axios from 'axios';

export const useEmail = () => {
  const onConfirmationEmail = async () => {
    const res = await axios.post(`/api/user/registration_email`);
    return res;
  };

  return { onConfirmationEmail };
};
