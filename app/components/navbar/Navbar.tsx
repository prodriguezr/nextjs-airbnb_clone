'use client';

import Container from '../Container';
import CategoriesList from './CategoriesList';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import { SafeUser } from 'AirbnbClone/app/types';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='fixed z-10 w-full bg-white shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <CategoriesList />
    </div>
  );
};

export default Navbar;
