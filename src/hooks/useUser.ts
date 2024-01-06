import axios from 'axios';
import { AxiosResponse } from 'axios';
import { User } from '@/models';

export const useUser = () => {
  const onGetUser = async (): Promise<AxiosResponse<User[]>> => {
    const res = await axios.get(`/api/staff/user_management/all`);
    return res;
  };

  return { onGetUser };
};
