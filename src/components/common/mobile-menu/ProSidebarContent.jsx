import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";

import { Link } from "react-router-dom";
import { isParentActive } from "../../../utilis/isMenuActive";
import mobileMenuItems from "../../../data/mobileMenuItems";
import {useLocation} from "react-router-dom";

const ProSidebarContent = () => {
  const { pathname } = useLocation();

  const menuItems = [
    { label: "Explore", path: "/" },
    { label: "Experiences", path: "/experiences" },
    { label: "Help Center", path: "/help-center" },
    { label: "Dashboard", path: "/dashboard-home" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
      <Menu>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            component={
              <Link
                to={item.path}
                className={item.path === pathname ? "active" : ""}
              />
            }
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
};


export default ProSidebarContent;
