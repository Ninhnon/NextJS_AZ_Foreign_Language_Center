'use client';

import { getRequest } from '@/lib/fetch';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCourse = () => {
  const fetchAllCourses = async () => {
    const res = await axios.get(
      `/api/staff/user_management/course_management/get_all_courses`
    );
    return res.data;
  };

  const {
    data: courses,
    isLoading: isCoursesLoading,
    isFetching: isCoursesFetching,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: () => fetchAllCourses(),
  });

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
  const onGetCourseInfo = async (slug: string) => {
    const res = await getRequest({
      endPoint: `/api/course/info?courseId=${slug}`,
    });


    return new Response(JSON.stringify(res), { status: 200 });
  };
  const onGetCourseFromId = async (
    page: number,
    limit: number,
    type: string,
    userId: number
  ) => {
    const currentTime = new Date().toISOString();
    const res = await getRequest({
      endPoint: `/api/course/all1?page=${page}&limit=${limit}&currentTime=${currentTime}&type=${type}&userId=${userId}`,
    });

    return res;
  };

  const onCheckOrder = async (courseId: string, userId: string) => {
    const res = await axios.post(
      `/api/staff/user_management/course_management/check_order?courseId=${courseId}&userId=${userId}`
    );
    if (res) {
      console.log(res.status, 'Status');
      console.log(res.data, 'Dữ liệu');
    }

    return res;
  };


  return {
    onGetCourse,
    onGetTopCourse,
    onGetCourseDetails,
    onGetCourseInfo,
    onGetCourseFromId,
    onCheckOrder,
    courses,
    isCoursesLoading,
    isCoursesFetching,
  };
};
