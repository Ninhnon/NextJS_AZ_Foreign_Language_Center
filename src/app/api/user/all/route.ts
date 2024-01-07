import prisma from '@/lib/prisma';

export async function GET() {
  const users = await prisma.user.findMany({});
  if (users.length > 0) {
    return new Response(JSON.stringify({ data: users, status: 200 }));
  } else {
    return new Response(JSON.stringify({ message: 'error' }), { status: 500 });
  }
}
