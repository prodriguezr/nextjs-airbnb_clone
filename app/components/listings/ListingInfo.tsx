'use client';

import dynamic from 'next/dynamic';
import { IconType } from 'react-icons';

import { useCountries } from 'AirbnbClone/app/hooks';
import { SafeUser } from 'AirbnbClone/app/types';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';

const Map = dynamic(() => import('../Map'), { ssr: false });

interface ListingInfoProps {
  user: SafeUser;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coords = getByValue(locationValue)?.latlng;

  return (
    <div className='flex flex-col col-span-4 gap-4'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row items-center gap-2 text-xl font-semibold'>
          <div className=''>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className='text-lg font-light text-neutral-500'>{description}</div>
      <hr />
      <Map center={coords} />
    </div>
  );
};

export default ListingInfo;
