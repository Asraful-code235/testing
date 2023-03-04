import React from 'react';
import { useState, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../app/nav/navSlice';

const Header = () => {
  // const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      <header className="w-screen  border-b-2 border-gray-300">
        <div className="flex gap-8 items-center p-[1vmax] py-[3vmax]">
          <RxHamburgerMenu onClick={handleToggleSidebar} size={25} />
          <div>
            <BsSearch size={25} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
