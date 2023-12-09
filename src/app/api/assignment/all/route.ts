import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '3');
  const search = searchParams.get('search') || '';
  const moduleId = parseInt(searchParams.get('moduleId') || '1');
  const skillId = parseInt(searchParams.get('skillId') || '1');
  const bandScoreId = parseInt(searchParams.get('bandScoreId') || '1');

  try {
    const all = await prisma.assignment.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        name: {
          contains: search,
        },
        moduleId,
        skillId,
        bandScoreId,
      },
      include: {
        Assignment_ClassSessions: true,
        Assignment_Users: true,
        bandScore: true,
        skill: true,
        module: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    const total = await prisma.assignment.count({
      where: {
        name: {
          contains: search,
        },
        moduleId,
        skillId,
        bandScoreId,
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
