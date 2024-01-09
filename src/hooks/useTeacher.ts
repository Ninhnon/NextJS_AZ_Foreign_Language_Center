'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useTeacher = () => {
  const { data: session } = useSession();
  const fetchAllAssignmentForGrading = async (teacherId) => {
    const res = await axios.get(
      `/api/teacher/grading/get-assignments?teacherId=${teacherId}`
    );
    return res.data;
  };
  const {
    data: assignments,
    isLoading: isAssignmentsLoading,
    isFetching: isAssignmentsFetching,
  } = useQuery({
    queryKey: ['assignments'],
    queryFn: () => fetchAllAssignmentForGrading(session?.user.id),
    cacheTime: 0,
    enabled: !!session?.user.id, // Chỉ enable query khi session?.user.id có giá trị
  });

  return { assignments, isAssignmentsLoading, isAssignmentsFetching };
};
