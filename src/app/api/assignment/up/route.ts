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

export async function POST(req: Request) {
  try {
    const reqJson = await req.json();
    console.log('🚀 ~ file: route.ts:34 ~ POST ~ reqJson:', reqJson);
    const res = await prisma.assignment_User.update({
      where: {
        id: reqJson.id,
      },
      data: {
        createdAt: reqJson.createdAt,
        files: reqJson.files,
      },
    });
    return new Response(JSON.stringify({ res, status: 200 }));
  } catch (error) {
    console.log('🚀 ~ file: route.ts:36 ~ POST ~ error:', error);
  }
  return new Response(JSON.stringify({ status: 404 }));
}
