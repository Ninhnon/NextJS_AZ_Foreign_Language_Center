import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const re = await request.json();
  let res;
  const old = await prisma.assignment_User.findFirst({
    where: {
      assignmentId: re.assignmentId,
      userId: re.userId,
    },
  });
  if (!old) {
    res = await prisma.assignment_User.create({
      data: {
        assignmentId: re.assignmentId,
        userId: re.userId,
        score: re.score,
      },
    });
  } else {
    res = await prisma.assignment_User.update({
      where: {
        id: old.id,
      },
      data: {
        score: re.score,
      },
    });
  }
  if (!res) {
    return new Response(JSON.stringify({}), { status: 404 });
  }
  return new Response(JSON.stringify(res), { status: 200 });
}
