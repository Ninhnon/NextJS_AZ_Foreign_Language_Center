import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const currentTime = new Date().toISOString();
    const all = await prisma.course.findMany({
      where: {
        startTime: {
          lte: currentTime,
        },
        endTime: {
          gte: currentTime,
        },
      },
      select: {
        id: true,
      },
    });
    const courseIds = all.map((order) => order.id);
    const ClassSession = await prisma.classSession.findMany({
      where: {
        courseId: {
          in: courseIds.filter((orderId) => orderId !== null) as number[],
        },
      },
      include: {
        Course: true,
        teacher: true,
        Room: true,
        time: true,
        skill: true,
      },
    });
    if (ClassSession)
      return new Response(JSON.stringify(ClassSession), { status: 200 });
  } catch (e) {
    console.log('e', e);
    return new Response(JSON.stringify(e), { status: 500 });
  }
}
