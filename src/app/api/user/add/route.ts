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
    return new Response(JSON.stringify(user), { status: 200 });
  } else {
    return new Response(JSON.stringify({}), { status: 400 });
  }
}
