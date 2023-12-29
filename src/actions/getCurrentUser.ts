import prisma from '@/lib/prisma';
const getCurrentUser = async (email) => {
  console.log(
    '🚀 ~ file: getCurrentUser.ts:3 ~ getCurrentUser ~ email:',
    email
  );
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });
    console.log(
      '🚀 ~ file: getCurrentUser.ts:11 ~ getCurrentUser ~ currentUser:',
      currentUser
    );

    if (!currentUser) {
      return null;
    }
    console.log(
      '🚀 ~ file: getCurrentUser.ts:11 ~ getCurrentUser ~ currentUser:',
      currentUser
    );

    return currentUser;
  } catch (error: any) {
    console.log(
      '🚀 ~ file: getCurrentUser.ts:11 ~ getCurrentUser ~ error:',
      error
    );
    return null;
  }
};

export default getCurrentUser;
