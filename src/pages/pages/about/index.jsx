import AboutAICohost from "../about/AboutAICohost";
import AboutFactSheets from "../about/AboutFactSheets";
import AboutHero from "../about/AboutHero";
import AboutJoin from "../about/AboutJoin";
import AboutMilestones from "../about/AboutMilestones";
import AboutMission from "../about/AboutMission";
import AboutStory from "../about/AboutStory";
import AboutSustainability from "../about/AboutSustainability";
import AboutTeam from "../about/AboutTeam";
import AboutValues from "../about/AboutValues";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "../../../components/common/default-footer";
import MetaData from "@/components/common/MetaData";
import MobileMenu from "@/components/common/mobile-menu";
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
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* End Funfact */}

      <main className="flex-1">
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
      </main>

      <section className="pb-0 footer-style1 pt60">
        <Footer />
      </section>
    </>
  );
};

export default About;
