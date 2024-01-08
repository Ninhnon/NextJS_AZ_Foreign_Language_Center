import { getRequest } from '@/lib/fetch';

export const useOrder = () => {
  const onGetOrderFromRange = async (from, to) => {
    const res = await getRequest({
      endPoint: `/api/order/get-range?from=${from}&to=${to}`,
    });

    if (res?.status === 200) return res?.data;

    return [];
  };

  return { onGetOrderFromRange };
};
