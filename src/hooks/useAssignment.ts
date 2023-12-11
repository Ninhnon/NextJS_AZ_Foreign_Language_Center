import { getRequest } from '@/lib/fetch';

export const useAssignment = () => {
  const onGetAssignment = async (
    page: number,
    limit: number,
    moduleId: number,
    skillId: number,
    bandScoreId: number
  ) => {
    const res = await getRequest({
      endPoint: `/api/assignment/all?page=${page}&limit=${limit}&moduleId=${moduleId}&skillId=${skillId}&bandScoreId=${bandScoreId}`,
    });
    console.log(
      '🚀 ~ file: useAssignment.ts:14 ~ useAssignment ~ endPoint:',
      `/api/assignment/all?page=${page}&limit=${limit}&moduleId=${moduleId}&skillId=${skillId}&bandScoreId=${bandScoreId}`
    );
    console.log('🚀 ~ file: useAssignment.ts:14 ~ useAssignment ~ res:', res);

    // return {
    //   data: res.data,
    //   totalPages: Math.round(res.totalPages),
    //   totalItems: res.totalItems,
    // };
    return res;
  };

  const onGetAssignmentById = async (id: number) => {
    const res = await getRequest({
      endPoint: `/api/assignment?id=${id}`,
    });

    return res;
  };

  return { onGetAssignment, onGetAssignmentById };
};
