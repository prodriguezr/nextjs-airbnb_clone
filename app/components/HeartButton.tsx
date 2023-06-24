'use client';

import { SafeUser } from 'AirbnbClone/app/types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
  currentUser?: SafeUser | null;
  listingId: string;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const hasFavorited = true;
  const toggleFavourite = () => {};

  return (
    <div
      onClick={toggleFavourite}
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
