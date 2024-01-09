import prisma from '@lib/prisma';

export async function PUT(req: Request) {
  const requestJSON = await req.json();

  const updateUser = await prisma.user.update({
    where: {
      id: requestJSON.id,
    },
    data: {
      name: requestJSON.fullName,
      role: requestJSON.role,
      birthDay: requestJSON.birthDay,
      phoneNumber: requestJSON.phoneNumber,
    },
  });

  if (updateUser) {
    return new Response(JSON.stringify(updateUser), { status: 200 });
  } else {
    return new Response(JSON.stringify('User not found'), { status: 404 });
  }
}
