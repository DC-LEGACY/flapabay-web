import {
  blogItems,
  homeItems,
  listingItems,
  pageItems,
  propertyItems,
} from "@/data/navItems";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MainMenu: React.FC = () => {
  const { pathname } = useLocation();
  const [topMenu, setTopMenu] = useState<string>("");
  const [submenu, setSubmenu] = useState<string>("");

  useEffect(() => {
    homeItems.forEach((elm) => {
      if (elm.href.split("/")[1] === pathname.split("/")[1]) {
        setTopMenu("home");
      }
    });
    blogItems.forEach((elm) => {
      if (elm.href.split("/")[1] === pathname.split("/")[1]) {
        setTopMenu("blog");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[1] === pathname.split("/")[1]) {
        setTopMenu("pages");
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split("/")[1] === pathname.split("/")[1]) {
          setTopMenu("property");
          setSubmenu(item.label);
        }
      })
    );
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split("/")[1] === pathname.split("/")[1]) {
          setTopMenu("listing");
          setSubmenu(item.title);
        }
      })
    );
  }, [pathname]);

  const handleActive = (link: string): string => {
    if (link.split("/")[1] === pathname.split("/")[1]) {
      return "menuActive";
    }
    return "";
  };

  return (
    <ul className="ace-responsive-menu">
      <li className="visible_list dropitem">
        <a className="list-item" href="/">
          <span className={topMenu === "home" ? "title menuActive" : "title"}>
            Explore
          </span>
        </a>
      </li>

      <li className="megamenu_style dropitem">
        <a className="list-item" href="/experiences">
          <span className={topMenu === "property" ? "title menuActive" : "title"}>
            Experiences
          </span>
        </a>
      </li>

      <li className="megamenu_style dropitem">
        <a className="list-item" href="/contact">
          <span className={topMenu === "pages" ? "title menuActive" : "title"}>
            Contact Us
          </span>
        </a>
      </li>

      <li className="megamenu_style dropitem">
        <a className="list-item" href="/help-center">
          <span className={topMenu === "property" ? "title menuActive" : "title"}>
            Help Center
          </span>
        </a>
      </li>
    </ul>
  );
};

export default MainMenu; 