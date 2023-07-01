import {
  getCurrentUser,
  getListingById,
  getReservations,
} from 'AirbnbClone/app/actions';
import { ClientOnly, EmptyState } from 'AirbnbClone/app/components';
import ListingClient from './ListingClient';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const reservations = await getReservations(params);
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
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
