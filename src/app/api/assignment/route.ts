import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = parseInt(searchParams.get('id') || '0');

  try {
    const item = await prisma.assignment.findUnique({
      where: {
        id,
      },
      include: {
        Assignment_ClassSessions: true,
        Assignment_Users: true,
        bandScore: true,
        skill: true,
        module: true,
      },
    });
    const data = {
      data: item,
    };
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ status: 400, message: 'error when fetching...' })
    );
  }
}
