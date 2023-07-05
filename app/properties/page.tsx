import { getCurrentUser, getListings, getReservations } from '../actions';
import { ClientOnly, EmptyState } from '../components';
import TripsClient from './PropertiesClient';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No Trips found'
          subtitle='Looks like you have no properties'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
