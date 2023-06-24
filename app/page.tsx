import { Listing } from '@prisma/client';
import { getCurrentUser, getListings } from './actions';
import { ClientOnly, Container, EmptyState } from './components';
import { ListingCard } from './components/listings';
import { SafeUser } from './types';

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className='grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {listings.map((item: Listing) => {
            return (
              <ListingCard
                key={item.id}
                currentUser={currentUser as SafeUser}
                data={item}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
