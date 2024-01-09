import { getRequest } from '@/lib/fetch';

export const useRoom = () => {
  const onGetRoom = async (
    page: number,
    limit: number,
    search: string,
    type: number
  ) => {
    const res = await getRequest({
      endPoint: `/api/room/all?page=${page}&limit=${limit}&search=${search}&type=${type}`,
    });
    console.log(
      '🚀 ~ file: RoomList.tsx:58 ~ fetchRoomListData ~ selectedRoomListOption:',
      type
    );
    return res;
  };

  return { onGetRoom };
};
