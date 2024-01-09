import prisma from '@lib/prisma';

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const userId = searchParams.get('userId');
    if (!courseId || !userId)
      return new Response(JSON.stringify('Thiếu userId hoặc courseId'), {
        status: 403,
      });
    const existingOrder = await prisma.order.findFirst({
      where: {
        orderId: parseInt(courseId),
        userId: parseInt(userId),
      },
    });

    if (existingOrder) {
      return new Response(JSON.stringify(existingOrder), { status: 201 });
    } else {
      // Nếu chưa tồn tại, tạo record mới
      const newOrder = await prisma.order.create({
        data: {
          orderId: parseInt(courseId),
          userId: parseInt(userId),
          total: 0,
          orderDate: new Date(),
          status: 'Pending',
        },
      });

      return new Response(JSON.stringify(newOrder), { status: 200 });
    }
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
