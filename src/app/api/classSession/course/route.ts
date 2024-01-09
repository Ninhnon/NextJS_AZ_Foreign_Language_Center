import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const courseId = parseInt(searchParams.get('courseId') || '1');

    const ClassSession = await prisma.classSession.findMany({
      where: {
        courseId: courseId,
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
