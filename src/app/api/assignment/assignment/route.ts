import prisma from '@lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const assignId = parseInt(searchParams.get('assignId') || '10');
    const userId = parseInt(searchParams.get('userId') || '6');
    const courseDetail = await prisma.assignment_User.findFirst({
      where: {
        assignmentId: assignId,
        userId,
      },
    });

    if (courseDetail) {
      return new Response(JSON.stringify(courseDetail), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
