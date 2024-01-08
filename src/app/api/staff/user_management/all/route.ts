import prisma from '@lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          OR: [
            {
              role: 'admin',
            },
            {
              role: 'staff',
            },
          ],
        },
      },
    });
    if (users) {
      return new Response(JSON.stringify(users), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
