import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

export default function LayOutAdmin() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Sidebar open={open} setOpen={setOpen} />
      <div className={`p-4 transition-all duration-300 min-h-screen ${open ? 'ml-64' : 'ml-0 w-full'} bg-[#f9f9f6] dark:bg-gray-900`}>
        <Outlet />
      </div>
    </>
  );
}
