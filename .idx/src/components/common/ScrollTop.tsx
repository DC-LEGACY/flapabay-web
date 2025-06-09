import React, { useEffect, useState } from "react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = (): void => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="fixed bg-black text-white hover:bg-flapabay-yellow rounded-2xl scrollToHome"
          style={{ cursor: "pointer" }}
          onClick={scrollToTop}
          role="button"
          tabIndex={0}
          aria-label="Scroll to top"
        >
          <i className="fas fa-angle-up"></i>
        </div>
      )} 
    </>
  );
};

export default ScrollToTop; 