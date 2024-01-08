import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let all = {};
  let total = 0;

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '3');
  const search = searchParams.get('search') || '';

  if (search === '') {
    all = await prisma.order.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: true,
        orderItem: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    total = await prisma.order.count({});
  } else {
    all = await prisma.order.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        OR: [
          {
            orderId: parseInt(search),
          },
          {
            id: parseInt(search),
          },
        ],
      },
      include: {
        user: true,
        orderItem: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    total = await prisma.order.count({
      where: {
        OR: [
          {
            orderId: parseInt(search),
          },
          {
            id: parseInt(search),
          },
        ],
      },
    });
  }

  const totalPage = Math.ceil(total / limit);
  const data = {
    data: all,
    totalItems: total,
    totalPage,
  };
  return new Response(JSON.stringify(data), { status: 200 });
}
