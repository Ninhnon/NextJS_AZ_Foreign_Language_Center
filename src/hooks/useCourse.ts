import { getRequest } from '@/lib/fetch';

export const useCourse = () => {
  const onGetCourse = async (page: number, limit: number, type: string) => {
    const currentTime = new Date().toISOString();
    const res = await getRequest({
      endPoint: `/api/course/all?page=${page}&limit=${limit}&currentTime=${currentTime}&type=${type}`,
    });

    return res;
  };

  // Lấy top n khóa học mới nhất
  const onGetTopCourse = async (top: number) => {
    const res = await getRequest({
      endPoint: `/api/course/top?top=${top}`,
    });

    return new Response(JSON.stringify(res), { status: 200 });
  };

  const onGetCourseDetails = async (slug: string) => {
    const res = await getRequest({
      endPoint: `/api/course/course_details?courseId=${slug}`,
    });

    return new Response(JSON.stringify(res), { status: 200 });
  };

  return { onGetCourse, onGetTopCourse, onGetCourseDetails };
};
