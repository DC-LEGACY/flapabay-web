import { useAtom } from 'jotai';
import { userAtom } from '@/store/authStore';

interface MenuItem {
  id: number;
  title: string;
}

const hostMenuItems: MenuItem[] = [
  { id: 1, title: "Host Dashboard" },
  { id: 2, title: "My Listings" },
  { id: 3, title: "Reservations" },
  { id: 4, title: "Messages" },
];

const guestMenuItems: MenuItem[] = [
  { id: 1, title: "Search Homes" },
  { id: 2, title: "My Trips" },
  { id: 3, title: "Wishlist" },
  { id: 4, title: "Messages" },
];

const MenuItems: React.FC = () => {
  const [user] = useAtom(userAtom);
  const menuItems = user?.role === 'host' ? hostMenuItems : guestMenuItems;

  return (
    <ul className="navbar-nav">
      {menuItems.map((item) => (
        <li className="nav-item" key={item.id}>
          <a className="nav-link" href="#" role="button">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems; 