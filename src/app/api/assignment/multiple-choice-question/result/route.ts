import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const re = await request.json();
  const res = await prisma.assignment_User.create({
    data: {
      assignmentId: re.assignmentId,
      userId: re.userId,
      score: re.score,
    },
  });
  if (!res) {
    return new Response(JSON.stringify({}), { status: 404 });
  }
  return new Response(JSON.stringify(res), { status: 200 });
}
