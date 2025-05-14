import React from 'react';
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface MenuItem {
  label: string;
  path: string;
}

const ProSidebarContent: React.FC = () => {
  const { pathname } = useLocation();

  const menuItems: MenuItem[] = [
    { label: "Explore", path: "/" },
    { label: "Experiences", path: "/experiences" },
    { label: "Help Center", path: "/help-center" },
    { label: "Dashboard", path: "/dashboard" },
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
                aria-current={item.path === pathname ? "page" : undefined}
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