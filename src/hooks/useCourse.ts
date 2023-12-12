import { getRequest } from '@/lib/fetch';

export const useCourse = () => {
  const onGetCourse = async (page: number, limit: number, type: string) => {
    const currentTime = new Date().toISOString();
    const res = await getRequest({
      endPoint: `/api/course/all?page=${page}&limit=${limit}&currentTime=${currentTime}&type=${type}`,
    });

    return res;
  };

  return { onGetCourse };
};
