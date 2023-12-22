import prisma from '@lib/prisma';

export async function GET(req: Request) {
  try {
    // Lấy top n khóa học mới nhất
    const { searchParams } = new URL(req.url);

    if (!searchParams.get('top')) {
      return new Response(JSON.stringify({}), { status: 400 });
    }

    const top = parseInt(searchParams.get('top') || '3');

    const courses = await prisma.course.findMany({
      take: top,
      orderBy: {
        startTime: 'desc',
      },
    });

    if (courses) {
      return new Response(JSON.stringify(courses), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
