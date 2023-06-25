'use client';

import { SafeUser } from 'AirbnbClone/app/types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useFavorite } from '../hooks';

interface HeartButtonProps {
  currentUser?: SafeUser | null;
  listingId: string;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser = {} as SafeUser,
}) => {
  const { toggleFavorite, hasFavorited } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className='relative transition cursor-pointer hover:opacity-80'
    >
      <AiOutlineHeart
        size={28}
        className='fill-white -top-[2px] -right-[2px] absolute'
      />
      <AiFillHeart
        size={24}
        className={`${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}`}
      />
    </div>
  );
};

export default HeartButton;
