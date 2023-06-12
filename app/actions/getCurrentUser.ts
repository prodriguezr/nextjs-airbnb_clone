import { getServerSession } from 'next-auth/next';
import { authOptions } from 'AirbnbClone/pages/api/auth/[...nextauth]';

import prisma from 'AirbnbClone/app/libs/prismadb';

export const getSession = async () => {
  return getServerSession(authOptions);
};

export default async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const getCurrentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!getCurrentUser) {
      return null;
    }

    return getCurrentUser;
  } catch (err: any) {
    return null;
  }
};
