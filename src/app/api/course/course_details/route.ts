import prisma from '@lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    if (!searchParams.get('courseId')) {
      return new Response(JSON.stringify({}), { status: 400 });
    }

    const courseId = parseInt(searchParams.get('courseId') || '0');
    const courseDetail = await prisma.courseDetails.findFirst({
      where: {
        courseId,
      },
    });

    if (courseDetail) {
      return new Response(JSON.stringify(courseDetail), { status: 200 });
    }
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
