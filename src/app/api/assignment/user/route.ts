import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let total = 0;

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '3');
  const search = searchParams.get('search') || '';
  console.log('🚀 ~ file: route.ts:10 ~ GET ~ search:', search);
  const userId = parseInt(searchParams.get('userId') || '6');
  const courseId = parseInt(searchParams.get('courseId') || '12');

  const assignments = await prisma.assignment_User.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      userId: userId,
      courseId: courseId,
    },
    include: {
      assignment: {
        include: {
          Assignment_ClassSessions: {
            include: {
              classSession: {
                include: {
                  Course: true,
                },
              },
            },
          },
        },
      },
    },
  });
  console.log('🚀 ~ file: route.ts:35 ~ GET ~ assignments:', assignments);

  total = await prisma.assignment_User.count({
    where: {
      userId: userId,
      courseId: courseId,
    },
  });

  const totalPage = Math.ceil(total / limit);
  const data = {
    data: assignments,
    totalItems: total,
    totalPage,
  };
  return new Response(JSON.stringify(data), { status: 200 });
}
