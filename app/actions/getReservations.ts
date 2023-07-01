import prisma from 'AirbnbClone/app/libs/prismadb';
import { Listing } from '@prisma/client';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

const getReservations = async (params: IParams) => {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.Listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeReservations = reservations.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
      listing: {
        ...r.listing,
        createdAt: r.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getReservations;
