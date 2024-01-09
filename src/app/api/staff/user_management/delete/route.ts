import prisma from '@lib/prisma';

export async function PUT(req: Request) {
  const requestJSON = await req.json();

  const updateUser = await prisma.user.update({
    where: {
      id: requestJSON.id,
    },
    data: {
      isDisabled: true,
    },
  });

  if (updateUser) {
    return new Response(JSON.stringify(updateUser), { status: 200 });
  } else {
    return new Response(JSON.stringify('Không tìm thấy người dùng'), {
      status: 404,
    });
  }
}
