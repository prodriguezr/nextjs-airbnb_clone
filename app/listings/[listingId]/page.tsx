import { getCurrentUser, getListingById } from 'AirbnbClone/app/actions';
import { ClientOnly, EmptyState } from 'AirbnbClone/app/components';
import { Listing } from '@prisma/client';
import ListingClient from './ListingClient';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingById({
    params,
  });

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
