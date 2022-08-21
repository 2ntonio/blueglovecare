import React, { useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import "../styles/about.css";
const About = () => {
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      console.log("Page scroll: ", latest);
    });
  }, [scrollYProgress]);
  console.log("Yelo!")
  return (
    <div>
      <motion.div
        className="progress-bar"
        style={{
          scaleX: scrollYProgress,
          backgroundColor: "Red",
          position: "fixed",
        }}
      />
    </div>
  );
};

export default About;
