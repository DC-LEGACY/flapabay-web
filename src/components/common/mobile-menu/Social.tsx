import React from 'react';

interface SocialLink {
  id: number;
  iconClass: string;
  href: string;
}

const Social: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      id: 1,
      iconClass: "fab fa-facebook-f",
      href: "#",
    },
    {
      id: 2,
      iconClass: "fab fa-twitter",
      href: "#",
    },
    {
      id: 3,
      iconClass: "fab fa-instagram",
      href: "#",
    },
    {
      id: 4,
      iconClass: "fab fa-linkedin-in",
      href: "#",
    },
  ];

  return (
    <>
      {socialLinks.map((link) => (
        <a 
          className="me-3" 
          href={link.href} 
          key={link.id}
          aria-label={`Visit our ${link.iconClass.split('-')[1]} page`}
        >
          <i className={link.iconClass}></i>
        </a>
      ))}
    </>
  );
};

export default Social; 