import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const assignmentId = parseInt(searchParams.get('assignmentId') || '1');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '3');

  try {
    const all = await prisma.multipleChoiceQuestion.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        assignmentId,
      },
      include: {
        assignment: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    const total = await prisma.multipleChoiceQuestion.count({
      where: {
        assignmentId,
      },
    });
    const totalPage = Math.ceil(total / limit);
    const data = {
      data: all,
      totalItems: total,
      totalPage,
    };
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ status: 400, message: 'error when fetching...' })
    );
  }
}
