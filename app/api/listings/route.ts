import { NextResponse } from 'next/server';

import prisma from 'AirbnbClone/app/libs/prismadb';
import { getCurrentUser } from 'AirbnbClone/app/actions';

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const {
    title,
    description,
    imageSrc,
    guestCount,
    location,
    price,
    roomCount,
    bathroomCount,
    category,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      roomCount,
      bathroomCount,
      category,
      userId: currentUser.id,
    },
  });
  return NextResponse.json(listing);
};
