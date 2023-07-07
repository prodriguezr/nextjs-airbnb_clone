'use client';

import { useCountries, useSearchModal } from 'AirbnbClone/app/hooks';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'Anywhere';
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      let diff = differenceInDays(end, start);

      return `${diff === 0 ? '1' : diff} Days`;
    }

    return 'Any Week';
  }, [startDate, endDate]);

  const guestsLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} ${+guestCount < 2 ? 'guest' : 'guests'}`;
    }

    return 'Add Guests';
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className='transition cursor-pointer border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md'
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='px-6 text-sm font-semibold'>{locationLabel}</div>
        <div className='hidden text-sm font-semibold sm:block px-5 border-x-[1px] flex-1 text-center'>
          {durationLabel}
        </div>
        <div className='flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600'>
          <div className='hidden sm:block'>{guestsLabel}</div>
          <div className='p-2 text-white rounded-full bg-rose-500 '>
            <BiSearch size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
