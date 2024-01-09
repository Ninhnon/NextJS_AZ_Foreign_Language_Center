import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const requestJSON = await req.json();
  const user = await prisma.user.create({
    data: {
      name: requestJSON.fullName,
      email: requestJSON.email,
      password: requestJSON.password,
      role: requestJSON.role,
      birthDay: requestJSON.birthday,
      phoneNumber: requestJSON.phoneNumber,
    },
  });
  if (user) {
    const ordersToUpdate = await prisma.order.findMany({
      where: {
        anonymousUserEmail: user.email,
      },
    });

    if (ordersToUpdate && ordersToUpdate.length > 0) {
      for (const order of ordersToUpdate) {
        await prisma.order.update({
          where: {
            id: order.id,
          },
          data: {
            userId: user.id,
          },
        });
      }
    }
  }

  if (user) {
    return new Response(JSON.stringify(user), { status: 200 });
  } else {
    return new Response(JSON.stringify({}), { status: 400 });
  }
}
