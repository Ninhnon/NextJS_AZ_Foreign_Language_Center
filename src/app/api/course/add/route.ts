import prisma from '@/lib/prisma';
export async function POST(req: Request) {
  const body = await req.json();
  const startTime = new Date(body.startTime);
  const endTime = new Date(
    startTime.getTime() + 7 * (body.totalSession / 3 + 1) * 24 * 60 * 60 * 1000
  );
  const course = await prisma.course.create({
    data: {
      moduleId: body.moduleId,
      BandScoreId: body.BandScoreId,
      name: body.name,
      totalSession: parseInt(body.totalSession),
      totalAttendance: parseInt(body.totalAttendance),
      tuitionFee: parseInt(body.tuitionFee),
      totalCost: parseInt(body.totalCost),
      startTime: startTime,
      endTime: endTime,
      thumbnail: body.thumbnail,
    },
  });
  console.log('🚀 ~ file: route.ts:15 ~ POST ~ course:', course);
  console.log('🚀 ~ file: route.ts:4 ~ POST ~ body:', body);
  return new Response(JSON.stringify({ message: 'success', data: body }));
}
