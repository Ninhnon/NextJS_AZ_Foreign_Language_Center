import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '3');
  const currentTime =
    searchParams.get('currentTime') || new Date().toISOString();
  const type = searchParams.get('type') || 'open';
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
          gte: currentTime,
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
