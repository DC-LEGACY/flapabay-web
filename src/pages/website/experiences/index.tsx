
import Experiences from "@/pages/website/experiences/Experiences";
import PropertiesByCategory from "@/pages/website/home/home-v4/PropertiesByCategory";
import { useState } from "react";

const ExperiencePage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [showMore, setShowMore] = useState(false);


  return (
    <>

      <Experiences />

    </>
  );
};

export default ExperiencePage;
