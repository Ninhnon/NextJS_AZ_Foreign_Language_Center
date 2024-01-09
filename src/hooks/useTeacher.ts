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

  const onUpdateAssignmentGrading = async (
    assignmentId: number,
    values: { comment?: string; score?: number }
  ) => {
    console.log(assignmentId, values, 'Cac gia tri');
    const res = await axios.put(`/api/user/teacher/edit-grade`, {
      id: assignmentId,
      comment: values.comment,
      score: values.score,
    });
    return res;
  };

  return {
    assignments,
    isAssignmentsLoading,
    isAssignmentsFetching,
    onUpdateAssignmentGrading,
  };
};
