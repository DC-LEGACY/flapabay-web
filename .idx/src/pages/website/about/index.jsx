import AboutAICohost from "./AboutAICohost";
import AboutFactSheets from "./AboutFactSheets";
import AboutHero from "./AboutHero";
import AboutJoin from "./AboutJoin";
import AboutMilestones from "./AboutMilestones";
import AboutMission from "./AboutMission";
import AboutStory from "./AboutStory";
import AboutSustainability from "./AboutSustainability";
import AboutTeam from "./AboutTeam";
import AboutValues from "./AboutValues";
import MetaData from "@/components/common/MetaData";
import { motion } from "framer-motion";

const metaInformation = {
  title: "About  || Flapabay- Apartment Rental, Experiences and More!",
};

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };
  return (
    <>
        <AboutHero />

        <div className="about-sections">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <AboutStory />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <AboutMission />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <AboutValues />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <AboutTeam />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <AboutFactSheets />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <AboutMilestones />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <AboutSustainability />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <AboutAICohost />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <AboutJoin />
          </motion.div>
        </div>
      

      
    </>
  );
};

export default About;
