import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const currentTime = new Date().toISOString();
    const all = await prisma.course.findMany({
      where: {
        startTime: {
          lte: currentTime,
        },
        endTime: {
          gte: currentTime,
        },
      },
      select: {
        id: true,
      },
    });
    const courseIds = all.map((order) => order.id);
    const ClassSession = await prisma.classSession.findMany({
      where: {
        courseId: {
          in: courseIds.filter((orderId) => orderId !== null) as number[],
        },
      },
      include: {
        Course: true,
        teacher: true,
        Room: true,
        time: true,
        skill: true,
      },
    });
    if (ClassSession)
      return new Response(JSON.stringify(ClassSession), { status: 200 });
  } catch (e) {
    console.log('e', e);
    return new Response(JSON.stringify(e), { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    const eventData = req.body; // Assuming the request contains event data

    // Perform event insertion using Prisma
    const createdEvent = await prisma.classSession.create({
      data: {
        courseId: 1,
        teacherId: 1,
        roomId: 1,
        timeId: 1,
        classShiftId: 1,
        // Map the eventData fields to the respective database fields
        // Example:
        StartTime: eventData.StartTime,
        // Other fields...
      },
    });

    res.status(201).json(createdEvent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
