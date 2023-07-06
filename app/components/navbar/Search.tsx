'use client';

import { useSearchModal } from 'AirbnbClone/app/hooks';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  const searchModal = useSearchModal();

  return (
    <div
      onClick={searchModal.onOpen}
      className='transition cursor-pointer border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md'
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='px-6 text-sm font-semibold'>Anywhere</div>
        <div className='hidden text-sm font-semibold sm:block px-5 border-x-[1px] flex-1 text-center'>
          Any Week
        </div>
        <div className='flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600'>
          <div className='hidden sm:block'>Add Guests</div>
          <div className='p-2 text-white rounded-full bg-rose-500 '>
            <BiSearch size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
