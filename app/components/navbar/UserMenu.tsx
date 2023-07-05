'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import {
  useLoginModal,
  useRegisterModal,
  useRentModal,
} from 'AirbnbClone/app/hooks';
import { SafeUser } from 'AirbnbClone/app/types';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const onToggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onRent}
          className='hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100'
        >
          Airbnb your home
        </div>
        <div
          onClick={onToggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full flex flex-row items-center gap-3 cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute shadow-md rounded-xl w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  label='My trips'
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label='My favorites'
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label='My reservations'
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label='My properties'
                  onClick={() => router.push('/properties')}
                />
                <MenuItem label='Airbnb my home' onClick={rentModal.onOpen} />
                <hr />
                <MenuItem label='Logout' onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label='Login' onClick={loginModal.onOpen} />
                <MenuItem label='Sign up' onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
