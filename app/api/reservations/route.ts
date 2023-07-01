import { NextResponse } from 'next/server';

import prisma from 'AirbnbClone/app/libs/prismadb';
import { getCurrentUser } from 'AirbnbClone/app/actions';

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();

  const { listingId, totalPrice, startDate, endDate } = body;

  if (!listingId || !totalPrice || !startDate || !endDate) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
};
