import { useAtom } from 'jotai';
import { userAtom } from '@/store/authStore';
import { Link } from 'react-router-dom';

interface MenuItem {
  id: number;
  title: string;
  to: string;
}

const hostMenuItems: MenuItem[] = [
  { id: 1, title: "Host Dashboard", to: "/dashboard/host" },
  { id: 2, title: "My Listings", to: "/dashboard/host/listings" },
  { id: 3, title: "Reservations", to: "/dashboard/host/calendar" },
  { id: 4, title: "Messages", to: "/dashboard/host/messages" },
];

const guestMenuItems: MenuItem[] = [
  { id: 1, title: "Search Homes", to: "/" },
  { id: 2, title: "My Trips", to: "/dashboard/guest/trips" },
  { id: 3, title: "Wishlist", to: "/dashboard/guest/wishlist" },
  { id: 4, title: "Messages", to: "/dashboard/guest/messages" },
];

const MenuItems: React.FC = () => {
  const [user] = useAtom(userAtom);
  const menuItems = user?.role === 'host' ? hostMenuItems : guestMenuItems;

  return (
    <ul className="navbar-nav">
      {menuItems.map((item) => (
        <li className="nav-item" key={item.id}>
          <Link className="nav-link" to={item.to} role="button">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems; 