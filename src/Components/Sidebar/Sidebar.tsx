import React from 'react'
import { MdDashboardCustomize, MdOutlineCategory } from 'react-icons/md'
import { SiBrandfolder } from 'react-icons/si'
import { NavLink } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      {/* زر السهم لفتح/إغلاق السايدبار */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`fixed top-1/2 left-0 z-50 transform -translate-y-1/2 bg-[#e5d8be] dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-r-full p-2 shadow-lg focus:outline-none transition-all duration-300 ${open ? 'ml-64' : 'ml-0'}`}
        style={{ transition: 'margin-left 0.3s' }}
      >
        {open ? <FaChevronLeft className="w-5 h-5" /> : <FaChevronRight className="w-5 h-5" />}
      </button>
    
    <aside
      id="default-sidebar"
      className={`fixed top-0 left-0 pt-20 z-40 w-64 h-screen transition-transform bg-[#e5d8be] dark:bg-gray-800 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
             <li>
                <NavLink to="/layOutAdmin" className="flex items-center mt-4 p-2 text-gray-900 rounded-lg dark:text-gray-100 hover:bg-black hover:text-white dark:hover:bg-gray-700 hover:dark:text-amber-400 transition-all duration-200 group">
               
                   <span className="ms-3 flex gap-1 items-center "><MdDashboardCustomize className='text-2xl' />
                  Dashboard</span>
                </NavLink>
             </li>
             
             <li>
                <NavLink to="/layOutAdmin/createCategory" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:text-white hover:bg-black dark:hover:bg-gray-700 dark:text-gray-100 hover:dark:text-amber-400 transition-all duration-200 group">
               
                   <span className="ms-3 flex gap-1 items-center "> <MdOutlineCategory className='text-2xl' />
                   CreateCategory</span>
                </NavLink>
             </li>
             <li>
                <NavLink to="/layOutAdmin/createBrand" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:text-white hover:bg-black dark:hover:bg-gray-700 dark:text-gray-100 hover:dark:text-amber-400 transition-all duration-200 group">
               
                   <span className="ms-3 flex gap-1 items-center "> <SiBrandfolder className='text-2xl' /> CreateBrand 
                   </span>
                </NavLink>
             </li>
             <li>
                <NavLink to="/layOutAdmin/createSubCategory" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:text-white hover:bg-black dark:hover:bg-gray-700 dark:text-gray-100 hover:dark:text-amber-400 transition-all duration-200 group">
               
                   <span className="ms-3 flex gap-1 items-center "> <SiBrandfolder className='text-2xl' /> CreateSubCategory
                   </span>
                </NavLink>
             </li>
             <li>
                <NavLink to="/layOutAdmin/coupon" className="flex items-center gap-2 px-4 py-3 rounded-lg hover:text-white hover:bg-black dark:hover:bg-gray-700 dark:text-gray-100 hover:dark:text-amber-400 transition-all duration-200 group">
               
                   <span className="ms-3 flex gap-1 items-center "> <SiBrandfolder className='text-2xl' /> Create Coupon
                   </span>
                </NavLink>
             </li>
             
          </ul>
       </div>
    </aside>
    </>
  )
}
