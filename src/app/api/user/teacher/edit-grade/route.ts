import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  try {
    const requestJSON = await req.json(); // Sử dụng await để đợi kết quả của req.json()

    if (!requestJSON.id) {
      throw new Error('ID is required');
    }

    const updateAssignmentStatus = await prisma.assignment_User.update({
      where: {
        id: requestJSON.id,
      },
      data: {
        comment: requestJSON.comment,
        score: parseFloat(requestJSON.score),
      },
    });

    return new Response(JSON.stringify(updateAssignmentStatus), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.message === 'ID is required' ? 400 : 500,
    });
  }
}
