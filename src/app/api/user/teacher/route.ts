import prisma from '@/lib/prisma';

export async function GET() {
  const teacher = await prisma.user.findMany({
    where: {
      role: 'teacher',
    },
    include: {
      addresses: true,
    },
  });
  if (!teacher)
    return new Response(JSON.stringify({ message: 'error' }), { status: 500 });
  return new Response(JSON.stringify({ data: teacher, status: 200 }));
}
