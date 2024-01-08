import { getRequest } from '@/lib/fetch';

export const useOrder = () => {
  const onGetOrderFromRange = async (from, to) => {
    const res = await getRequest({
      endPoint: `/api/order/get-range?from=${from}&to=${to}`,
    });

    if (res?.status === 200) return res?.data;

    return [];
  };

  const onGetOrders = async (page: number, limit: number, search: string) => {
    const res = await getRequest({
      endPoint: `/api/order?page=${page}&limit=${limit}&search=${search}`,
    });

    return res;
  };

  return { onGetOrderFromRange, onGetOrders };
};
