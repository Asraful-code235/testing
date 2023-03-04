import { HiOutlineHome } from 'react-icons/hi';
import { BsCartCheck, BsBox, BsFolder } from 'react-icons/bs';
import { FiUsers, FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const data = [
  {
    id: 1,
    icon: <HiOutlineHome size={25} />,
    name: 'Dashboard',
  },
  {
    id: 2,
    icon: <BsCartCheck size={25} />,
    name: 'Orders',
  },
  {
    id: 3,
    icon: <BsBox size={25} />,
    name: 'Products',
  },
  {
    id: 4,
    icon: <BsFolder size={25} />,
    name: 'Categories',
  },
  {
    id: 5,
    icon: <FiUsers size={25} />,
    name: 'Customers',
  },
  {
    id: 6,
    icon: <FiSettings size={25} />,
    name: 'Settings',
  },
];

const Sidebar = () => {
  const { isOpen } = useSelector((state) => state.sidebar);
  return (
    <div
      className={`${
        isOpen ? 'w-5/6 md:w-[20%] mx-auto min-h-screen' : 'w-0 hidden'
      }  `}
    >
      <ul className="flex p-[2vmax] flex-col items-start justify-center gap-3 px-[1vmax] ">
        {data.map((item) => (
          <li key={item.id} className="w-full  ">
            <Link
              className="flex items-center justify-start gap-4 py-[0.4vmax] rounded-md px-[0.1vmax] hover:bg-gray-200"
              to={`${
                item.name.toLowerCase() !== 'dashboard'
                  ? item.name.toLowerCase()
                  : '/'
              }`}
            >
              <span className="text-gray-400 font-light  "> {item.icon}</span>
              <span className=" text-base md:text-xl">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
