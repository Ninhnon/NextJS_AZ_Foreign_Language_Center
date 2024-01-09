import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1');
  const userId = parseInt(searchParams.get('userId') || '6');
  const limit = parseInt(searchParams.get('limit') || '3');
  const currentTime =
    searchParams.get('currentTime') || new Date().toISOString();

  const type = searchParams.get('type') || 'open';

  const courses = await prisma.order.findMany({
    where: {
      userId: userId,
    },
    select: {
      orderId: true,
    },
  });
  console.log('🚀 ~ file: route.tsx:22 ~ GET ~ courses:', courses);
  const orderIds = courses.map((order) => order.orderId);
  //Đang diễn ra
  if (type === 'open') {
    const all = await prisma.course.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        startTime: {
          lte: currentTime,
        },
        endTime: {
          gte: currentTime,
        },
        id: {
          in: orderIds.filter((orderId) => orderId !== null) as number[],
        },
      },
      include: {
        classsessions: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    const total = await prisma.course.count({
      where: {
        startTime: {
          lte: currentTime,
        },
        endTime: {
          gte: currentTime,
        },
        id: {
          in: orderIds.filter((orderId) => orderId !== null) as number[],
        },
      },
    });
    const totalPage = Math.ceil(total / limit);
    const data = {
      data: all,
      totalItems: total,
      totalPage,
    };
    return new Response(JSON.stringify(data), { status: 200 });
  } else if (type === 'close') {
    //Đã kết thúc
    const all = await prisma.course.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        endTime: {
          lt: currentTime,
        },
        id: {
          in: orderIds.filter((orderId) => orderId !== null) as number[],
        },
      },
      include: {
        classsessions: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    const total = await prisma.course.count({
      where: {
        endTime: {
          lt: currentTime,
        },
        id: {
          in: orderIds.filter((orderId) => orderId !== null) as number[],
        },
      },
    });
    const totalPage = Math.ceil(total / limit);
    const data = {
      data: all,
      totalItems: total,
      totalPage,
    };
    return new Response(JSON.stringify(data), { status: 200 });
  } else if (type === 'soon') {
    //Sắp diễn ra
    const all = await prisma.course.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        startTime: {
          gt: currentTime,
        },
        id: {
          in: orderIds.filter((orderId) => orderId !== null) as number[],
        },
      },
      include: {
        classsessions: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    const total = await prisma.course.count({
      where: {
        startTime: {
          gt: currentTime,
        },
        id: {
          in: orderIds.filter((orderId) => orderId !== null) as number[],
        },
      },
    });
    const totalPage = Math.ceil(total / limit);
    const data = {
      data: all,
      totalItems: total,
      totalPage,
    };
    return new Response(JSON.stringify(data), { status: 200 });
  }
  return new Response(JSON.stringify({ message: 'Not found' }), {
    status: 404,
  });
}
