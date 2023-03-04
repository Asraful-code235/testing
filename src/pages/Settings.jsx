import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../app/user/userSlice';

const Settings = () => {
  const dispatch = useDispatch();

  return (
    <div className="p-[4vmax]">
      <button
        className="py-[1vmax] px-[1.2vmax] border bg-red-400 text-white"
        onClick={() => dispatch(clearToken())}
      >
        LogOut
      </button>
    </div>
  );
};

export default Settings;
