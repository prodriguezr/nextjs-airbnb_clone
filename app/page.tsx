import { getCurrentUser, getListings } from './actions';
import { ClientOnly, Container, EmptyState } from './components';
import { ListingCard } from './components/listings';
import { SafeListing, SafeUser } from './types';
import { IListingsParams } from './actions/getListings';

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
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
          {listings.map((item: SafeListing) => {
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
};

export default Home;
