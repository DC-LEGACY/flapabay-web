import { ImFontSize } from "react-icons/im";
import React from "react";

const MenuWidget = () => {
  const menuSections = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Media Room", href: "/media" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Terms of Use", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Careers", href: "/careers" },
        { label: "FAQs", href: "/help/faqs" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help-center" },
        { label: "Cancellation options", href: "/help/cancellation" },
        { label: "Report Neighbourhood Concern", href: "/help/neighborhood" },
        { label: "Supported Countries", href: "/help/countries" },
      ],
    },
  ];

  return (
    <>
      {menuSections.map((section, index) => (
        <div className="col-auto" key={index}>
          <div className="mb-3 link-style1">
            <h6 style={{fontWeight: 800, FontSize: 25}} className="text-dark mb25">{section.title}</h6>
            <ul className="ps-0">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuWidget;
