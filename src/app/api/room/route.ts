import prisma from '@/lib/prisma';

export async function GET() {
  const rooms = await prisma.room.findMany({
    where: {
      typeId: 1,
    },
  });
  if (rooms.length > 0) {
    return new Response(JSON.stringify({ data: rooms, status: 200 }));
  } else {
    return new Response(JSON.stringify({ message: 'error' }), { status: 500 });
  }
}
