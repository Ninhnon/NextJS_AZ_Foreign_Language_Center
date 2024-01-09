import prisma from '@lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (!searchParams.get('teacherId')) {
    return new Response(JSON.stringify({}), { status: 400 });
  }

  const teacherId = parseInt(searchParams.get('teacherId') || '');

  const assignments = await prisma.assignment_User.findMany({
    where: {
      teacherId: teacherId,
      assignment: {
        skill: {
          name: 'Writing', // chỉ lấy những bài tập có kỹ năng là 'Writing'
        },
      },
    },
    include: {
      assignment: true,
      user: true,
      course: true,
    },
  });

  if (assignments) {
    return new Response(JSON.stringify(assignments), { status: 200 });
  } else {
    return new Response(JSON.stringify({}), { status: 404 });
  }
}
