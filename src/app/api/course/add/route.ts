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

  //Add class sessions
  const classSessions = [];
  const currentDate = new Date(body.startTime);

  const daysOfWeek = [
    [1, 3, 5], // For tkbId = 1: Mon, Wed, Fri
    [2, 4, 6], // For tkbId = 2: Tue, Thu, Sat
  ];
  const skillMap = {
    Listening: 1,
    Reading: 2,
    Writing: 3,
    Speaking: 4,
  };
  const teacherMap = {
    1: body.ListeningValue,
    2: body.ReadingValue,
    3: body.WritingValue,
    4: body.SpeakingValue,
  };
  const hourMap = [7, 9, 13, 15, 17, 19];

  const selectedDays = daysOfWeek[body.TKB - 1]; // Get days based on tkbId
  const selectedHour = hourMap[body.Hour - 1]; // Get hour based on hourId
  let sessionsCount = 0;
  while (sessionsCount < body.totalSession) {
    const currentDay = currentDate.getDay();
    if (selectedDays.includes(currentDay)) {
      const startTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        selectedHour,
        0,
        0,
        0
      );

      const skillId = skillMap[body.sessions[sessionsCount].Skill];
      const teacherId = teacherMap[skillId];
      const classSession = await prisma.classSession.create({
        data: {
          courseId: course.id,
          skillId: skillId,
          teacherId: teacherId,
          StartTime: startTime,
          roomId: body.RoomValue,
          timeId: body.Hour,
          name: body.sessions[sessionsCount].Name,
        },
      });
      classSessions.push(classSession);
      sessionsCount++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return new Response(
    JSON.stringify({ message: 'success', data: classSessions, body: body })
  );
}
